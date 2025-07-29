/*
  Warnings:

  - Added the required column `totalTickets` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "ticketsSold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTickets" INTEGER NOT NULL;
