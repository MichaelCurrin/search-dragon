/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.1.1/dist/vue.esm-browser.js";

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
 * @param {string} href The URL to open.
 * @param {string} target Reference for the tab. Reusing this reference allows overwriting the
 *   contents of the tab without opening a new one each time. In this case, this reuse is intended
 *   even for a different URL (as it is expected to still be for the same domain).
 *
 * Do not both to check if tab is closed or open.
 */
function nav(href, target) {
  console.debug(`Loading ${target} - ${href}`);

  let ref = windowObjectRefs[target];

  ref = window.open(href, target);

  windowObjectRefs[target] = ref;
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
    <h2>Dragon engine</h2>

    <div>
      <label for="search-input">
        Query
      </label>
      {{ }}
      <input id="search-input" type="text" v-model="query" @input="setQueries" placeholder="e.g. Chinese dragon" required/>
    </div >

    <br>

    <button id="search-button" @click="search()" :disabled="!query" title="Search with all supported engines">
      Search all
    </button>

    <br>
    <br>

    <div v-if="query">
      <p>
        <i>Search query on selected engine</i>
      </p>

      <div v-for="engine in this.supportedEngines" key="engine.id">
        🕵️‍♂️ <a :href="this[engine]" :target="engine">
          {{ engine[0].toUpperCase() }}{{ engine.slice(1, engine.length)}}
        </a>
      </div>
    </div>

    <h2>Help</h2>

    <p>
      Enter a value for Query box and then search all engines or choose to search a specific one.
    </p>
    <p>
      Once tabs ared opened, the existing tabs for each search engine will be reused on subsequent searches, keeping the total number of tabs limited.
    </p>
    <p>
      Be sure to <b>allow pop-ups</b> on the Search Dragon site, so that tabs are not blocked by your browser. You'll get a notification on the first search and then should click to allow pop-ups.
    </p>
  `,
});

app.mount("#app");
