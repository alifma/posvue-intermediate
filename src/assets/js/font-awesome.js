window.FontAwesomeKitConfig = { asyncLoading: { enabled: false }, autoA11y: { enabled: true }, baseUrl: 'https://ka-f.fontawesome.com', baseUrlKit: 'https://kit.fontawesome.com', detectConflictsUntil: null, iconUploads: {}, id: 49428554, license: 'free', method: 'css', minify: { enabled: true }, token: 'd421ddb4c6', v4FontFaceShim: { enabled: true }, v4shim: { enabled: true }, version: '5.15.1' }
!(function (t) { typeof define === 'function' && define.amd ? define('kit-loader', t) : t() }(function () { 'use strict'; function t (e) { return (t = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) { return typeof t } : function (t) { return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t })(e) } function e (t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t } function n (t, e) { var n = Object.keys(t); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(t); e && (o = o.filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, o) } return n } function o (t) { for (var o = 1; o < arguments.length; o++) { var r = arguments[o] != null ? arguments[o] : {}; o % 2 ? n(Object(r), !0).forEach(function (n) { e(t, n, r[n]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e)) }) } return t } function r (t, e) { return (function (t) { if (Array.isArray(t)) return t }(t)) || (function (t, e) { if (!(Symbol.iterator in Object(t) || Object.prototype.toString.call(t) === '[object Arguments]')) return; var n = []; var o = !0; var r = !1; var i = void 0; try { for (var c, a = t[Symbol.iterator](); !(o = (c = a.next()).done) && (n.push(c.value), !e || n.length !== e); o = !0); } catch (t) { r = !0, i = t } finally { try { o || a.return == null || a.return() } finally { if (r) throw i } } return n }(t, e)) || (function () { throw new TypeError('Invalid attempt to destructure non-iterable instance') }()) } function i (t, e) { var n = e && e.addOn || ''; var o = e && e.baseFilename || t.license + n; var r = e && e.minify ? '.min' : ''; var i = e && e.fileSuffix || t.method; var c = e && e.subdir || t.method; return t.baseUrl + '/releases/' + (t.version === 'latest' ? 'latest' : 'v'.concat(t.version)) + '/' + c + '/' + o + r + '.' + i } function c (t) { return t.baseUrlKit + '/' + t.token + '/' + t.id + '/kit-upload.css' } function a (t, e) { var n = e || ['fa']; var o = '.' + Array.prototype.join.call(n, ',.'); var r = t.querySelectorAll(o); Array.prototype.forEach.call(r, function (e) { var n = e.getAttribute('title'); e.setAttribute('aria-hidden', 'true'); var o = !e.nextElementSibling || !e.nextElementSibling.classList.contains('sr-only'); if (n && o) { var r = t.createElement('span'); r.innerHTML = n, r.classList.add('sr-only'), e.parentNode.insertBefore(r, e.nextSibling) } }) } var u; var f = function () {}; var s = typeof global !== 'undefined' && void 0 !== global.process && typeof global.process.emit === 'function'; var d = typeof setImmediate === 'undefined' ? setTimeout : setImmediate; var l = []; function h () { for (var t = 0; t < l.length; t++)l[t][0](l[t][1]); l = [], u = !1 } function m (t, e) { l.push([t, e]), u || (u = !0, d(h, 0)) } function p (t) { var e = t.owner; var n = e._state; var o = e._data; var r = t[n]; var i = t.then; if (typeof r === 'function') { n = 'fulfilled'; try { o = r(o) } catch (t) { g(i, t) } }v(i, o) || (n === 'fulfilled' && y(i, o), n === 'rejected' && g(i, o)) } function v (e, n) { var o; try { if (e === n) throw new TypeError('A promises callback cannot return that same promise.'); if (n && (typeof n === 'function' || t(n) === 'object')) { var r = n.then; if (typeof r === 'function') return r.call(n, function (t) { o || (o = !0, n === t ? b(e, t) : y(e, t)) }, function (t) { o || (o = !0, g(e, t)) }), !0 } } catch (t) { return o || g(e, t), !0 } return !1 } function y (t, e) { t !== e && v(t, e) || b(t, e) } function b (t, e) { t._state === 'pending' && (t._state = 'settled', t._data = e, m(A, t)) } function g (t, e) { t._state === 'pending' && (t._state = 'settled', t._data = e, m(O, t)) } function w (t) { t._then = t._then.forEach(p) } function A (t) { t._state = 'fulfilled', w(t) } function O (t) { t._state = 'rejected', w(t), !t._handled && s && global.process.emit('unhandledRejection', t._data, t) } function j (t) { global.process.emit('rejectionHandled', t) } function S (t) { if (typeof t !== 'function') throw new TypeError('Promise resolver ' + t + ' is not a function'); if (this instanceof S == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."); this._then = [], (function (t, e) { function n (t) { g(e, t) } try { t(function (t) { y(e, t) }, n) } catch (t) { n(t) } }(t, this)) }S.prototype = { constructor: S, _state: 'pending', _then: null, _data: void 0, _handled: !1, then: function (t, e) { var n = { owner: this, then: new this.constructor(f), fulfilled: t, rejected: e }; return !e && !t || this._handled || (this._handled = !0, this._state === 'rejected' && s && m(j, this)), this._state === 'fulfilled' || this._state === 'rejected' ? m(p, n) : this._then.push(n), n.then }, catch: function (t) { return this.then(null, t) } }, S.all = function (t) { if (!Array.isArray(t)) throw new TypeError('You must pass an array to Promise.all().'); return new S(function (e, n) { var o = []; var r = 0; function i (t) { return r++, function (n) { o[t] = n, --r || e(o) } } for (var c, a = 0; a < t.length; a++)(c = t[a]) && typeof c.then === 'function' ? c.then(i(a), n) : o[a] = c; r || e(o) }) }, S.race = function (t) { if (!Array.isArray(t)) throw new TypeError('You must pass an array to Promise.race().'); return new S(function (e, n) { for (var o, r = 0; r < t.length; r++)(o = t[r]) && typeof o.then === 'function' ? o.then(e, n) : e(o) }) }, S.resolve = function (e) { return e && t(e) === 'object' && e.constructor === S ? e : new S(function (t) { t(e) }) }, S.reject = function (t) { return new S(function (e, n) { n(t) }) }; var E = typeof Promise === 'function' ? Promise : S; function _ (t, n) { var o = n.fetch; var r = n.XMLHttpRequest; var i = n.token; return new E(function (n, c) { if (typeof o === 'function')o(t, { mode: 'cors', cache: 'default', headers: new Headers(e({}, 'fa-kit-token', i)) }).then(function (t) { if (t.ok) return t.text(); throw new Error('') }).then(function (t) { n(t) }).catch(c); else if (typeof r === 'function') { var a = new r(); a.addEventListener('loadend', function () { this.responseText ? n(this.responseText) : c(new Error('')) }); ['abort', 'error', 'timeout'].map(function (t) { a.addEventListener(t, function () { c(new Error('')) }) }), a.open('GET', t), a.setRequestHeader('fa-kit-token', i), a.send() } else { c(new Error('')) } }) } function F (t, e, n) { var o = t; return [[/(url\("?)\.\.\/\.\.\/\.\./g, function (t, n) { return ''.concat(n).concat(e) }], [/(url\("?)\.\.\/webfonts/g, function (t, o) { return ''.concat(o).concat(e, '/releases/v').concat(n, '/webfonts') }], [/(url\("?)https:\/\/kit-free([^.])*\.fontawesome\.com/g, function (t, n) { return ''.concat(n).concat(e) }]].forEach(function (t) { var e = r(t, 2); var n = e[0]; var i = e[1]; o = o.replace(n, i) }), o } function P (t, e) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {}; var r = e.document || r; var u = a.bind(a, r, ['fa', 'fab', 'fas', 'far', 'fal', 'fad', 'fak']); var f = Object.keys(t.iconUploads || {}).length > 0; t.autoA11y.enabled && n(u); var s = [{ id: 'fa-main', addOn: void 0 }]; t.v4shim.enabled && s.push({ id: 'fa-v4-shims', addOn: '-v4-shims' }), t.v4FontFaceShim.enabled && s.push({ id: 'fa-v4-font-face', addOn: '-v4-font-face' }), f && s.push({ id: 'fa-kit-upload', customCss: !0 }); var d = s.map(function (n) { return new E(function (r, a) { _(n.customCss ? c(t) : i(t, { addOn: n.addOn, minify: t.minify.enabled }), e).then(function (i) { r(k(i, o({}, e, { baseUrl: t.baseUrl, version: t.version, id: n.id, contentFilter: function (t, e) { return F(t, e.baseUrl, e.version) } }))) }).catch(a) }) }); return E.all(d) } function k (t, e) { var n = e.contentFilter || function (t, e) { return t }; var o = document.createElement('style'); var r = document.createTextNode(n(t, e)); return o.appendChild(r), o.media = 'all', e.id && o.setAttribute('id', e.id), e && e.detectingConflicts && e.detectionIgnoreAttr && o.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), o } function C (t, e) { e.autoA11y = t.autoA11y.enabled, t.license === 'pro' && (e.autoFetchSvg = !0, e.fetchSvgFrom = t.baseUrl + '/releases/' + (t.version === 'latest' ? 'latest' : 'v'.concat(t.version)) + '/svgs', e.fetchUploadedSvgFrom = t.uploadsUrl); var n = []; return t.v4shim.enabled && n.push(new E(function (n, r) { _(i(t, { addOn: '-v4-shims', minify: t.minify.enabled }), e).then(function (t) { n(T(t, o({}, e, { id: 'fa-v4-shims' }))) }).catch(r) })), n.push(new E(function (n, r) { _(i(t, { minify: t.minify.enabled }), e).then(function (t) { var r = T(t, o({}, e, { id: 'fa-main' })); n(function (t, e) { var n = e && void 0 !== e.autoFetchSvg ? e.autoFetchSvg : void 0; var o = e && void 0 !== e.autoA11y ? e.autoA11y : void 0; void 0 !== o && t.setAttribute('data-auto-a11y', o ? 'true' : 'false'); n && (t.setAttributeNode(document.createAttribute('data-auto-fetch-svg')), t.setAttribute('data-fetch-svg-from', e.fetchSvgFrom), t.setAttribute('data-fetch-uploaded-svg-from', e.fetchUploadedSvgFrom)); return t }(r, e)) }).catch(r) })), E.all(n) } function T (t, e) { var n = document.createElement('SCRIPT'); var o = document.createTextNode(t); return n.appendChild(o), n.referrerPolicy = 'strict-origin', e.id && n.setAttribute('id', e.id), e && e.detectingConflicts && e.detectionIgnoreAttr && n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), n } function L (t) { var e; var n = []; var o = document; var r = o.documentElement.doScroll; var i = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(o.readyState); i || o.addEventListener('DOMContentLoaded', e = function () { for (o.removeEventListener('DOMContentLoaded', e), i = 1; e = n.shift();)e() }), i ? setTimeout(t, 0) : n.push(t) } function x (t) { typeof MutationObserver !== 'undefined' && new MutationObserver(t).observe(document, { childList: !0, subtree: !0 }) } try { if (window.FontAwesomeKitConfig) { var I = window.FontAwesomeKitConfig; var U = { detectingConflicts: I.detectConflictsUntil && new Date() <= new Date(I.detectConflictsUntil), detectionIgnoreAttr: 'data-fa-detection-ignore', fetch: window.fetch, token: I.token, XMLHttpRequest: window.XMLHttpRequest, document: document }; var D = document.currentScript; var M = D ? D.parentElement : document.head; (function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return t.method === 'js' ? C(t, e) : t.method === 'css' ? P(t, e, function (t) { L(t), x(t) }) : void 0 })(I, U).then(function (t) { t.map(function (t) { try { M.insertBefore(t, D ? D.nextSibling : null) } catch (e) { M.appendChild(t) } }), U.detectingConflicts && D && L(function () { D.setAttributeNode(document.createAttribute(U.detectionIgnoreAttr)); var t = (function (t, e) { var n = document.createElement('script'); return e && e.detectionIgnoreAttr && n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), n.src = i(t, { baseFilename: 'conflict-detection', fileSuffix: 'js', subdir: 'js', minify: t.minify.enabled }), n }(I, U)); document.body.appendChild(t) }) }).catch(function (t) { console.error(''.concat('Font Awesome Kit:', ' ').concat(t)) }) } } catch (t) { console.error(''.concat('Font Awesome Kit:', ' ').concat(t)) } }))