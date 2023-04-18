import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

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

async function makePayment(_req: Request, res: Response) {
  return;
}

export default {
  getPaymentInfo,
  makePayment,
};
