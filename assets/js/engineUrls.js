const STANDARD_SEARCH_BASES = {
  bing: "https://www.bing.com/search",
  duckDuckGo: "https://duckduckgo.com/",
  google: "https://www.google.com/search",
  yahoo: "https://search.yahoo.com/search",
  yandex: "https://yandex.com/search/",
};

export const SUPPORTED_ENGINES = Object.keys(STANDARD_SEARCH_BASES)

/**
 * URL encode a search query string.
 *
 * @param {string} query
 *
 * @returns {string} encoded string.
 */
function encode(query) {
  return encodeURIComponent(query).replace("%20", "+");
}

export function standardUrls(query) {
  const q = encode(query)

  const bing = `${STANDARD_SEARCH_BASES.bing}?q=${q}`;
  const duckDuckGo = `${STANDARD_SEARCH_BASES.duckDuckGo}?q=${q}`;
  const google = `${STANDARD_SEARCH_BASES.google}?q=${q}`;
  const yahoo = `${STANDARD_SEARCH_BASES.yahoo}?q=${q}`;
  const yandex = `${STANDARD_SEARCH_BASES.yandex}?text=${q}`;

  return { bing, duckDuckGo, google, yahoo, yandex }
}
