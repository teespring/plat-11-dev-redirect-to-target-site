export default async function rewriteURI(requestURL, storeId){
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
//module.exports = rewriteURI;