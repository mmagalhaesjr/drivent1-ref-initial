import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import paymentsController from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/payments', paymentsController.getPaymentInfo);
paymentsRouter.post('/payments/process', validateBody(paymentSchema), paymentsController.makePayment);

export { paymentsRouter };
