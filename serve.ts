import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
import * as path from "https://deno.land/std@0.111.0/path/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.10.2/mod.ts";

import { listeners } from "./listener.ts";

listenAndServe(":80", async (request) => {
  const url = new URL(request.url);
  try {
    for (const listener of listeners) {
      if (listener.pattern.test(url)) {
        return listener.handler({ request, url });
      }
    }
  } catch {
    return new Response("500 Internal Server Error\n", { status: 500 });
  }
  try {
    return new Response(
      await Deno.readFile(new URL(`./static${url.pathname}`, import.meta.url)),
      {
        headers: {
          "Content-Type": contentType(path.extname(request.url)) ??
            "text/plain",
        },
      },
    );
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return new Response("404 Not Found\n", { status: 404 });
    }
    return new Response("500 Internal Server Error\n", { status: 500 });
  }
});
