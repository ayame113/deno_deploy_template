import { contentType } from "https://deno.land/x/media_types@v2.10.2/mod.ts";

if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  await import("https://deno.land/x/dotenv@v3.0.0/load.ts");
}

interface Listener {
  pattern: URLPattern;
  handler: (
    { request, url }: { request: Readonly<Request>; url: Readonly<URL> },
  ) => Response;
}

export const listeners: Listener[] = [{
  pattern: new URLPattern({ pathname: "/" }),
  // deno-lint-ignore no-unused-vars
  handler: ({ request, url }) =>
    new Response(
      'Hello World from <a href="https://github.com/ayame113/deno_deploy_template">ayame113/deno_deploy_template</a>!',
      {
        headers: {
          "Content-Type": contentType("html") ??
            "text/plain",
        },
      },
    ),
}];
