import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
}

async function postNewTicket({ status, enrollmentId, ticketTypeId }: CreateTicketParams) {
  return prisma.ticket.create({
    include: {
      TicketType: true,
    },
    data: {
      status,
      ticketTypeId,
      enrollmentId,
    },
  });
}

async function getTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
    include: { Enrollment: true },
  });
}

const ticktesRepository = {
  getTicketsTypes,
  getTickets,
  postNewTicket,
  getTicketById,
};

export default ticktesRepository;
