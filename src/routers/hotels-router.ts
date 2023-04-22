import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken);
hotelsRouter.get('/', hotelsController.listAllHotels);
hotelsRouter.get('/:hotelId', hotelsController.listAllHotelsRooms);

export { hotelsRouter };
