import { Booking } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotels-repository';
import bookingRepository from '@/repositories/booking-repository';
import { cannotBooking } from '@/errors/cannot-booking';

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status !== 'PAID') {
    throw cannotBooking();
  }

  const room = await hotelRepository.findRoom(roomId);

  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBooking();

  const newBooking = await bookingRepository.createBooking({ roomId, userId });
  return newBooking;
}

async function getBookingByUserId(userId: number) {
  const userBooking = await bookingRepository.findBookingByUserId(userId);

  if (!userBooking) throw notFoundError();

  const result = {
    id: userBooking.id,
    Room: userBooking.Room,
  };

  return result;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const userBooking = await bookingRepository.findBookingById(bookingId);
  if (!userBooking) throw cannotBooking();

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
function cannotBookRoomError() {
  throw new Error('Function not implemented.');
}
