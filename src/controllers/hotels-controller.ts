import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

async function listAllHotels(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req;

  try {
    const hotels = await hotelsService.listAllHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'paymentRequiredError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function listAllHotelsRooms(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req;
  const { hotelId } = _req.params;

  try {
    const rooms = await hotelsService.listAllHotelsRooms(Number(userId), Number(hotelId));

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === '') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

const hotelsController = {
  listAllHotels,
  listAllHotelsRooms,
};

export default hotelsController;
