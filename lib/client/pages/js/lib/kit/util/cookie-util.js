/**
 * Created by sina on 2016/5/20.
 */
'use strict';

var reg = /[^\n\s*\r;]+=[^;]*/g;
var cookieUtil = {
    setCookie: function setCookie(opt) {
        var key = opt.key,
            value = opt.value,
            expires = opt.expires,
            date,
            expiresDate,
            cookie;
        if (key === undefined) {
            throw new Error('opt.key is undefined');
        }
        cookie = [encodeURIComponent(key), '=', encodeURIComponent(value)];
        if (expires) {
            if (!(isFinite(expires) && Object.prototype.toString.call(expires) === '[object Number]')) {
                throw new Error('expires is not an finite number');
            }
            date = new Date();
            expiresDate = new Date(date.getTime() + expires).toGMTString();
            cookie = cookie.concat([';expires=', expiresDate]);
        }

        if (opt.domain) {
            cookie = cookie.concat([';domain=', opt.domain]);
        }
        if (opt.path) {
            cookie = cookie.concat([';path=', opt.path]);
        }
        document.cookie = cookie.join('');
    },
    getCookie: function getCookie(key) {
        var cookies = document.cookie;
        var results = cookies.match(reg);
        var value = '';
        if (results && results.length > 0) {
            results.forEach(function (_entry) {
                var contentList = _entry.split('=');

                if (contentList[0].replace(/(^\s*)|(\s*$)/g, '') == encodeURIComponent(key)) {

                    value = contentList[1];
                }
            });
        }
        return decodeURIComponent(value);
    },
    /**
     * 删除cookie操作
     * @param opt
     */
    delCookie: function delCookie(opt) {
        document.cookie = encodeURIComponent(opt.key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (opt.domain ? "; domain=" + opt.domain : "") + (opt.path ? "; path=" + opt.path : "");
    }
};

module.exports = {
    /**
     * 设置cookie
     * @params opt
     * opt = {
     *  key     //key值  可以为空
     *  value   // value值 可以为空
     *  expires //超时时间，选填（单位毫秒）
     *  domain // 域名，选填
     *  path   //存放路径，选填
     * }
     */
    setCookie: function setCookie(opt) {
        cookieUtil.setCookie(opt);
    },
    /**
     * 根据key值获取cookie对应的值，没有返回''空字符串
     * @param key
     * @returns {*}
     */
    getCookie: function getCookie(key) {
        return cookieUtil.getCookie(key);
    },
    /**
     * 删除cookie
     * @param opt
     * {
     *  key 必填，可以为空字符串
     *  domain 选填
     *  path 选填
     * }
     */
    delCookie: function delCookie(opt) {
        cookieUtil.delCookie(opt);
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(reg, 'reg', 'src/client/pages/js/lib/kit/util/cookie-util.js');

    __REACT_HOT_LOADER__.register(cookieUtil, 'cookieUtil', 'src/client/pages/js/lib/kit/util/cookie-util.js');
}();

;