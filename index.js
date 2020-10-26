const Router = require('./router');
import { Store } from "./store";
import { Html } from "./html";
// import css from 'style.css';

const page = 'https://static-links-page.signalnerve.workers.dev';

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ Store })
    return new Response(body, init)
}

async function handleRequest(request) {
    try{
        const r = new Router()
        // Replace with the appropriate paths and handlers
        // r.get('.*/bar', () => new Response('responding for /bar'))
        r.get('.*/links', request => handler(request))
        // r.post('.*/foo.*', request => handler(request))
        r.get('/', request => fetch(page)) // return the response from the origin
        
        // return a default message for the root route
        // r.get('/', () => new Response("Welcome to Ben Calvert's App")) 
    
        // should return html from html.js module
        // r.get('/', () => new Response(Html, {
        //     headers: {
        //       "content-type": "text/html;charset=UTF-8",
        //     },
        //   }))    
    
        const resp = await r.route(request)
        return resp
    }catch (err) {
        return new Response (err)
    }
}
