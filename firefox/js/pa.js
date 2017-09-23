/**
 * Created by lancelrq on 2017/9/22.
 */

document.getElementById("submit_button").addEventListener('click', function () {
    // browser.runtime.sendMessage({'action': 'open'});
    var createData = {
        type: "detached_panel",
        url: "popup.html",
        width: 480,
        height: 360
    };
    var creating = browser.windows.create(createData);
});