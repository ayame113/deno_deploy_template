import { assertEquals } from "https://deno.land/std@0.111.0/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.111.0/async/delay.ts";

Deno.test({
  name: "server test",
  async fn(t) {
    const server = Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-env",
        "--allow-net",
        "--allow-read",
        `${new URL("./serve.ts", import.meta.url)}`,
      ],
    });
    await delay(5000); // Give more information when it fails
    await t.step({
      name: "hello-world",
      async fn() {
        const response = await fetch("http://localhost:8080/");
        assertEquals(
          await response.text(),
          'Hello World from <a href="https://github.com/ayame113/deno_deploy_template">ayame113/deno_deploy_template</a>!',
        );
        assertEquals(
          response.headers.get("content-type"),
          "text/html; charset=utf-8",
        );
      },
    });
    await t.step({
      name: "static server",
      async fn() {
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
      },
    });
    await t.step({
      name: "404 server",
      async fn() {
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
      },
    });
    server.close();
  },
});
