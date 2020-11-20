const domainInput = document.querySelector("#domain");
const saveButton = document.querySelector("#save");
const domainList = document.querySelector("#blocked-domains");

async function storeSettings(domainsValue) {
  const blockedDomains = domainsValue.split("\n") || [];
  await browser.storage.local.set({
    blockedDomains,
  });
}

async function loadDomains() {
  let domains = [];
  const results = await browser.storage.local.get("blockedDomains");
  if (results && results.blockedDomains) {
    domains = JSON.parse(results.blockedDomains);
  }
  return domains;
}

async function storeDomains(domains) {
  const blockedDomains = JSON.stringify(domains);
  await browser.storage.local.set({
    blockedDomains,
  });
}

async function saveDomain(domain) {
  const domains = await loadDomains();
  domains.push(domain);
  await storeDomains(domains);
}

async function deleteDomain(domain) {
  const domains = await loadDomains();
  const updated = domains.filter((d) => {
    return d !== domain;
  });
  await storeDomains(updated);
  const savedDomains = await loadDomains();
  renderDomainList(savedDomains);
}

async function onSaveClick() {
  let domainText = domainInput.value;
  await saveDomain(domainText);
  const domains = await loadDomains();
  renderDomainList(domains);
  domainInput.value = "";
}

async function onDeleteClick(e) {
  let domain = e.target.dataset.domain;
  await deleteDomain(domain);
}

function onListClick(e) {
  if (e.target && e.target.matches("span.delete-domain")) {
    onDeleteClick(e);
  }
}

function renderDomainList(domains) {
  domainList.innerHTML = "";

  domains.map((d) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(d));
    li.setAttribute("class", "list-domain");
    const deleteSpan = document.createElement("span");
    deleteSpan.setAttribute("class", "delete-domain");
    deleteSpan.setAttribute("data-domain", d);
    deleteSpan.appendChild(document.createTextNode("\u00d7"));
    li.appendChild(deleteSpan);
    domainList.appendChild(li);
  });
}

saveButton.addEventListener("click", onSaveClick);
domainInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 /*Enter key*/) {
    e.preventDefault();
    saveButton.click();
  }
});
domainList.addEventListener("click", onListClick);

async function init() {
  const domains = await loadDomains();
  renderDomainList(domains);
}

init().catch((e) => console.error(e));
