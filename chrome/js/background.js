/**
 * Created by lancelrq on 2017/9/21.
 */

var lastTabId = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status !== "complete") return;
    lastTabId = tabId;
    if(tab.url && tab.url.indexOf('http://eol.bnuz.edu.cn/') > -1){
        chrome.pageAction.show(lastTabId);
    }else{
        chrome.pageAction.hide(lastTabId);
    }
});
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    chrome.tabs.get(tabId, function (tab) {
        lastTabId = tabId;
        if(tab.url && tab.url.indexOf('http://eol.bnuz.edu.cn/') > -1){
            chrome.pageAction.show(lastTabId);
        }else{
            chrome.pageAction.hide(lastTabId);
        }
    });
});