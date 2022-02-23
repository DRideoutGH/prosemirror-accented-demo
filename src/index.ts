import basic from "./basic"

let options = { basic };

function onhash(hash) {
  if (hash in options) {
    options[hash]();
  }
}
if (window.location.hash) {
  onhash(window.location.hash.slice(1));
}

window.addEventListener("hashchange", function (ev) {
  onhash(window.location.hash.slice(1));
});
window.location.hash = window.location.hash || "basic";