/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.0.7/dist/vue.esm-browser.js";

const windowObjectRefs = {};

const SEARCH_BASES = {
  'yahoo': "https://search.yahoo.com/search",
  'google': "https://www.google.com/search",
}

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
  console.debug(`Loading: ${target} ${href}`);

  let ref = windowObjectRefs[target];

  ref = window.open(href, target);
  console.debug(`Loaded: ${target} ${href}`);

  windowObjectRefs[target] = ref;
}

const app = createApp({
  data() {
    return {
      query: "",
      yahooSearch: "",
      googleSearch: "",
    };
  },
  methods: {
    setQueries() {
      const q = encodeURIComponent(this.query).replace("%20", "+");

      this.yahooSearch = `${SEARCH_BASES['yahoo']}?q=${q}`;
      this.googleSearch = `${SEARCH_BASES['google']}?q=${q}`;
    },
    search() {
      nav(this.googleSearch, "googleSearch");
      nav(this.yahooSearch, "yahooSearch");
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

    <button id="search-button" @click="search()" :disabled="!query">
      Dragon Power!
    </button>

    <br>
    <br>

    <div v-if="query">
      <p>
        <i>Search a selected engine</i>
      </p>

      🕵️‍♂️ <a :href="googleSearch" target="googleSearch">
        Google
      </a>

      <br>

      🕵️‍♂️ <a :href="yahooSearch" target="yahooSearch">
       Yahoo
      </a>
    </div>
  `,
});

app.mount("#app");
