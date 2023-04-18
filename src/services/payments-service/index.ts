import httpStatus from 'http-status';
import paymentsRepository from '@/repositories/payments-repository';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import ticktesRepository from '@/repositories/tickets-repository';

type GetPaymentByTicketIdParams = {
  ticketId: number;
  userId: number;
};

async function getPaymentInfo({ ticketId, userId }: GetPaymentByTicketIdParams) {
  const ticket = await ticktesRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.getPaymentInfo(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function makePayment() {
  return;
}

const paymentsService = {
  getPaymentInfo,
  makePayment,
};

export default paymentsService;
