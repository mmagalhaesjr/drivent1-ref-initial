import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function getPaymentInfo(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
type insertPaymentParams = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

async function makePayment({ ticketId, value, cardIssuer, cardLastDigits }: insertPaymentParams): Promise<Payment> {
  return await prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}

const paymentsRepository = {
  getPaymentInfo,
  makePayment,
};

export default paymentsRepository;
