/*
  Warnings:

  - You are about to alter the column `year` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
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
    "year" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Player" ("category", "createdAt", "id", "name", "origin", "school", "updatedAt", "url", "year") SELECT "category", "createdAt", "id", "name", "origin", "school", "updatedAt", "url", "year" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
