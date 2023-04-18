import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentSchema } from '@/schemas/payments-schemas';

async function getPaymentInfo(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req;
  const { ticketId } = _req.query;

  if (!ticketId) return res.sendStatus(400);

  try {
    const payment = await paymentsService.getPaymentInfo({
      ticketId: Number(ticketId),
      userId,
    });
    return res.send(payment).status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

async function makePayment(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req;
  const pay = _req.body as PaymentSchema;

  try {
    const payment = await paymentsService.makePayment({ userId, ticketId: pay.ticketId, cardData: pay.cardData });
    return res.send(payment).status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default {
  getPaymentInfo,
  makePayment,
};
