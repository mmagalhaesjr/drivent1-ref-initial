import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function listAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function listAllHotelsRooms(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  listAllHotels,
  listAllHotelsRooms,
};

export default hotelsRepository;
