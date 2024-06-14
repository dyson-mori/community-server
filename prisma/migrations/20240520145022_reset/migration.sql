-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "photo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "admin_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostTag" (
    "post_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    PRIMARY KEY ("post_id", "tag_id"),
    CONSTRAINT "PostTag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedBack" (
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("post_id", "user_id"),
    CONSTRAINT "FeedBack_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FeedBack_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WatchHistory" (
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    PRIMARY KEY ("post_id", "user_id"),
    CONSTRAINT "WatchHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WatchHistory_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PostFolder" (
    "post_id" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,

    PRIMARY KEY ("post_id", "folder_id"),
    CONSTRAINT "PostFolder_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostFolder_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_phone_key" ON "admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_key" ON "users"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "folders_user_id_key" ON "folders"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
