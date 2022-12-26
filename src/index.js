const MAIN_CSS =
`body { font-family: Helvetica, Sans, Arial;
        font-size: 24px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
}
* {
  box-sizing: border-box;
}
.definition {
   font-size: 28px;
}
@media (max-width: 530px) {
  .definition { font-size: 7vw; }
}
div {
  padding-bottom: 10pt;
}
.word {
  text-align: center;
  font-size: 500%;
  font-weight: bold;
}
@media (max-width: 530px) {
  .word { font-size: 11vw; }
}
.big-error {
  text-align: center;
  font-size: 500%;
  font-weight: bold;
  color: #AA0000;
}
@media (max-width: 530px) {
  .big-error { font-size: 11vw; }
}
.err {
  font-size: 90%;
  color: #AA0000;
}
.title {
  text-align: center;
  font-size: 500%;
}
.attribution {
   font-size: 11px;
   font-style: italic;
}
.definition-form {
   text-align: right;
   margin: auto;
}
.full-width {
   width: 500px;
}
@media (max-width: 530px) {
  .title { font-size: 16vw; }
}
@media (max-width: 500px) {
  .full-width {
     width: 97vw;
  }
}
input[name="definition"] {
   width: 100%;
   font-size: 22px;
}
.footer {
  margin: auto;
  font-size: 13px;
}
a[class="home-link"] {
  font-size: 15px;
}
.source-link {
  font-size: 12px;
  margin-bottom: 13px;
}
.logged-in {
  font-style: italic;
  font-size: 11px;
}

.footer-row {
 display:flex;
 justify-content: space-between;
}


.footer form input {
  width: 110px;
}

@media (max-width: 475px) {
  a[class="home-link"] {
    font-size: 3vw;
   }
 .footer form {
  text-align: right;
  width: 30vw;
 }
 .footer form input {
   width: 100%;
 }
}

.history {
   text-align: left;
   margin: auto;
   font-size: 14px;
   font-style: italic;
}

.not-defined {
  border-style: dotted;
  border-width: 1px;
}

.status {
  border-style: dotted;
  text-align: left;
  margin: auto;
  font-size: 17px;
}

.status-title {
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
}
`;

const FAVICON =
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9"+
"kT1Iw1AUhU9TRZGKgx20OGSoTi2IijhqFYpQIdQKrTqYvPQPmjQkKS6OgmvBwZ/FqoOLs64OroIg"+
"+APi6OSk6CIl3pcUWsR44fE+zrvn8N59gNCoMM3qGgc03TbTyYSYza2KPa8IIYIAYhiWmWXMSVIK"+
"vvV1T51Ud3Ge5d/3Z/WreYsBAZF4lhmmTbxBPL1pG5z3icOsJKvE58Qxky5I/Mh1xeM3zkWXBZ4Z"+
"NjPpeeIwsVjsYKWDWcnUiKeIo6qmU76Q9VjlvMVZq9RY6578haG8vrLMdVojSGIRS5AgQkENZVRg"+
"I067ToqFNJ0nfPwR1y+RSyFXGYwcC6hCg+z6wf/g92ytwuSElxRKAN0vjvMxCvTsAs2643wfO07z"+
"BAg+A1d6219tADOfpNfbWvQIGNgGLq7bmrIHXO4AQ0+GbMquFKQlFArA+xl9Uw4YvAX61ry5tc5x"+
"+gBkaFapG+DgEBgrUva6z7t7O+f2b09rfj99QXKrviVv+gAAAAZiS0dEAP8A/wD/oL2nkwAAAAlw"+
"SFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YMGgE1GqgMWT4AAAAZdEVYdENvbW1lbnQAQ3JlYXRl"+
"ZCB3aXRoIEdJTVBXgQ4XAAABIUlEQVQ4y8XTIYpCURiG4ffOOrS4ArtLMIlottg0uAV3IAhuwKSI"+
"cLGYTEZNYhKEiwgGkxoEve80meE61xkM88FJ5/Dw8fOfQJU38sGbSQCdTocgCMhms5zP59eCX3I6"+
"ncxkMgICzmYzX+Vbg+VyyW63o9frATAYDP7WoNVqCXg4HKzX6wJGUZTa4AHs93sBa7WaqmEYCtjv"+
"938HjEYjAcfjsapRFAlYKBS8Xq/pwO12s1gsCrjdblWN49hyuSzgYrFIB9br9WPyz0673U4Hut1u"+
"KgB4PB6fA5fLxVwu9+PEG42GgJPJ5Dkwn88FLJVKxnGceDCdTgWsVCre73dVm82mgKvVyo8wDAGo"+
"VqsEQZDYk3w+D8BwOGSz2STug3//jZ8Ex9veGfX3QgAAAABJRU5ErkJggg==";

