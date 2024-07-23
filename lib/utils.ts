import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

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
