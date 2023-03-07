import React from 'https://esm.sh/react'
import { renderToReadableStream } from 'https://esm.sh/react-dom/server'
import type { Config, Context } from 'https://edge.netlify.com/'

export default async function handler(req: Request, context: Context) {
  const storeid = Deno.env.get("STORE_ID");
 // const currentURL = req.url;
  const storeStub = "https://"+ storeid + ".creator-spring.com/";
  const stream = await renderToReadableStream(
    <html>
      <head>
      <meta http-equiv="refresh" content={"0; URL=" + storeStub + ""}  />
      </head>
    </html>,
  )

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  })
}

export const config: Config = {
  path: "/hello"
}