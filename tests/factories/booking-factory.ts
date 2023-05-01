import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User, Booking } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
export async function createBooking(_params: Partial<Booking> = {}): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId: _params.roomId,
      userId: _params.userId,
    },
  });
}
