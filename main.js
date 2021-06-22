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

  return ref;
}

// The nav function is used to handle open multiple tabs using JS. For selecting a single engine,
// plain HTML is used.
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
      popUpsBlocked: false,
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
    openTabs() {
      for (const engine of this.supportedEngines) {
        const href = this[engine];
        const ref = nav(href, engine);

        if (ref === null) {
          this.popUpsBlocked = true;
        }
      }
    },
    permissionWarning() {
      if (this.popUpsBlocked === true) {
        alert(
          "Please enable pop-ups on Search Dragon dragon and then search again."
        );
      }
    },
    searchAll() {
      this.openTabs();
      this.permissionWarning();
    },
    titlecase(value) {
      return `${value[0].toUpperCase()}${value.slice(1, value.length)}`;
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
        @keyup.enter="searchAll"
        placeholder="e.g. Chinese dragon"
        size="40"
        autofocus
        required/>
    </div >

    <br>

    <button id="search-button" @click="searchAll" :disabled="!query"
      title="Search with all supported engines">
      Search all 🔥
    </button>

    <br>
    <br>

    <div v-if="query">
      <p>
        Search above query on one search engine
      </p>

      <div v-for="engineName in this.supportedEngines" key="engineName.id">
        🏮 <a :href="this[engineName]" :target="engineName">
          {{ titlecase(engineName) }}
        </a>
      </div>
    </div>

    <br>

    <h2>How to use</h2>

    <div id="help">
    <p>
      <ol>
        <li>Enter a search query.</li>
        <li>Do a search.
          <ul>
            <li>Search all engines using the button or pressing <kbd>Enter</kbd> (opening or updating multiple tabs at once).
            <li>Or click a specific engine (opening or updating only one tab).
          </ul>
        </li>
        <li>
          Come back to the Search Dragon tab to enter another query.
        </li>
        <li>
          Do a search again. Note that the existing tab from the previous search will be reused. This keeps the total number of tabs limited and easy to manage.
        </li>
      </ol>
    </p>

    <p>
      ⚠️ Be sure to <b>allow pop-ups</b> on the Search Dragon site, so that new tabs are not blocked by your browser. To do this, click the search all button and then check at the top of the Search Dragon site for a browser notication. Then click to allow e.g. on Firefox click "allow all pop-ups for michaelcurrin.github.io" or edit permissions by clicking the permissions icon in the URL bar, just before "https" on Firefox and Chrome.
    </p>
    </div>
  `,
});

app.mount("#app");
