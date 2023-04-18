import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTickets, getTicketsTypes, postNewTicket } from '@/controllers/tickets-controller';
import { CreateTicketSchema, createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.get('/', getTickets);
ticketsRouter.post('/', validateBody<CreateTicketSchema>(createTicketSchema), postNewTicket);

export { ticketsRouter };