const HEADER =
`<head>
<meta name="viewport" content="width=device-width">
<title> acronymy </title><link rel="stylesheet" type="text/css" href="/main.css" >
<link rel="icon" type="image/png" href="data:image/png;base64,${FAVICON}">
</head>`;

function define_form(word, initial_value) {
  let maybe_value = "";
  if (initial_value) {
    maybe_value = `value="${initial_value}"`;
  }
  return `<div class="definition-form full-width">
          <form action="/define/${word}" method="post">
          <input name=\"definition\" maxlength=\"2000\" placeholder="enter new definition" class="definition-input-text" ${maybe_value} autofocus required/>
          <br>
          <button>submit</button></form>
          </div>`;
}

function render_home_footer(maybe_username) {
  let result = `<div class="footer full-width">
                    <hr>
                <div class="footer-row">`;
  result += `<form action="/define" method="get">
             <input name="word" maxlength="100" size="15"
                    placeholder="enter word" autofocus required/>
             <button>look up</button></form>`;
  result += `<a class="source-link"
                href="https://github.com/dwrensha/acronymy-workers">source code</a>`

  if (maybe_username) {
    result += `<form class="logged-in" action="/logout">logged in as ${maybe_username}
               <button>log out</button></form>`
  } else {
    result +=
      `<form action="/login"><input name="username" placeholder="username" size="10" required/>
       <button>log in</button>`;
  }
  result += `</form></div></div>`;
  return result;
}

function render_def_footer(word, maybe_username) {
  let result = `<div class="footer full-width">
                <hr>
                <div class="footer-row">`;

  result += `<form action="/define" method="get">
             <input name="word" maxlength="100" size="15"
                    placeholder="enter word" required/>
             <button>look up</button></form>`;

  result += `<a class="home-link" href=\"/\">Acronymy</a>`

  if (maybe_username) {
    result += `<form action="/logout">logged in as ${maybe_username}
               <input name=\"word\" value=\"${word}\" type=\"hidden\"/>
               <button>log out</button></form>`
  } else {
    result +=
      `<form action="/login"><input name="username" placeholder="username" size="10" required/>
       <input name=\"word\" value=\"${word}\" type=\"hidden\"/>
       <button>log in</button>`;
  }
  result += `</form></div></div>`;
  return result;
}

const WORD_LIST_KEY = "word-list";
const STATUS_KEY = "status";

class WordList {
  constructor() {
    // One Set for each possible initial letter of a word.
    // The wordlist is sharded like this to decrease the cold-start
    // cost of looking up a single word.
    this.subsets = new Map();
  }

