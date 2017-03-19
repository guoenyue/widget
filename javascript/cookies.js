/**
 * JS操作获取和设置cookie
 * Date: 2017/03/19
 * Reference: 网络
 * -----------------------------------------------------
 * 创建cookie
 * setCookie(name, value, expires, path, domain, secure)
 * @param{name}
 * @param{value}
 * @param{expires}
 * @param{path}
 * @param{domain}
 * @param{secure}
 * -----------------------------------------------------
 * 获取cookie
 * getCookie(name)
 * @param{name}
 * -----------------------------------------------------
 * 删除指定cookie
 * unSetCookie(name)
 * @param{name}
 **/
 // 创建cookie
function setCookie(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '='+encodeURIComponent(value);
    if(expires instanceof Date) {
        cookieText += '; expires=' + expires;
    }
    if(path) {
        cookieText += '; path=' + path;
    }
    if(domain) {
        cookieText += '; domain=' + domain;
    }
    if(secure) {
        cookieText += '; secure=' + secure;
    }
    document.cookie = cookieText;
}

// 获取cookie
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if(cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if(cookieEnd > -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}

// 删除cookie
function unSetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}
