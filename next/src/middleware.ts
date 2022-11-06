import { NextRequest, NextResponse } from 'next/server'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import axios from 'axios'

export async function middleware(req: NextRequest) {
  // API設定
  const api = axios.create({
    baseURL: process.env.API_SERVER_ENDPOINT,
    headers: {
      Cookie: req.headers.get('cookie') ?? '',
      referer: req.headers.get('referer') ?? '',
    },
    adapter: fetchAdapter,
  })

  let nextResponse = NextResponse.next()

  // 403権限無しエラーであればリダイレクト
  await api.get('api/user').catch(({ response }) => {
    response.status === 403 &&
      (nextResponse = NextResponse.redirect(`${process.env.APP_URL}auth/login`))
  })

  return nextResponse
}

// 下記ページへは未ログインでは遷移不可
export const config = {
  matcher: ['/user'],
}
