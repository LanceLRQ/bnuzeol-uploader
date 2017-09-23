/**
 * Created by lancelrq on 2017/9/21.
 */

var lastTabId = 0;

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status !== "complete") return;
    lastTabId = tabId;
    var url = tab.url || changeInfo.url;
    if(url && url.indexOf('http://eol.bnuz.edu.cn/') > -1){
        browser.pageAction.show(lastTabId);

    }else{
        browser.pageAction.hide(lastTabId);
    }
});
// browser.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
//     browser.tabs.get(tabId, function (tab) {
//         lastTabId = tabId;
//         if(tab.url && tab.url.indexOf('http://eol.bnuz.edu.cn/') > -1){
//             browser.pageAction.show(lastTabId);
//         }else{
//             browser.pageAction.hide(lastTabId);
//         }
//     });
// });
//
// browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log(msg);
//     if(message.action === "open") {
//
//     }
//     sendResponse({response: "OK"});
// });