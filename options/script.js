const blockedDomainsTextArea = document.querySelector('#blocked-domains');

async function storeSettings(domainsValue) {
    const blockedDomains = domainsValue.split("\n") || [];

    console.log(blockedDomains);
    await browser.storage.local.set({
        blockedDomains
    });
}

async function loadSettings() {
    let {blockedDomains} = browser.local.storage.get('blockedDomains');
    if(!blockedDomains){
        blockedDomains = [];
    }
    const domains = blockedDomains.join("\n");
    blockedDomainsTextArea.value = domains;
    storeSettings(domains)
}

function onError(e){
    console.error(e);
}

console.log('heelllo');

blockedDomainsTextArea.addEventListener('change', e => storeSettings(e.target.value));

loadSettings().catch(onError);