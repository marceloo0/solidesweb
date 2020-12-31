import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';

import { connectToDatabase } from '../../../utils/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { method } = req;

    if (method === 'POST') {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }

      const hashPassword = await hash(password, 8);
      const { db } = await connectToDatabase();
      const user = db.collection('users');

      const checkUser = await user.findOne({email});

      if (checkUser) {
        return res.status(400).json({error: 'Email already registered, try another.'})
      }

      await user.insertOne({
        name,
        email,
        password: hashPassword,
      })

      return res.status(200).json({ ok:true });
    } else {
      res.status(400).json({ error: 'We only support POST'})
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
