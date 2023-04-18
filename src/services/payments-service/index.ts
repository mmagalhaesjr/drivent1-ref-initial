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
type makePaymentParams = {
  ticketId: number;
  userId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};
async function makePayment({ ticketId, userId, cardData }: makePaymentParams) {
  const ticket = await ticktesRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const cardLastDigits = cardData.number.toString().slice(-4);

  const pay = await paymentsRepository.makePayment({
    ticketId: ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits,
  });

  await ticktesRepository.updateTicketPayment(ticketId);

  return pay;
}

const paymentsService = {
  getPaymentInfo,
  makePayment,
};

export default paymentsService;
