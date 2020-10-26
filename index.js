const Router = require('./router');
import { Store } from "./store";

// function to return Links 'API'
function linkHandler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ Store })
  return new Response(body, init)
}

// Function to return/rewrite HTML
async function pageHandler() {  
  const page = 'https://static-links-page.signalnerve.workers.dev';
  const init = {
      headers: {
          "content-type": "text/html;charset=UTF-8"
      }
  }
  let response = await fetch(page, init)
  if (response.ok) {
      return rewriter.transform(response);
  } else {
      alert("HTTP-Error: " + response.status);
  }
}

/**
 * Routing
 *  */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// runs linkHandler or pageHandler
async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if(path === '/links') {
      return linkHandler()
  } else {
      return pageHandler()
  }
}

// async function handleRequest(request) {
//     try{
//         const r = new Router()
//         // Replace with the appropriate paths and handlers
//         r.get('.*/bar', () => new Response('responding for /bar'))
//         r.get('.*/links', request => linkHandler(request))
//         r.get('/', request => fetch(page)) // return the response from the origin
        
//         // return a default message for the root route
//         r.get('/', () => new Response("Welcome to Ben Calvert's App")) 
    
//         // should return html from html.js module
//         r.get('/', () => new Response(Html, {
//             headers: {
//               "content-type": "text/html;charset=UTF-8",
//             },
//           }))    
    
//         const resp = await r.route(request);
//         return resp;
        
//     }catch (err) {
//         return new Response (err)
//     }
// }

/**
 * HTML Manipulation
 *  */