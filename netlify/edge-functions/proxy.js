//import { rewriteURI } from '../../lib/rewriteURI';

export default async function handler(req, context) {
  const storeId = Deno.env.get('STORE_ID');
  const requestURL = req.url;
  /*
  This handles the custom/paid for domains.
  How it works:
    It translates a site URI like https://my-store-d9830b.creator-spring.com/ to its custom domain https://www.jarrett.lol
    It does this by rewriting the index.html for https://www.jarrett.lol (on this site) to the content contained on https://my-store-d9830b.creator-spring.com/ (on the deployed site).
  */
  const resp = await rewriteURI(requestURL, storeId);
  console.log(resp);
  return resp;
}

export async function rewriteURI(requestURL, storeId){
  console.log(JSON.stringify(requestURL));
  console.log(JSON.stringify(storeId));
  if(storeId){
      const proxyBase = `${storeId}.creator-spring.com`;
      const proxyTarget = `https://${proxyBase}${new URL(requestURL).pathname}`;
      
      const creatorSpringReq = await fetch(proxyTarget);
      const creatorSpringStream = await creatorSpringReq.body;
      let creatorSpringContents = await new Response(creatorSpringStream).text();
      creatorSpringContents = creatorSpringContents.replace(/window\.location\.hostname/gim, `'${proxyBase}'`)
    
      return new Response(creatorSpringContents, { headers: Object.fromEntries(creatorSpringReq.headers.entries()) });
      }
      else{
        // No StoreID? Do nothing. Keep the original response - should relay something like https://my-store-d9830b.creator-spring.com/
      }
}

export const config = { path: '/*' }
