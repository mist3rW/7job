import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';
import { formatDistanceToNowStrict } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(jobTitle: string, companyName: string) {
  const sanitizeString = (str: string) => {
    return str
      .toLowerCase()
      .replace(/&/g, 'and') // Replace & with 'and'
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim(); // Remove leading/trailing spaces
  };
  const uniqueId = crypto.randomBytes(4).toString('hex');

  // Sanitize both job title and company name
  const sanitizedJobTitle = sanitizeString(jobTitle);
  const sanitizedCompanyName = sanitizeString(companyName);

  const slug = `${sanitizedJobTitle}-${sanitizedCompanyName}-${uniqueId}`;

  return slug;
}

export function formatSalary(salary: number) {
  const roundedSalary = Math.round(salary / 1000) * 1000;
  return new Intl.NumberFormat('th-TH', {
    currency: 'THB',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedSalary);
}

export function daysAgo(from: Date) {
  const distance = formatDistanceToNowStrict(from, { addSuffix: true });

  return distance;
}
