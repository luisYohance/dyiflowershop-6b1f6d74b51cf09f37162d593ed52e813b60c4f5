import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // Check if the user is authenticated
      if (!user) throw new UploadThingError("Unauthorized");

      // Is user verified to upload? (optional)
      const fullUserData = await (
        await clerkClient()
      ).users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permission");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
