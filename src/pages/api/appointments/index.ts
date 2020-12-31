import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { format } from 'date-fns';
import { connectToDatabase } from '../../../utils/mongodb';
import { secret } from '../../../utils/secret';
import { authenticated } from '../authenticated';

interface ErrorResponseType {
  error: string;
}

type SuccessResponseType = Array<{
  date: Date;
  period: string;
  userId: string;
  color: string;
}>

interface TokenPayload {
  iat: number;
  exp: number;
  userId: string;
}

export default authenticated(async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
  const token = verify(req.cookies.auth!, secret)
  const { userId } = token as TokenPayload;

  try {
    const { method } = req;
    const { db } = await connectToDatabase();
    const appointment = db.collection('appointments');

    if (method === 'POST') {
        const { date, period, color } = req.body;

        const checkAppointment = await appointment.findOne({ userId, date, period });

        if (checkAppointment) {
          return res.status(400).json({ error: 'Usuario já possui periodo cadatrado hoje.' })
        }

        const response = await appointment.insertOne({
          date,
          period,
          userId,
          color,
        })

        return res.status(200).json(response.ops[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
