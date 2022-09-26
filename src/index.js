const MAIN_CSS =
`body { font-family: Helvetica, Sans, Arial;
        font-size: medium;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
}
div {
  padding-bottom: 10pt;
}
.word {
  text-align: center;
  font-size: 500%;
}
.err {
  font-size: 90%;
  color: #AA0000;
}
.title {
  text-align: center;
  font-size:500%;
}`;

async function handle_get(req, env) {
    let url = new URL(req.url);
    console.log("path = ", url.pathname);
    if (url.pathname == "/main.css") {
      return new Response(MAIN_CSS);
    }

    let value = await env.WORDS.get("posit");
  return (new Response("Hello World. definition of 'posit': " + value));
}

export default {
  async fetch(req, env) {
    if (req.method == "GET") {
      return await handle_get(req, env);
    } else {
      return new Response(400);
    }
  },

  async scheduled(event, env, ctx) {
    // event.cron is a string, the name of the cron trigger.
  }
}
