'use server';
import crypto from 'crypto';
import prisma from '../db';

export const fetchVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.emailToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const fetchVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.emailToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const createEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // 3 days
  try {
    const existingToken = await fetchVerificationTokenByEmail(email);
    if (existingToken && 'id' in existingToken) {
      await prisma.emailToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const activationToken = await prisma.emailToken.create({
      data: {
        email,
        token,
        expires: expiration,
      },
    });

    return activationToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const newUserVerification = async (token: string) => {
  try {
    const existingToken = await fetchVerificationTokenByToken(token);
    if (!existingToken) {
      return { error: 'Invalid token' };
    }
    if (existingToken && 'expires' in existingToken) {
      const hasExpired = new Date() > existingToken.expires;
      if (hasExpired) {
        return { error: 'Token has expired' };
      }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: 'email' in existingToken ? existingToken.email : '',
      },
    });

    if (!existingUser) {
      return { error: 'User not found' };
    }

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.emailToken.delete({
      where: {
        id: 'id' in existingToken ? existingToken.id : '',
      },
    });
    return {
      success: {
        data: existingUser,
        message: 'Email verified successfully',
      },
    };
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const fetchPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return resetToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const fetchPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
      },
    });

    return resetToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const createResetPasswordToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
  try {
    const existingToken = await fetchPasswordResetTokenByEmail(email);
    if (existingToken && 'id' in existingToken) {
      await prisma.emailToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const resetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires: expiration,
      },
    });
    return resetToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const fetchTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const fetchTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};

export const createTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expiration = new Date(Date.now() + 1000 * 60 * 10);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return { error: 'User not found' };
    }
    const existingToken = await fetchTwoFactorTokenByEmail(email);
    if (existingToken && 'id' in existingToken) {
      await prisma.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const twoFactorToken = await prisma.twoFactorToken.create({
      data: {
        email,
        token,
        expires: expiration,
        userId: user.id,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(error);
    return { error: null };
  }
};
