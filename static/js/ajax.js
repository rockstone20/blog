function param(data) {
  var url = '';
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : '';
    url += (url.indexOf('?') < 0 ? '?' : '&') + k + '=' + encodeURIComponent(value);
  }
  return url
}

function $ajax(method, url, data, callback) {
  if(!callback) {
    callback = data;
    data = null;
  }

  var xhr = new XMLHttpRequest();
  if(method=='get') { //get请求
    if(data) {
      url = param(data);
    }
    xhr.open(method, url);
    xhr.send();
  }else { // post请求
    xhr.open(method, url);
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if(data) {
      var from = document.createElement('form');
      var fromData = new FormData(from);

      for (var key in data) {
        fromData.append(key, data[key]);
      }
      xhr.send(fromData);
    }else {
      xhr.send();
    }
  }

  xhr.onreadystatechange = function () {
    if(xhr.readyState==4 && xhr.status==200){
      var result = JSON.parse(xhr.responseText);
      callback(result);
    }
  }
}

