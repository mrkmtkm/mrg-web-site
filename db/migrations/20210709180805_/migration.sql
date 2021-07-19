/*
  Warnings:

  - Added the required column `category` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Music" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "playerId" INTEGER,
    FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
