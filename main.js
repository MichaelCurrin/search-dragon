/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.0.7/dist/vue.esm-browser.js";

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
    <div>
      <label for="search-input">
        Query
      </label>
      {{ }}
      <input id="search-input" type="text" v-model="query" @input="setQueries" required/>
    </div >

    <br>

    <p>
      <i>Search all engines</i>
    </p>

    <button id="search-button" @click="search()" :disabled="!query" title="Search with all supported engines">
      Dragon Power!
    </button>

    <br>
    <br>

    <div v-if="query">
      <p>
        <i>Search a selected engine</i>
      </p>

      <div v-for="engine in this.supportedEngines" key="engine.id">
        🕵️‍♂️ <a :href="this[engine]" :target="engine">
          {{ engine[0].toUpperCase() }}{{ engine.slice(1, engine.length)}}
        </a>
      </div>
    </div>

    <p>
      Existing tabs for a search engine will be reused where possible, even if the search query is different.
    </p>
  `,
});

app.mount("#app");
