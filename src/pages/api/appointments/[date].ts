import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { ObjectID } from 'mongodb';

import { connectToDatabase } from '../../../utils/mongodb';
import { secret } from '../../../utils/secret';
import {authenticated} from '../authenticated';

interface ErrorResponseType {
  error: string;
}

interface TokenPayload {
  iat: number;
  exp: number;
  userId: string;
}

export default authenticated(async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | Record<string, unknown>[]>
  ): Promise<void> => {
  const token = verify(req.cookies.auth!, secret)
  const { userId } = token as TokenPayload;

    const { method } = req;
    const { db } = await connectToDatabase();
    const appointment = db.collection('appointments');

    if (method === 'GET') {
      try {
        const { date } = req.query;

        const response = await appointment.find(
          { userId: userId, date: { $regex: date.toString()} } 
        ).toArray();
        return res.status(200).json(response);
      } catch (error) {
        res.status(500).end();
      }
    }else {
      res.status(500)
      res.end()
    }
})
