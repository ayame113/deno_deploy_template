import { assertEquals } from "https://deno.land/std@0.111.0/testing/asserts.ts";

import { serve } from "./serve.ts";

Deno.test({
  name: "server test",
  async fn(t) {
    const { server, controller } = serve();
    /*await t.step({
      name: "hello-world",
      async fn() */ {
      const response = await fetch("http://localhost:8080/");
      assertEquals(
        await response.text(),
        'Hello World from <a href="https://github.com/ayame113/deno_deploy_template">ayame113/deno_deploy_template</a> !',
      );
      assertEquals(
        response.headers.get("content-type"),
        "text/html; charset=utf-8",
      );
    } /*,
    });
    /*await t.step({
      name: "static server",
      async fn() */

    {
      const response = await fetch("http://localhost:8080/favicon.png");
      assertEquals(
        new Uint8Array(await response.arrayBuffer()),
        await Deno.readFile(
          new URL("./static/favicon.png", import.meta.url),
        ),
      );
      assertEquals(
        response.headers.get("content-type"),
        "image/png",
      );
    } /*,
    });
    await t.step({
      name: "404 server",
      async fn() */

    {
      const response = await fetch("http://localhost:8080/foobar");
      assertEquals(
        await response.text(),
        "404 Not Found\n",
      );
      assertEquals(
        response.status,
        404,
      );
      assertEquals(
        response.headers.get("content-type"),
        "text/plain;charset=UTF-8",
      );
    } /*,
    });*/

    controller.abort();
    await server;
  },
});
