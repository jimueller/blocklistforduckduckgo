// Put all the javascript code here, that you want to execute after page load.
let blockedDomains = [];

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "blockedDomains" in changes) {
    removeResults(changes.blockedDomains.newValue);
  }
});

function removeResults(domains) {
  const results = document.querySelectorAll(".result");
  results.forEach((r) => {
    r.style.display = "";
    if (domains.includes(r.dataset.domain)) {
      r.style.display = "none";
    }
  });
}

async function loadDomains() {
  const results = await browser.storage.local.get("blockedDomains");
  if (results && results.blockedDomains) {
    blockedDomains = results.blockedDomains;
  }
}

async function init() {
  await loadDomains();
  removeResults(blockedDomains);
}

window.addEventListener("load", () => init().catch((e) => console.error(e)));