  async is_word(query, env) {
    if (query.length == 0) return false;
    let first_letter = query[0];
    if (!this.subsets.has(first_letter)) {
      let raw_word_list = await env.META.get(WORD_LIST_KEY + "-" + first_letter);
      if (!raw_word_list) {
        return false;
      }
      let subset = new Set();
      this.subsets.set(first_letter, subset);
      let words = raw_word_list.split(/\s+/);
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
  let def_promises = [];
  for (let def_word of def) {
    let match = def_word.match(/[^a-zA-Z\s]/);
    if (match) {
      return {
        invalid: true,
        reason: `invalid character: '${match}'`
      };
    }
    def_promises.push(WORD_LIST.is_word(def_word, env));
  }
  let defs = await Promise.all(def_promises);
  for (let ii = 0; ii < def.length; ++ii) {
    let def_word = def[ii];
    let def_word_def = defs[ii];
    if (!def_word_def) {
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


async function render_definition(env, word, definition, metadata) {
  let response_string = "";
  if (definition) {
    let def_words = definition.split(" ");
    let def_promises = [];
    for (let def_word of def_words) {
      def_promises.push(env.WORDS.get(def_word));
    }
    let defs = await Promise.all(def_promises);

    response_string += `<div class="definition">`
    for (let ii = 0; ii < def_words.length; ++ii){
      let def_word = def_words[ii];
      let def_word_def = defs[ii];
      let not_defined_class="";
      if (!def_word_def) {
        not_defined_class = `class="not-defined"`;
      }
      response_string += ` <a href="/define/${def_word}" ${not_defined_class}>${def_word}</a> `;
    }
    response_string += "</div>";
    response_string += `<div class="attribution">`;
    if (metadata && metadata.time) {
      let time = new Date(metadata.time);
      response_string += `—defined ${time.toUTCString()}`;
      if (metadata.user) {
        response_string += ` by ${metadata.user}`;
      }
      response_string += ` <a href="/history?word=${word}">[history]</a>`
    } else {
      response_string += `—defined before the beginning of history (October 2022)`;
    }
    response_string += `</div>`;
  } else {
    response_string += "<div><i>this word has no definition yet</i></div>";
  }
  return response_string;
}

function render_error(title, message) {
  let response_string = "";
  response_string += `<div class="big-error">`;
  response_string += title;
  response_string += `</div>`;
  response_string += `<div class="err">`;
  response_string += message;
  response_string += `</div>`;
  return response_string;
}

// returns either `{valid: true}` or
// {invalid: true, reason: <string> }.
function validate_username(username) {
  if (!username) {
    return {invalid: true, reason: "username must be nonempty"};
  }
  if (!username.match(/^[0-9a-zA-Z]+$/)) {
    return {invalid: true, reason: "username must be alphanumeric"};
  }
  if (username.length > 20) {
    return {invalid: true, reason: "username must be at most 20 characters"};
  }
  return {valid: true};
}

async function handle_get(req, env) {
  let url = new URL(req.url);
  if (url.origin == "https://acronymy.word.workers.dev") {
    const {pathname, search} = url;
    const destinationURL = "https://acronymy.net" + pathname + search;
    return Response.redirect(destinationURL, 301);
  }

  if (url.pathname == "/main.css") {
    return new Response(MAIN_CSS, {headers: {"Content-type": "text/css"}});
  }

  let username = null;
  if (req.headers.has('Cookie')) {
    for (let cookie of req.headers.get('Cookie').split(";")) {
      let components = cookie.split('=');
      let name = components[0].trim();
      if (name == 'username') {
        username = components[1];
      }
    }
  }

  let response_string = "<!DOCTYPE html><html>" + HEADER + "<body>";
  let response_status = 200;
  if (url.pathname == "/define") {
    // Result of submitting the "look up" form.
    // Redirect to "/define/<word>".
    let word = url.searchParams.get('word');
    if (!word) {
      return new Response("need to specify word", { status: 400 })
    }
    word = word.toLowerCase().trim();
    return new Response("",
                        {status: 302,
                         headers: {'Location': `/define/${word}`, }});
  } else if (url.pathname.startsWith("/define/")) {
    let word = url.pathname.slice("/define/".length);
    let { value, metadata } = await env.WORDS.getWithMetadata(word);
    let definition = value;
    let input_starting_value = null;
    if (!definition && !(await WORD_LIST.is_word(word, env))) {
      response_string += render_error("Not Found", `${word} is not in the word list`);
      response_string += render_def_footer(word, username);
      response_status = 404;
    } else {
      response_string += `<div class=\"word\">${word}</div>`;
      let error_message = null;
      let proposed_definition = null;
      if (req.method == "POST") {
        const form_data = await req.formData();
        for (const entry of form_data.entries()) {
          if (entry[0] == "definition") {
            proposed_definition = entry[1];
          }
        }
      }
      if (proposed_definition) {
        let def_words = proposed_definition.trim().toLowerCase().split(/\s+/);
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
              if (username && validate_username(username).valid) {
                metadata['user'] = username;
              }
              let p1 = env.WORDS.put(word, new_def, {metadata});
              let p2 = env.WORDS_LOG.put(word + ":" + now, new_def, {metadata});
              await Promise.all([p1, p2]);
              return new Response("",
                                  {status: 303,
                                   headers: {'Location': `/define/${word}` }});
            } catch (e) {
              console.log(e);
              error_message =
                "<p>error (daily quota?) while attempting to write definition</p>"
              error_message +=
                `<p>(you should maybe try asking <a href="https://twitter.com/dwrensha">@dwrensha</a> to upgrade to a paid Cloudflare plan)<p>`;
            }
          }
        } else {
          error_message = validation_result.reason;
          input_starting_value = def_words.join(" ");
        }
      }
      response_string += await render_definition(env, word, definition, metadata);
      response_string += define_form(word, input_starting_value);
      if (error_message) {
        response_string += `<div class="err"> ${error_message} </div>`;
      }
      response_string += render_def_footer(word, username);
    }
  } else if (url.pathname == "/login") {
    let word = url.searchParams.get('word');
    let location = "/";
    if (word) {
      location = `/define/${word}`;
    }

    let username = url.searchParams.get('username') || "";
    let username_validation = validate_username(username);
    if (!username_validation.valid) {
      response_string += `<div class="err"> ${username_validation.reason} </div>`;
      response_string += `<a href="${location}">back</a>`;
    } else {
      return new Response("",
                          {status: 302,
                           headers: {'Location': location,
                                     'Set-Cookie': `username=${username}`}});
    }
  } else if (url.pathname == "/logout") {
    let word = url.searchParams.get('word');
    let location = "/";
    if (word) {
      location = `/define/${word}`;
    }
    return new Response("",
                        {status: 302,
                         headers: {'Location': location,
                                   'Set-Cookie':
                                      `username=X; expires=Thu, 01 Jan 1970 00:00:00 GMT`}});
  } else if (url.pathname == "/history") {
    let word = url.searchParams.get('word');
    if (!word) {
      return new Response("need to specify word", { status: 400 })
    }

    let entries = [];
    try {
      while (true) {
        let chunk = await env.WORDS_LOG.list({prefix: word + ":"});
        for (let key of chunk['keys']) {
          entries.push(key);
        }
        if (chunk['list_complete']) {
          break;
        }
      }
    } catch (e) {
      console.log(e);
      return new Response("Error while listing history. Maybe we've hit daily quota?",
                          { status: 500 })
    }
    entries.reverse();

    response_string += `<div>history of definitions for
                        <a href="/define/${word}">${word}</a>:</div>`;
    response_string += `<div class="history full-width"><ul>`
    let promises = [];
    for (let entry of entries) {
      promises.push(await env.WORDS_LOG.get(entry.name));
    }
    let defs = await Promise.all(promises);
    for (let ii = 0; ii < defs.length; ++ii) {
      let def = defs[ii];
      let entry = entries[ii];
      response_string += `<li>${def}`
      let metadata = entry.metadata;
      if (metadata && metadata.time) {
        let time = new Date(metadata.time);
        response_string += ` — defined ${time.toUTCString()}`;
        if (metadata.user) {
          response_string += ` by ${metadata.user}`;
        }
      }
      response_string += `</li>`
    }
    response_string += `</ul></div>`
    response_string += render_def_footer(word, username);
  } else {
    response_string += "<div class=\"title\">Acronymy</div>";
    response_string += "<div>A user-editable, acronym-only dictionary.</div>";
    response_string += `<div class="status full-width">`
    let status = JSON.parse(await env.META.get(STATUS_KEY));
    let word_of_the_day = status.word_of_the_day;
    let timestamp = new Date(status.timestamp);
    response_string += `<h5 class="status-title">status as of ${timestamp.toUTCString()}:</h5>`
    response_string += `<ul>`;
    let percent = (100 * status.num_defined/status.total_num_words).toFixed(3);
    response_string +=
      `<li>${status.num_defined} out of ${status.total_num_words}
           words have been defined (${percent}%).</li>`;
    response_string += "<li>Recently defined words include: ";
    for (let ii = 0; ii < status.recently_defined.length; ++ii) {
      let w = status.recently_defined[ii];
      response_string += `<a href="/define/${w}">${w}</a>`;
      if (ii+1 < status.recently_defined.length) {
        response_string += ", ";
      }
    }
    response_string += ".</li>";
    response_string += "<li>Today's featured word is ";
    response_string += `<b><a href="/define/${word_of_the_day}">${word_of_the_day}</a></b>.`;
    response_string += "</li>";
    response_string += `</div>`;
    response_string += render_home_footer(username);
  }

  response_string += "</body></html>";
  return new Response(response_string,
                      {headers: {'content-type': 'text/html;charset=UTF-8'},
                       status: response_status });
}

export default {
  async fetch(req, env) {
    if (req.method == "GET" || req.method == "POST") {
      return await handle_get(req, env);
    } else {
      return new Response("bad request",
                          { status: 400 });
    }
  },

  async scheduled(event, env, ctx) {
    // event.cron is a string, the name of the cron trigger.

    let words = [];
    let keys = [];
    let options = {};
    while (true) {
      let chunk = await env.WORDS.list(options);
      console.log('keys length: ' + chunk['keys'].length);
      for (let key of chunk['keys']) {
        keys.push(key);
        words.push(key['name']);
      }
      if (chunk['list_complete']) {
        break;
      } else {
        options.cursor = chunk['cursor'];
      }
    }

    keys.sort((k1,k2) => {
      let t1 = (k1.metadata || {}).time || 0;
      let t2 = (k2.metadata || {}).time || 0;
      return t2 - t1;
    });

    let recently_defined = [];
    for (let idx = 0; idx < keys.length && idx < 10; ++idx) {
      recently_defined.push(keys[idx].name);
    }

    let word_list_raw = await env.META.get(WORD_LIST_KEY);
    let word_list_length = word_list_raw.match(/\n/g).length;

    let idx = Math.floor(Math.random() * words.length);
    let word_of_the_day = words[idx];

    let status = {
      timestamp: Date.now(),
      word_of_the_day: word_of_the_day,
      num_defined: words.length,
      total_num_words: word_list_length,
      recently_defined: recently_defined
    };

    await env.META.put(STATUS_KEY, JSON.stringify(status));
  }
}
