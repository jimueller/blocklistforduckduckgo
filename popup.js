const domainInput = document.querySelector('#domain');
const saveButton = document.querySelector('#save');
const domainList = document.querySelector('#blocked-domains');

async function storeSettings(domainsValue) {
    const blockedDomains = domainsValue.split("\n") || [];

    console.log(blockedDomains);
    await browser.storage.local.set({
        blockedDomains
    });
}

async function loadDomains() {
    let domains = [];
    const results =  await browser.storage.local.get('blockedDomains');
    if(results && results.blockedDomains){
        domains = JSON.parse(results.blockedDomains);
    }
    console.log("returning domains:", domains);
    return domains;
}

async function storeDomains(domains) {
    const blockedDomains = JSON.stringify(domains);
    await browser.storage.local.set({
        blockedDomains
    });
}

async function saveDomain(domain) {
    const domains = await loadDomains();
    domains.push(domain);
    await storeDomains(domains);
}

async function onSaveClick(){
    let domainText = domainInput.value;
    await saveDomain(domainText);
    const domains = await loadDomains();
    renderDomainList(domains);
    domainInput.value = "";
}

function renderDomainList(domains){
    console.log("Rendering domains", domains);
    console.log("domainsList", domainList);
    domainList.innerHTML = "";
    console.log('after blanking domains list');
    
    domains.map(d => {
        console.log('inserting domain');
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(d));
        li.setAttribute("class", "list-domain");
        const deleteSpan = document.createElement("span");
        deleteSpan.setAttribute("class", "delete-domain");
        deleteSpan.setAttribute("data-domain",d);
        deleteSpan.appendChild(document.createTextNode("\u00d7"));
        li.appendChild(deleteSpan);
        domainList.appendChild(li);
    });
}

saveButton.addEventListener('click', onSaveClick);

async function init() {
    const domains = await loadDomains();
    console.log('init domains', domains);
    renderDomainList(domains);
}

init().catch(e => console.error(e));