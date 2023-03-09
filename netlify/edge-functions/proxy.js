export default async function handler(req, context) {
  const urlObj = new URL(req.url);
  const storeId = Deno.env.get('STORE_ID');
  const proxyTarget = 'http://localhost:3002'; // This will be the new generic bundle

  const creatorSpringReq = await fetch(proxyTarget);
  const creatorSpringStream = await creatorSpringReq.body;
  let creatorSpringContents = await new Response(creatorSpringStream).text();

  if (storeId) {
    const preSplice = creatorSpringContents.slice(0, creatorSpringContents.lastIndexOf('</head>'));
    const postSplice = creatorSpringContents.slice(creatorSpringContents.lastIndexOf('</head>'));
    creatorSpringContents = `${preSplice}<script>window.localStorage.setItem('STORE_ID','${storeId}')</script>${postSplice}`
  }

  return new Response(creatorSpringContents, { headers: Object.fromEntries(creatorSpringReq.headers.entries()) });
}

export const config = {
  path: '/*',
  excludedPath: '**/*.*'
}
