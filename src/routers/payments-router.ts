import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import paymentsController from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/payments', paymentsController.getPaymentInfo);
paymentsRouter.post('/payments/process', paymentsController.makePayment);

export { paymentsRouter };
