// Import data from links and social media files
import { links } from "./links";
import { socialMedia } from "./socialMedia";

// function to return Links 'API'
function linkHandler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ links })
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
      alert("Error: " + response.status);
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
class LinkCreator {
  constructor(links) {
      this.links = links
  }

  makeAnchorTag(link) {
      if(link.icon) {
          return `<a href=${link.url} class='socialLinkBtn'> <img src=${link.icon}> </img> </a>`
      } else {
          return `<a href=${link.url} class='linkBtn'>${link.name}</a>`
      }
  }
  
  async element(element) {
      this.links.forEach(link => {
          element.append(this.makeAnchorTag(link), {html: true})
      })
  }
}

// Method to replace content of an element
class SetInnerContentWriter {
    constructor(value) {
        this.contentValue = value
    }
    
    async element(element) {
        element.setInnerContent(this.contentValue)
    }
}

// Method to remove an HTML tag's attribute
class RemoveAttributeWriter {
  constructor(attribute) {
      this.attributeName = attribute
  }
  
  async element(element) {
      element.removeAttribute(this.attributeName)
  }
}

// Sets attribute or creates if it doesn't exist
class SetAttributeWriter {
  constructor(attribute, value) {
      this.attributeName = attribute
      this.attributeValue = value
  }

  async element(element) {
      element.setAttribute(this.attributeName, this.attributeValue)
  }
}

// create & change everything from above methods
const rewriter = new HTMLRewriter()
.on('h1#name', new SetInnerContentWriter('Ben Calvert'))
.on('title', new SetInnerContentWriter('Ben Calvert'))
.on('body', new SetAttributeWriter("class", "bg-blue-700"))
.on('div#links', new LinkCreator(links))
.on('div#profile', new RemoveAttributeWriter('style'))
.on('img#avatar',new SetAttributeWriter('src', 'https://loremflickr.com/120/120/puppy'))
.on('div#social', new RemoveAttributeWriter('display'))
.on('div#social', new RemoveAttributeWriter('style'))
.on('div#social', new LinkCreator(socialMedia))