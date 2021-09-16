const SEARCH_BASES = {
  bing: "https://www.bing.com/search",
  duckDuckGo: "https://duckduckgo.com/",
  google: "https://www.google.com/search",
  yahoo: "https://search.yahoo.com/search",
  yandex: "https://yandex.com/search/",
};

export const SUPPORTED_ENGINES = Object.keys(SEARCH_BASES)

export function standardUrls() {
  const bing = `${SEARCH_BASES.bing}?q=${q}`;
  const duckDuckGo = `${SEARCH_BASES.duckDuckGo}?q=${q}`;
  const google = `${SEARCH_BASES.google}?q=${q}`;
  const yahoo = `${SEARCH_BASES.yahoo}?q=${q}`;
  const yandex = `${SEARCH_BASES.yandex}?text=${q}`;

  return { bing, duckDuckGo, google, yahoo, yandex }
}
