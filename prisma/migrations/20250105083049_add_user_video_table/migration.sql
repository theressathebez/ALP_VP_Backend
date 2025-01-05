/*
  Warnings:

  - You are about to drop the `user_videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_videos" DROP CONSTRAINT "user_videos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_videos" DROP CONSTRAINT "user_videos_video_id_fkey";

-- DropTable
DROP TABLE "user_videos";

-- CreateTable
CREATE TABLE "UserVideo" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,

    CONSTRAINT "UserVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVideo_user_id_video_id_key" ON "UserVideo"("user_id", "video_id");

-- AddForeignKey
ALTER TABLE "UserVideo" ADD CONSTRAINT "UserVideo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVideo" ADD CONSTRAINT "UserVideo_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
