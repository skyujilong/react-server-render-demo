'use strict';

var ua = navigator.userAgent.toLowerCase();
var platform = navigator.platform.toLowerCase();
var version, m;

var numberify = function numberify(s) {
	var c = 0;
	try {
		var arr = s.split(/[_\.]/);
		var main = arr.shift();
		c = parseFloat(main + '.' + arr.join(''), 10);
	} catch (e) {}
	return c;
};

try {
	if ((m = ua.match(/\((ipad|iphone|ipod|itouch).*os\s([\d_\.]+)/)) && m[2]) {
		version = numberify(m[2]);
	} else if ((m = ua.match(/android[^\d]+([\d_\.]+)/)) && m[1]) {
		version = numberify(m[1]);
	} else if ((m = ua.match(/macintosh[^\d]+([\d_\.]+)/)) && m[1]) {
		version = numberify(m[1]);
	} else if ((m = ua.match(/(windows|win32)[^\d]+([\d_\.]+)/)) && m[2]) {
		version = numberify(m[2]);
	} else if ((m = ua.match(/rhino[^\d]+([\d_\.]+)/)) && m[1]) {
		version = numberify(m[1]);
	}
} catch (e) {
	throw e;
}

var os = {
	'version': version,
	'windows': /windows|win32/.test(ua),
	'macintosh': /macintosh/.test(ua),
	'rhino': /rhino/.test(ua)
};

os.android = /android/.test(ua) || /xiaomi/.test(ua);

//MIUI5.0使用的浏览器UA是IOS3.0的，且未添加xiaomi标记。
if (!/(ipad|iphone|ipod|itouch)/.test(platform) && version <= 4) {
	os.android = true;
}

os.ios = /(ipad|iphone|ipod|itouch)/.test(ua) && !os.android;

module.exports = os;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(ua, 'ua', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');

	__REACT_HOT_LOADER__.register(platform, 'platform', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');

	__REACT_HOT_LOADER__.register(version, 'version', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');

	__REACT_HOT_LOADER__.register(m, 'm', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');

	__REACT_HOT_LOADER__.register(numberify, 'numberify', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');

	__REACT_HOT_LOADER__.register(os, 'os', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/lib/kit/util/os.js');
}();

;