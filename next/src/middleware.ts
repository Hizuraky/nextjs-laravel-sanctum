import { NextRequest, NextResponse } from 'next/server'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import axios from 'axios'

export async function middleware(req: NextRequest) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDOPOINT,
    headers: {
      Cookie: req.headers.get('cookie') ?? '',
      referer: req.headers.get('referer') ?? '',
    },
    adapter: fetchAdapter,
  })

  let response = NextResponse.next()

  await api
    .get('api/me')
    .then(() => (response = NextResponse.next()))
    .catch(() => (response = NextResponse.redirect(`http://localhost:3000/login`)))

  return response
}

export const config = {
  matcher: '/',
}
