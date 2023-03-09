// Assert that the response is rewritten correctly.
//const rewriteURI  = require('../lib/rewriteURI');
import rewriteURI from '../lib/rewriteURI';
//const rewriteURI = require('../lib/rewriteURI');
test('It takes a website with an environmental variable and returns a response', async () => {
// Arrange
const requestURL = "http://localhost:8888/"; // there are many others.
const storeId = "my-store-d9830b";
// Act
const resp = await rewriteURI(requestURL, storeId);
// Assert
const foo = JSON.stringify(resp);
console.log(foo);
})