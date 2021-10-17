if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  await import("https://deno.land/x/dotenv@v3.0.0/load.ts");
}

interface Listener {
  pattern: URLPattern;
  handler: ({ request, url }: { request: Request; url: URL }) => Response;
}

export const listeners: Listener[] = [{
  pattern: new URLPattern("..."),
  handler: ({ request, url }) => new Response(),
}];
