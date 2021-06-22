/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.1.1/dist/vue.esm-browser.prod.js";

const windowObjectRefs = {};

const SEARCH_BASES = {
  bing: "https://www.bing.com/search",
  duckDuckGo: "https://duckduckgo.com/",
  google: "https://www.google.com/search",
  yahoo: "https://search.yahoo.com/search",
  yandex: "https://yandex.com/search/",
};

/**
 * Open URL as a tab.
 *
 * @param {string} url The URL to open.
 * @param {string} windowName Reference for the tab. Reusing this reference allows overwriting the
 *   contents of the tab without opening a new one each time. In this case, this reuse is intended
 *   even for a different URL (as it is expected to still be for the same domain).
 *
 * Do not both to check if tab is closed or open.
 */
function nav(url, windowName) {
  console.debug(`Opening ${windowName} - ${url}`);

  let ref = windowObjectRefs[windowName];

  ref = window.open(url, windowName);

  windowObjectRefs[windowName] = ref;
}

const app = createApp({
  data() {
    return {
      query: "",
      bing: "",
      duckDuckGo: "",
      google: "",
      yahoo: "",
      yandex: "",
      supportedEngines: Object.keys(SEARCH_BASES),
    };
  },
  methods: {
    setQueries() {
      const q = encodeURIComponent(this.query).replace("%20", "+");

      this.bing = `${SEARCH_BASES.bing}?q=${q}`;
      this.duckDuckGo = `${SEARCH_BASES.duckDuckGo}?q=${q}`;
      this.google = `${SEARCH_BASES.google}?q=${q}`;
      this.yahoo = `${SEARCH_BASES.yahoo}?q=${q}`;
      this.yandex = `${SEARCH_BASES.yandex}?text=${q}`;
    },
    search() {
      for (const engine of this.supportedEngines) {
        const href = this[engine];
        nav(href, engine);
      }
    },
  },
  template: `
    <h2>Dragon search engine</h2>

    <div id="query">
      <label for="search-input">
        Query
      </label>
      {{ }}
      <input id="search-input" type="text"
        v-model="query"
        @input="setQueries"
        placeholder="e.g. Chinese dragon"
        size="40"
        autofocus
        required/>
    </div >

    <br>

    <button id="search-button" @click="search()" :disabled="!query"
      title="Search with all supported engines">
      Search all
    </button>

    <br>
    <br>

    <div v-if="query">
      <p>
        <i>Use selected engine</i>
      </p>

      <div v-for="engine in this.supportedEngines" key="engine.id">
        🕵️‍♂️ <a :href="this[engine]" :target="engine">
          {{ engine[0].toUpperCase() }}{{ engine.slice(1, engine.length)}}
        </a>
      </div>
    </div>

    <h2>How to use</h2>

    <p>
      Enter a value for Query box and then search all engines (opening or updating multiple tabs at once) or against a specific engine (opening or updating only one tab).
    </p>
    <p>
      Once tabs are opened, the existing tabs for each search engine will be <i>reused</i> for subsequent searches. This keeps the total number of tabs limited.
    </p>
    <p>
      ⚠️ Be sure to <b>allow pop-ups</b> on the Search Dragon site, so that new tabs are not blocked by your browser. To do this, click the search all button and then check at the top of the Search Dragon site for a browser notication. Then click to allow e.g. on Firefox click "allow all pop-ups for michaelcurrin.github.io" or edit permissions by clicking the permissions icon in the URL bar, just before "https" on Firefox and Chrome.
    </p>
  `,
});

app.mount("#app");
