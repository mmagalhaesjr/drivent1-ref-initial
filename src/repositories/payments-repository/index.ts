import { prisma } from '@/config';

async function getPaymentInfo(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function makePayment() {
  return;
}

const paymentsRepository = {
  getPaymentInfo,
  makePayment,
};

export default paymentsRepository;
