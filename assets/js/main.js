/**
 * Main app module.
 */
import { createApp } from "https://unpkg.com/vue@3.1.1/dist/vue.esm-browser.prod.js";
import { standardUrls, SUPPORTED_ENGINES } from "./engineUrls.js";

const windowObjectRefs = {};

/**
 * Open URL as a managed tab.
 *
 * Do not bother to check if tab is closed or open, as that info is not useful here.
 *
 * @param {string} url The URL to open.
 * @param {string} windowName Reference for the tab. Reusing this reference
 *   allows overwriting the contents of the tab - without opening a new one each
 *   time. In this case, this reuse of a tab is intended to switch to different
 *   search query or query type for the same domain.
 *
 * @returns {Object} Window object reference.
 */
function navigateTo(url, windowName) {
  console.debug(`Opening ${windowName} - ${url}`);

  let ref = windowObjectRefs[windowName];

  ref = window.open(url, windowName);

  windowObjectRefs[windowName] = ref;

  return ref;
}

// The nav function is used to handle open multiple tabs using JS. For selecting
// a single engine, plain HTML is used.
const app = createApp({
  data() {
    return {
      query: "",
      bing: "",
      duckDuckGo: "",
      google: "",
      yahoo: "",
      yandex: "",
      supportedEngines: SUPPORTED_ENGINES,
      popUpsBlocked: false,
    };
  },
  methods: {
    setQueries() {
      const { bing, duckDuckGo, google, yahoo, yandex } = standardUrls(
        this.query,
      );
      this.bing = bing;
      this.duckDuckGo = duckDuckGo;
      this.google = google;
      this.yahoo = yahoo;
      this.yandex = yandex;
    },
    openTabs() {
      for (const engineName of this.supportedEngines) {
        const href = this[engineName];
        const ref = navigateTo(href, engineName);

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

      <span v-for="engineName in this.supportedEngines" key="engineName.id">
        <a :href="this[engineName]" :target="engineName">
            <button class="btn" :title="\`Search with \${engineName}\`"
              :disabled="!query">
              🏮 {{ titlecase(engineName) }}
            </button>
        </a>
      </span>
    </div>
  `,
});

app.mount("#app");
