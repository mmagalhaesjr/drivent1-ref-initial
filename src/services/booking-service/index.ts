import { Booking } from '@prisma/client';
import { updateBooking } from '../../controllers/booking-controller';
import { notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotels-repository';
import bookingRepository from '@/repositories/booking-repository';
import { cannotBooking } from '@/errors/cannot-booking';

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status !== 'PAID') {
    throw cannotListHotelsError();
  }

  const room = await hotelRepository.findRoom(roomId);

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBooking();

  const newBooking = await bookingRepository.createBooking({ roomId, userId });
  return newBooking;
}

async function getBookingByUserId(userId: number) {
  const userBooking = await bookingRepository.findBookingById(userId);

  if (!userBooking) throw notFoundError();

  const result = {
    id: userBooking.id,
    Room: userBooking.Room,
  };

  return result;
}

async function updateBooking(userId: number, roomId: number) {
  const userBooking = await bookingRepository.findBookingById(userId);
  if (!userBooking) throw notFoundError();

  const room = await hotelRepository.findRoom(roomId);
  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBooking();

  const updateBooking = await bookingRepository.updateBooking(userBooking.id, roomId);
  return updateBooking;
}

const bookingService = {
  createBooking,
  getBookingByUserId,
  updateBooking,
};

export default bookingService;
