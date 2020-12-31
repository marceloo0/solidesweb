import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie'

function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize('auth', '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}