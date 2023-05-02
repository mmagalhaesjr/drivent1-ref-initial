import { Booking } from '@prisma/client';
import { CreateBooking } from '@/protocols';
import { prisma } from '@/config';

async function createBooking(booking: CreateBooking) {
  return await prisma.booking.create({
    data: booking,
  });
}

async function findBookingsByRoomId(roomId: number): Promise<Booking[]> {
  return await prisma.booking.findMany({
    where: { roomId },
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: { Room: true },
  });
}

async function updateBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: id,
    },
    data: { roomId: roomId },
  });
}

async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: { Room: true },
  });
}

const bookingRepository = {
  createBooking,
  findBookingByUserId,
  findBookingsByRoomId,
  findBookingById,
  updateBooking,
};

export default bookingRepository;
