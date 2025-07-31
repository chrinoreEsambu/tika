/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `totalTickets` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `availableTickets` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `id_event` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_ticket` was added to the `Ticket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `typeticket` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tickets" AS ENUM ('vip', 'Standard');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
DROP COLUMN "price",
DROP COLUMN "totalTickets",
ADD COLUMN     "availableTickets" INTEGER NOT NULL,
ADD COLUMN     "id_event" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event");

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_ticket" TEXT NOT NULL,
ADD COLUMN     "typeticket" TEXT NOT NULL,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id_ticket");

-- CreateTable
CREATE TABLE "Typetickets" (
    "tickets_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" "Tickets" NOT NULL DEFAULT 'Standard',
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Typetickets_pkey" PRIMARY KEY ("tickets_id")
);

-- AddForeignKey
ALTER TABLE "Typetickets" ADD CONSTRAINT "Typetickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_typeticket_fkey" FOREIGN KEY ("typeticket") REFERENCES "Typetickets"("tickets_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;
