/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.0.7/dist/vue.esm-browser.js";

const windowObjectRefs = {};

const YAHOO_BASE_SEARCH = "https://search.yahoo.com/search"
const GOOGLE_BASE_SEARCH = "https://www.google.com/search"

// Do not check if tab is already open. The target is will be the same but the URL might be different.
function nav(href, target) {
  console.debug(`Loading: ${target} ${href}`)

  let ref = windowObjectRefs[target]

  ref = window.open(
    href,
    target,
  );
  console.debug(`Loaded: ${target} ${href}`)

  windowObjectRefs[target] = ref
}

const app = createApp({
  components: {
  },
  data() {
    return {
      query: "",
      yahooSearch: "",
      googleSearch: "",
    };
  },
  methods: {
    setQueries() {
      const q = encodeURIComponent(this.query).replace('%20', '+')
      this.yahooSearch = `${YAHOO_BASE_SEARCH}?q=${q}`
      this.googleSearch = `${GOOGLE_BASE_SEARCH}?q=${q}`
    },
    search() {
      nav(this.googleSearch, 'googleSearch')
      nav(this.yahooSearch, 'yahooSearch')
    }
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
