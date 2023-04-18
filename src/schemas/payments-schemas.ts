import Joi, { ObjectSchema } from 'joi';

export type PaymentSchema = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};
export const paymentSchema: ObjectSchema<PaymentSchema> = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
