## Overview

7authOTP is a comprehensive authentication module designed for modern web applications. It provides a robust system for user management, including sign-in with credentials or providers, email verification, password management, and two-factor authentication (2FA) using one-time passwords (OTPs).

## Features

- **Sign In with Credentials and Providers**: Users can sign in using email and password, Google, or GitHub.
- **Email Verification**: After signing up, users receive a token via email to verify their account.
- **Password Management**: Users can update their password through the dashboard settings.
- **Two-Factor Authentication (2FA)**: Users can enable 2FA, requiring a one-time password sent via email for subsequent logins.
- **Secure Password Reset**: Users can reset their passwords securely using token-based authentication.
- **Form Validation**: Client-side form validation using Zod and React Hook Form.
- **User-friendly Interface**: Modern UI components for a seamless user experience.
- **Responsive Design**: Ensures compatibility across different devices and screen sizes.
- **Password Hashing**: Uses bcrypt for secure password storage.
- **Database Integration**: Utilizes Prisma ORM and PostgreSQL for database operations.
- **Robust Error Handling**: Provides detailed error messages and handles various edge cases.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Prisma ORM**: An Object-Relational Mapper for seamless database interactions.
- **PostgreSQL**: A powerful, open-source relational database.
- **NextAuth.js**: An authentication library for Next.js applications.
- **React Hook Form**: A library for managing form state and validation in React applications.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **bcrypt**: A library for hashing passwords.
- **Tailwind CSS**: A utility-first CSS framework for styling.
