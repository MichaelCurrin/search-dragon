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
 *   contents of the tab - without opening a new one each time. In this case, this reuse of a tab is
 *   intended to switch to different search query or query type for the same domain.
 *
 * Do not bother to check if tab is closed or open, as that info is not useful here.
 */
function nav(url, windowName) {
  console.debug(`Opening ${windowName} - ${url}`);

  let ref = windowObjectRefs[windowName];

  ref = window.open(url, windowName);

  windowObjectRefs[windowName] = ref;

  return ref;
}

function encode(query) {
  return encodeURIComponent(query).replace("%20", "+");
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
      const q = encode(this.query);

      this.bing = `${SEARCH_BASES.bing}?q=${q}`;
      this.duckDuckGo = `${SEARCH_BASES.duckDuckGo}?q=${q}`;
      this.google = `${SEARCH_BASES.google}?q=${q}`;
      this.yahoo = `${SEARCH_BASES.yahoo}?q=${q}`;
      this.yandex = `${SEARCH_BASES.yandex}?text=${q}`;
    },
    openTabs() {
      for (const engineName of this.supportedEngines) {
        const href = this[engineName];
        const ref = nav(href, engineName);

        if (ref === null) {
          this.popUpsBlocked = true;
        }
      }
    },
    permissionWarning() {
      if (this.popUpsBlocked === true) {
        alert("Please enable pop-ups on Search Dragon and then search again.");
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
    <div id="query">
      <label for="search-input">
        Query 🔍
      </label>
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

    <button class="btn" @click="searchAll" :disabled="!query"
      title="Search with all supported engines">
      🔥 Search all engines
    </button>

    <div>
      <p>
        Search one engine
      </p>

      <div v-for="engineName in this.supportedEngines" key="engineName.id">
        <a :href="this[engineName]" :target="engineName">
            <button class="btn" :title="\`Search with \${engineName}\`" :disabled="!query">
              🏮 {{ titlecase(engineName) }}
            </button>
        </a>
      </div>
    </div>
  `,
});

app.mount("#app");
