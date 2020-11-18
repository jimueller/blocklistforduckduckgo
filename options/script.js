const blockedDomainsTextArea = document.querySelector('#blocked-domains');

function storeSettings() {
    const blockedDomains = blockedDomainsTextArea.value.split("\n");
    console.log(blockedDomains);
    browser.storage.local.set({
        blockedDomains
    });
}

function loadSettings(loadedSettings) {
    blockedDomainsTextArea.value = loadSettings.join("\n");
}

function onError(e){
    console.error(e);
}

browser.storage.local.get().then(loadSettings, onError);

console.log('heelllo');

blockedDomainsTextArea.addEventListener("change", storeSettings);