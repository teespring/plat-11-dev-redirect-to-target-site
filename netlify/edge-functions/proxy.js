export default async function handler(req, context) {
  const storeId = Deno.env.get('STORE_ID');
  const proxyBase = `${storeId}.creator-spring.com`;
  const proxyTarget = `https://${proxyBase}${new URL(req.url).pathname}`;

  const creatorSpringReq = await fetch(proxyTarget);
  const creatorSpringStream = await creatorSpringReq.body;
  let creatorSpringContents = await new Response(creatorSpringStream).text();

  creatorSpringContents = creatorSpringContents.replace(/window\.location\.hostname/gim, `'${proxyBase}'`)

  return new Response(creatorSpringContents, { headers: Object.fromEntries(creatorSpringReq.headers.entries()) });
}

export const config = { path: '/*' }
