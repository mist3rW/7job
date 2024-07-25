import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { UTApi } from 'uploadthing/server';

export const utapi = new UTApi();

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  companyLogoUploader: f({ image: { maxFileSize: '2MB' } }).onUploadComplete(
    async ({ metadata, file }) => {}
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
