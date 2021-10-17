interface Listener {
  pattern: URLPattern;
  handler: ({ request, url }: { request: Request; url: URL }) => Response;
}

export const listeners: Listener[] = [{
  pattern: new URLPattern("..."),
  handler: ({ request, url }) => new Response(),
}];
