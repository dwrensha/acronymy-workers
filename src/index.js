const MAIN_CSS =
`body { font-family: Helvetica, Sans, Arial;
        font-size: 24px;
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
}
.link-to-source {
   font-size: 11px;
}
.attribution {
   font-size: 11px;
   font-style: italic;
}
.definition-form {
   text-align: left;
   margin: auto;
   width: 500px;
}
.definition-input-text {
   width: 100%;
   font-size: 20px;
}
`;

const HEADER =
`<head><title> acronymy </title><link rel="stylesheet" type="text/css" href="main.css" >
 </head>`;

const LOOKUP_FORM =
`<form action="define" method="get">
 <input name="word" maxlength="100"/><button>find word</button></form>`;

function define_form(word) {
  return `<div class="definition-form" >
          <form action=\"define\" method=\"get\">
          <input name=\"word\" value=\"${word}\" type=\"hidden\"/>
          <input name=\"definition\" maxlength=\"2000\" placeholder="enter new definition" class="definition-input-text"/>
          <br>
          <button>submit</button></form>
          </div>`;
}

const HOME_LINK = "<a href=\"/\">home</a>";

const WORD_OF_THE_DAY_KEY = "word-of-the-day";
const WORD_LIST_KEY = "word-list";

class WordList {
  constructor() {
    this.subsets = new Map();
  }

  async is_word(query, env) {
    if (query.length == 0) return false;
    let first_letter = query[0];
    if (!this.subsets.has(first_letter)) {
      let subset = new Set();
      this.subsets.set(first_letter, subset);
      let raw_word_list = await env.META.get(WORD_LIST_KEY + "-" + first_letter);
      let words = raw_word_list.split(/[\s+]/);
      for (let word of words) {
        subset.add(word);
      }
    }
    return this.subsets.get(first_letter).has(query);
  }
}
const WORD_LIST = new WordList();

// returns either `{valid: true}` or
// {invalid: true, reason: <string> }.
async function validate_definition(def, word, env) {
  if (def.length != word.length) {
    return {
      invalid: true,
      reason: `definition has length ${def.length}, but word has length ${word.length}`
    };
  }
  let idx = 0;
  for (let def_word of def) {
    if (!(await WORD_LIST.is_word(def_word, env))) {
      return {
        invalid: true,
        reason: `${def_word} is not in the word list`
      };
    }
    if (def_word[0] != word[idx]) {
      return {
        invalid: true,
        reason: `${def_word} does not start with ${word[idx]}`
      };
    }
    idx += 1;
  }

  return {valid: true};
}


function render_definition(definition, metadata) {
  let response_string = "";
  if (definition) {
    let def_words = definition.split(" ");
    response_string += "<div>"
    for (let def_word of def_words) {
      response_string += ` <a href="/define?word=${def_word}">${def_word}</a> `;
    }
    response_string += "</div>";
    if (metadata && metadata.time) {
      let time = new Date(metadata.time);
      response_string += `<div class="attribution">`;
      response_string += `—defined ${time.toUTCString()}`;
      response_string += `</div>`;
    }
  } else {
    response_string += "<div>this word has no definition yet</div>";
  }
  return response_string;
}

async function handle_get(req, env) {
  let url = new URL(req.url);
  if (url.pathname == "/main.css") {
    return new Response(MAIN_CSS);
  }

  let response_string = "<html>" + HEADER + "<body>";

  if (url.pathname == "/define") {
    let word = url.searchParams.get('word');
    if (!word) {
      return new Response("need to specify word", { status: 400 })
    }
    word = word.toLowerCase();
    let { value, metadata } = await env.WORDS.getWithMetadata(word);
    let definition = value;
    if (!definition && !(await WORD_LIST.is_word(word, env))) {
      response_string += `<div class="err">${word} is not in the word list</div>`;
      response_string += LOOKUP_FORM;
      response_string += HOME_LINK;
    } else {
      response_string += `<div class=\"word\">${word}</div>`;
      let error_message = null;
      let proposed_definition = url.searchParams.get('definition');
      if (proposed_definition) {
        let def_words = proposed_definition.trim().toLowerCase().split(/[\s+]/);
        let validation_result = await validate_definition(def_words, word, env);
        if (validation_result.valid) {
          let new_def = def_words.join(" ");
          if (new_def != definition) {
            try {
              let now = Date.now();
              metadata= {
                time: now
              };
              if (req.headers.has('cf-connecting-ip')) {
                metadata['ip'] = req.headers.get('cf-connecting-ip');
              }
              let p1 = env.WORDS.put(word, new_def, {metadata});
              let p2 = env.WORDS_LOG.put(word + ":" + now, new_def, metadata);
              await Promise.all([p1, p2]);
              definition = new_def;
            } catch (e) {
              error_message =
                "<p>error (daily quota?) while attempting to write definition</p>"
              error_message +=
                `<p>(you should maybe try asking <a href="https://twitter.com/dwrensha">@dwrensha</a> to upgrade to a paid Cloudflare plan)<p>`;
            }
          }
        } else {
          definition = await env.WORDS.get(word);
          error_message = validation_result.reason;
        }
      } else {
        definition = await env.WORDS.get(word);
      }
      response_string += render_definition(definition, metadata);
      response_string += define_form(word);
      if (error_message) {
        response_string += `<div class="err"> ${error_message} </div>`;
      }
      response_string += HOME_LINK;
    }
  } else {
    response_string += "<div class=\"title\">Acronymy</div>";
    response_string += "<div>A user-editable, acronym-only dictionary.</div>";
    let word_of_the_day = await env.META.get(WORD_OF_THE_DAY_KEY);
    response_string += "<div>Today's featured word: ";
    response_string += `<a href="/define?word=${word_of_the_day}">${word_of_the_day}</a>`;
    response_string += "</div>"
    response_string += LOOKUP_FORM;
    response_string +=
      `<div class="link-to-source">
        <a href="https://github.com/dwrensha/acronymy-workers">source code</a>
       </div>`;
  }

  response_string += "</body></html>";
  return new Response(response_string,
                      {headers: {'content-type': 'text/html;charset=UTF-8'}});
}

export default {
  async fetch(req, env) {
    if (req.method == "GET") {
      return await handle_get(req, env);
    } else {
      return new Response("bad request",
                          { status: 400 });
    }
  },

  async scheduled(event, env, ctx) {
    // event.cron is a string, the name of the cron trigger.

    let words = [];
    while (true) {
      let chunk = await env.WORDS.list();
      console.log('keys length: ' + chunk['keys'].length);
      for (let key of chunk['keys']) {
        words.push(key['name']);
      }
      if (chunk['list_complete']) {
        break;
      }
    }

    let idx = Math.floor(Math.random() * words.length);
    console.log("idx = ", idx);
    console.log("setting the word of the day to", words[idx]);
    words[idx];
    await env.META.put(WORD_OF_THE_DAY_KEY, words[idx]);
  }
}
