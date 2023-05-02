import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingSchema } from '@/schemas/booking-schema';
// eslint-disable-next-line import/namespace
import { createBooking, getBooking, updateBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(bookingSchema), createBooking)
  .get('/', getBooking)
  .put('/:bookingId', validateBody(bookingSchema), updateBooking);

export { bookingRouter };
