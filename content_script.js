// Put all the javascript code here, that you want to execute after page load.
let blockedDomains = [];

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "blockedDomains" in changes) {
    removeResults(changes.blockedDomains.newValue);
  }
});

function isExcludedSitelink(siteLink) {
  return blockedDomains.includes(siteLink.dataset.domain);
}

function removeResults(domains) {
  const results = document.querySelectorAll(".result");
  const siteLink = document.querySelector(".results__sitelink--organics");

  if (siteLink) {
    const siteLinks = Array.from(
      siteLink.querySelectorAll(".result__sitelink-col")
    );
    // hide sitelinks
    if (siteLinks.some(isExcludedSitelink)) {
      siteLink.style.display = "none";
    } else {
      siteLink.style.display = "";
    }
  }

  // Hide Results
  results.forEach((r) => {
    if (domains.includes(r.dataset.domain)) {
      r.style.display = "none";
    } else {
      r.style.display = "";
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
