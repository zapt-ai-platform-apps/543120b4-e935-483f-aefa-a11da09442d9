CREATE TABLE "presentations" (
  "id" SERIAL PRIMARY KEY,
  "topic" TEXT NOT NULL,
  "number_of_slides" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "user_id" UUID NOT NULL
);