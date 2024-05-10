const TRACK_DOMAINS = ["michaelcurrin.github.io", "search-dragon.com"];
const track = TRACK_DOMAINS.includes(window.location.hostname);

if (track) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-MBQMD6HN83");
}
