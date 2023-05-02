import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateBooking } from '@/protocols';
import bookingService from '@/services/booking-service';

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { roomId } = req.body as CreateBooking;

  try {
    const booking = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (e) {
    next(e);
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (e) {
    next(e);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try {
    const booking = await bookingService.updateBooking(userId, Number(roomId));
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (e) {
    next(e);
  }
}
