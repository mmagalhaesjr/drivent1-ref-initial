import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsServices from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketsTypes(_req: Request, res: Response) {
  try {
    const ticketTypes = await ticketsServices.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTickets(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req;

  try {
    const ticket = await ticketsServices.getTickets(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;

  try {
    const ticket = await ticketsServices.postNewTicket({ userId, ticketTypeId });
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
