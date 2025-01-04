-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_videos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,

    CONSTRAINT "user_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "video_name" VARCHAR(255) NOT NULL,
    "video_url" TEXT NOT NULL,
    "flashcard" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" SERIAL NOT NULL,
    "topic_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "quiz_name" VARCHAR(255) NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" SERIAL NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "option" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_quiz_answers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quiz_answer_id" INTEGER NOT NULL,

    CONSTRAINT "user_quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_transcripts" (
    "id" SERIAL NOT NULL,
    "transcript_text" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "saved_transcripts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "user_videos" ADD CONSTRAINT "user_videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_videos" ADD CONSTRAINT "user_videos_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quiz_answers" ADD CONSTRAINT "user_quiz_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quiz_answers" ADD CONSTRAINT "user_quiz_answers_quiz_answer_id_fkey" FOREIGN KEY ("quiz_answer_id") REFERENCES "quiz_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_transcripts" ADD CONSTRAINT "saved_transcripts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
