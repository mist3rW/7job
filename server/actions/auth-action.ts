'use server';

import { actionClient } from '@/lib/safe-action';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  twoFactorSchema,
  userSettingsNewPasswordSchema,
} from '@/types/auth-schema';
import prisma from '../db';
import bcrypt from 'bcryptjs';
import {
  sendResetPasswordEmail,
  sendTwoFactorCodeEmail,
  sendVerificationEmail,
} from './email';
import {
  createEmailVerificationToken,
  createResetPasswordToken,
  createTwoFactorToken,
  fetchPasswordResetTokenByToken,
  fetchTwoFactorTokenByEmail,
} from './token';
import { auth, signIn, signOut } from '../auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const signupUser = actionClient
  .schema(signupSchema)
  .action(async ({ parsedInput: values }) => {
    const { email, password } = values;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        if (!existingUser.emailVerified) {
          const activation_token = await createEmailVerificationToken(email);
          if ('email' && 'token' in activation_token) {
            await sendVerificationEmail(
              activation_token.email,
              activation_token.token
            );
            return {
              success: {
                message: 'Please check your email to verify your account',
              },
            };
          }
        }
        return {
          error: {
            message: 'User already exists',
          },
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      // Generate email verification token
      const verificationToken = await createEmailVerificationToken(email);

      // Send verification email
      if ('email' && 'token' in verificationToken) {
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token
        );
      }

      return {
        success: {
          message: 'Please check your email to verify your account',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while signing up',
      };
    }
  });

export const signinUser = actionClient
  .schema(signinSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!existingUser) {
        return {
          error: {
            message: 'User does not exist',
          },
        };
      }
      if (!existingUser.emailVerified) {
        const verificationToken = await createEmailVerificationToken(
          existingUser.email
        );
        if ('email' && 'token' in verificationToken) {
          await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
          );
        }
        return {
          success: {
            message: 'Please verify your email before signing in',
          },
        };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password!
      );
      if (!isPasswordValid) {
        return {
          error: {
            message: 'Invalid credentials',
          },
        };
      }

      if (existingUser.isTwoFactorEnabled) {
        if (code) {
          const twoFactorToken = await fetchTwoFactorTokenByEmail(
            existingUser.email
          );
          if (!twoFactorToken) {
            return {
              error: {
                message: 'Invalid 2FA code',
              },
            };
          }
          if ('token' in twoFactorToken && twoFactorToken.token !== code) {
            return {
              error: {
                message: 'Invalid Code',
              },
            };
          }

          if ('expires' in twoFactorToken) {
            const isExpired = new Date() > new Date(twoFactorToken.expires);
            if (isExpired) {
              return {
                error: {
                  message: '2FA code has expired',
                },
              };
            }
          }
          await prisma.twoFactorToken.delete({
            where: {
              id: 'id' in twoFactorToken ? twoFactorToken.id : '',
            },
          });
        } else {
          const token = await createTwoFactorToken(existingUser.email);
          if ('email' && 'token' in token) {
            await sendTwoFactorCodeEmail(existingUser.email, token.token);
            return {
              success: {
                message: 'Please check your email for 2FA code',
              },
              twoFactorRequired: true,
            };
          }
        }
      }

      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      });

      return { success: { message: 'Signed in successfully' } };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CallbackRouteError': {
            return {
              error: { message: 'Invalid credentials.' },
            };
          }
          case 'CredentialsSignin': {
            return {
              error: 'Invalid credentials',
            };
          }
          case 'AccessDenied': {
            return { error: error.message };
          }
          case 'OAuthSignInError':
            return { error: error.message };
          case 'OAuthCallbackError':
            return { error: error.message };
          default: {
            return {
              error: { message: 'Error. Could not sign in.' },
            };
          }
        }
      }

      throw error;
    }
  });

export const forgotPassword = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return {
          error: {
            message: 'User does not exist',
          },
        };
      }

      const verificationToken = await createResetPasswordToken(email);
      if ('email' && 'token' in verificationToken) {
        await sendResetPasswordEmail(
          verificationToken.email,
          verificationToken.token
        );
      }

      return {
        success: {
          message: 'Please check your email to reset your password',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred, please try again',
      };
    }
  });

export const resetPassword = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { password, confirmPassword, token } }) => {
    try {
      if (!token) {
        return { error: { message: 'Token is missing' } };
      }
      const existingToken = await fetchPasswordResetTokenByToken(token);
      if (!existingToken) {
        return {
          error: {
            message: 'Invalid token',
          },
        };
      }
      if ('expires' in existingToken) {
        const isExpired = new Date() > new Date(existingToken.expires);
        if (isExpired) {
          return {
            error: {
              message: 'Token has expired',
            },
          };
        }
      }
      const existingUser = await prisma.user.findUnique({
        where: {
          email: 'email' in existingToken ? existingToken.email : '',
        },
      });
      if (!existingUser) {
        return { error: { message: 'User not found' } };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      if ('id' in existingToken) {
        await prisma.passwordResetToken.delete({
          where: {
            id: existingToken.id,
          },
        });
      }

      return {
        success: { message: 'Your password has been reset successfully' },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: 'An error occurred, please try again',
      };
    }
  });

export const userSettingsNewPassword = actionClient
  .schema(userSettingsNewPasswordSchema)
  .action(async ({ parsedInput: values }) => {
    try {
      const user = await auth();
      if (!user) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.user.id,
        },
      });
      if (!dbUser) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      if (user.user.isOAuth) {
        return {
          error: {
            message: 'User is OAuth user',
          },
        };
      }
      if (values.password && values.newPassword && dbUser.password) {
        const isPasswordValid = await bcrypt.compare(
          values.password,
          dbUser.password
        );
        if (!isPasswordValid) {
          return {
            error: {
              message: 'Invalid current password',
            },
          };
        }
        const isSamePassword = await bcrypt.compare(
          values.newPassword,
          dbUser.password
        );
        if (isSamePassword) {
          return {
            error: {
              message: 'New password cannot be the same as old password',
            },
          };
        }
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        const updatedUser = await prisma.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        return {
          success: {
            message: 'New password has been set successfully',
          },
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred, please try again',
      };
    }
  });

export const userSettings2FA = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: values }) => {
    try {
      const user = await auth();
      if (!user) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      if (user.user.isOAuth) {
        return {
          error: {
            message: 'User is OAuth user',
          },
        };
      }
      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.user.id,
        },
      });
      if (!dbUser) {
        return {
          error: {
            message: 'User not found',
          },
        };
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          isTwoFactorEnabled: values.isTwoFactorEnabled,
        },
      });
      return {
        success: {
          message: values.isTwoFactorEnabled
            ? '2-Factor Authentication has been enabled successfully'
            : '2-Factor Authentication has been disabled successfully',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred, please try again',
      };
    }
  });

export const signOutUser = async () => {
  return await signOut();
};
