/*
  Warnings:

  - Added the required column `flashcard` to the `user_videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `user_videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_videos" ADD COLUMN     "flashcard" TEXT NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL;
