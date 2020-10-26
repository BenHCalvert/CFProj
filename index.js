// const Router = require('./router');
import { links } from "./links";
import { socialMedia } from "./socialMedia";

// function to return Links 'API'
function linkHandler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ Links })
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

// runs linkHandler or pageHandler depending on path
async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if(path === '/links') {
      return linkHandler()
  } else {
      return pageHandler()
  }
}

/**
 * HTML Manipulation
 *  */
class LinksTransformer {
  constructor(links) {
      this.links = links
  }

  getLinkTag(link) {
      if(link.icon) {
          return `<a href=${link.url}><img src=${link.icon}></img></a>`
      } else {
          return `<a href=${link.url}>${link.name}</a>`
      }
  }
  
  async element(element) {
      this.links.forEach(link => {
          element.append(this.getLinkTag(link), {html: true})
      })
  }
}

class RemoveAttributeTransformer {
  constructor(attribute) {
      this.attributeName = attribute
  }
  
  async element(element) {
      element.removeAttribute(this.attributeName)
  }
}

class SetAttributeTransformer {
  constructor(attribute, value) {
      this.attributeName = attribute
      this.attributeValue = value
  }

  async element(element) {
      element.setAttribute(this.attributeName, this.attributeValue)
  }
}

class SetInnerContentTransformer {
  constructor(value) {
      this.contentValue = value
  }

  async element(element) {
      element.setInnerContent(this.contentValue)
  }
}

const rewriter = new HTMLRewriter()
  .on('div#links', new LinksTransformer(links))
  .on('div#profile', new RemoveAttributeTransformer('style'))
  .on('img#avatar',
      new SetAttributeTransformer(
          'src',
          'https://loremflickr.com/120/120/puppy',
      )
  )
  .on('body', new SetAttributeTransformer("class", "bg-blue-700"))
  .on('title', new SetInnerContentTransformer('Ben Calvert'))
  .on('h1#name', new SetInnerContentTransformer('Ben Calvert'))
  .on('div#social', new RemoveAttributeTransformer('style'))
  .on('div#social', new LinksTransformer(socialMedia))