interface Listener {
  pattern: UrlPattern();
  handler: ({request, url}: {Request, URL}) => Response;
}

export const listeners: Listener[] = [{
  pattern: new UrlPattern(),
  handler: ({request, url}) => new Response(),
}]
