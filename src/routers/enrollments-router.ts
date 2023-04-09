import { Router } from 'express';
import { authenticateToken, validateBody, validateQueryParams } from '@/middlewares';
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from '@/controllers';
import { cepSchema, createOrUpdateEnrollmentSchema } from '@/schemas';

const enrollmentsRouter = Router();

enrollmentsRouter
  .get('/cep', validateQueryParams(cepSchema), getAddressFromCEP)
  .all('/*', authenticateToken)
  .get('/', getEnrollmentByUser)
  .post('/', validateBody(createOrUpdateEnrollmentSchema), postCreateOrUpdateEnrollment);

export { enrollmentsRouter };
