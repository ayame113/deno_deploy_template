import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";
// TODO: version up
import * as path from "https://deno.land/std@0.107.0/path/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.10.2/mod.ts";

listenAndServe(":80", async (request) => {
  const url = new URL(request.url);
  try {
    return new Response(await Deno.readFile(new URL(`./static${url.pathname}`, import.meta.url)), {
      headers: {
        "Content-Type": contentType(path.extname(request.url)) ?? "text/plain",
      },
    });
  } catch {
    // TODO: Not Found Error
    return new Response("404 Not Found\n", { status: 404 });
  }
});
