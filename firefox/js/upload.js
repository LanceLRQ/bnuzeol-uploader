/**
 * Created by lancelrq on 2017/9/21.
 */

var xhr_uploading = false;
var xhr = null;
var fileArea = document.getElementById("file_area");
var msgArea = document.getElementById("message");
var errmsgArea = document.getElementById("errmessage");
var processBar = document.getElementById("processbar");
var process = document.getElementById("process");
var submitBtn = document.getElementById("submit_button");
var cancelBtn = document.getElementById("cancel_button");
var doc = document.getElementById("result_p");

function selectText(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

function doUpload(option) {
    if(xhr_uploading) return;
    xhr_uploading = true;
    submitBtn.style.display = "none";
    cancelBtn.style.display = "block";
    processBar.style.display = "block";
    errmsgArea.style.display = "none";
    fileArea.style.display = "none";
    xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            option.progress(percentComplete, evt.loaded, evt.total);
        }
        else {
            option.progress(0, 0, 0);
        }
        xhr_uploading = false;
    }, false);
    xhr.addEventListener("load", function (evt) {
        option.success(evt.target.responseText);
        xhr_uploading = false;
    }, false);
    xhr.addEventListener("error", function (err) {
        option.error(err);
        xhr_uploading = false;
    }, false);
    xhr.addEventListener("abort", function () {
        option.abort();
        xhr_uploading = false;
    }, false);
    xhr.open("POST", option.url);
    xhr.send(option.formdata);
}

cancelBtn.addEventListener("click", function () {
    if(xhr_uploading) return;
    xhr.abort();
});

submitBtn.addEventListener("click", function () {
    if(fileArea.files.length < 1) {
        errmsgArea.style.display = "block";
        errmsgArea.innerText = "请选择要上传的文件！";
        return;
    }
    var file = fileArea.files[0];
    var filename = file.name;
    var formdata = new FormData();

    formdata.append("Filename", filename);
    formdata.append("folder", "/uploads");
    formdata.append("fileext", "*.*");
    formdata.append("Filedata", file);
    formdata.append("Upload", "Submit Query");
    var options = {
        url: "http://eol.bnuz.edu.cn/meol/servlet/SerUpload",
        formdata: formdata,
        success: function (msg) {
            cancelBtn.style.display = "none";
            msgArea.style.display = "block";
            processBar.style.display = "none";
            var abq = document.createElement('a');
            abq.href='http://eol.bnuz.edu.cn/meol/'+msg;
            abq.innerText = filename;
            doc.appendChild(abq)
            // doc.innerHTML =  "<a href=''>"+filename+"</a>";
            selectText('result_p');
            console.log("Success: "+msg);
        },
        error: function () {
            submitBtn.style.display = "block";
            cancelBtn.style.display = "none";
            msgArea.style.display = "none";
            processBar.style.display = "none";
            errmsgArea.style.display = "block";
            fileArea.style.display = "block";
            errmsgArea.innerText = "网络错误：" + err
        },
        abort: function () {
            submitBtn.style.display = "block";
            cancelBtn.style.display = "none";
            msgArea.style.display = "none";
            processBar.style.display = "none";
            errmsgArea.style.display = "block";
            fileArea.style.display = "block";
            errmsgArea.innerText = "上传被用户中断";
        },
        progress: function (perc) {
            process.style.width = perc + "%";
            process.innerText = perc + "%";
        }
    };
    doUpload(options);
});
window.onpagehide = function () {
    if(xhr_uploading)
        xhr.abort();
};
window.onunload = function () {
    if(xhr_uploading)
        xhr.abort();
};