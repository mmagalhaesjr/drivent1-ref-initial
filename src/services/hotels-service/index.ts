import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function listAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketId = await ticketsRepository.getTickets(enrollment.id);

  if (!ticketId) throw notFoundError();

  if (ticketId.status === 'RESERVED' || ticketId.TicketType.isRemote || !ticketId.TicketType.includesHotel)
    throw paymentRequiredError();

  const hotels = await hotelsRepository.listAllHotels();

  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function listAllHotelsRooms() {
  return;
}

const hotelsService = {
  listAllHotels,
  listAllHotelsRooms,
};

export default hotelsService;

function cannotListHotelsError() {
  throw new Error('Function not implemented.');
}
