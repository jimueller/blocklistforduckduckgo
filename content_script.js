// Put all the javascript code here, that you want to execute after page load.


browser.storage.onChanged.addListener((changes, area) => {
    if(area === 'local' && 'blockedDomains' in changes){
        removeResults(changes.blockedDomains.newValue);
    }
});

function removeResults(blockedDomains){
    console.log("removing", blockedDomains);
}