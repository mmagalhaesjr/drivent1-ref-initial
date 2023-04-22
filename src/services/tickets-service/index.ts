import { TicketStatus, TicketType } from '@prisma/client';
import httpStatus from 'http-status';
import ticktesRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { conflictError, notFoundError, requestError } from '@/errors';

async function getTicketsTypes() {
  const result = await ticktesRepository.getTicketsTypes();
  return result;
}

async function getTickets(userId: number) {
  const enrollments = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollments) throw requestError(404, 'Not found');

  const ticket = await ticktesRepository.getTickets(enrollments.id);

  if (!ticket) throw requestError(404, 'Not found');

  return ticket;
}

type TicketParams = {
  ticketTypeId: number;
  userId: number;
};

async function postNewTicket({ ticketTypeId, userId }: TicketParams) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const enrollmentId = enrollment.id;

  const existingTicket = await ticktesRepository.getTickets(enrollmentId);
  if (existingTicket) throw conflictError(`user can only have one ticket`);

  const status: TicketStatus = 'RESERVED';

  const ticket = await ticktesRepository.postNewTicket({ ticketTypeId, enrollmentId, status });
  return ticket;
}

const ticketsServices = {
  getTicketsTypes,
  getTickets,
  postNewTicket,
};

export default ticketsServices;
