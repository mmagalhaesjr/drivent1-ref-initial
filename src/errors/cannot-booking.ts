import { ApplicationError } from '@/protocols';

export function cannotBooking(): ApplicationError {
  return {
    name: 'cannotBooking',
    message: 'Cannot booking room!',
  };
}
