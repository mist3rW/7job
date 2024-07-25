# 7job

7job is a job board web application inspired by jobsdb.com. It allows users to post job listings, which are reviewed by an admin before becoming publicly available. The home page features a comprehensive job board where users can view job details, search for jobs, and bookmark jobs for later reference using local storage.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Admin Dashboard](#admin-dashboard)

## Features

- **Job Listings**: Users can view detailed job listings, including job title, company name and logo, description, salary, location, and job type.
- **Job Search**: Users can search for jobs by title, type, or location.
- **Bookmarking**: Users can bookmark jobs for later reference using local storage.
- **Admin Review**: Admins can review, approve, or delete job postings.
- **Secure Authentication**: Implemented secure user authentication.

## Tech Stack

- **Framework**: Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Validation**: Zod
- **Other Libraries**: Framer Motion, clsx, date-fns, bcryptjs, jsonwebtoken, etc.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mist3rW/7job.git
   cd 7job
   ```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

4. Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a .env file in the root directory and add the following environment variables:

```
DATABASE_URL="your_database_url"
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

## Database Schema

The database schema is defined using Prisma. You can find the schema in prisma/schema.prisma.

## Admin Dashboard

The admin dashboard allows administrators to manage job postings efficiently. Admins can:

- View all job postings.
- Approve or delete job postings.
