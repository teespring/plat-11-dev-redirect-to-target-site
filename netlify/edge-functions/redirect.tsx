import React from 'https://esm.sh/react'
import { renderToReadableStream } from 'https://esm.sh/react-dom/server'
import type { Config, Context } from 'https://edge.netlify.com/'

export default async function handler(req: Request, context: Context) {
  const storeid = Deno.env.get("STORE_ID");
 // const currentURL = req.url;
  const storeStub = "https://"+ storeid + ".creator-spring.com/";
  req.location.replace(storeStub);
  const stream = await renderToReadableStream(
    <html>
      <script>
window.location.replace(
  "https://developer.mozilla.org/en-US/docs/Web/API/Location.reload"
);
console.log('hi')
</script>
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