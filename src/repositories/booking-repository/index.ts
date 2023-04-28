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

async function findBookingById(userId: number) {
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

const bookingRepository = {
  createBooking,
  findBookingsByRoomId,
  findBookingById,
  updateBooking,
};

export default bookingRepository;
