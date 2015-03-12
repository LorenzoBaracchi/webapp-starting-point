/* JavaScript Extensions */
(function () {
    /* Array Extension */
    (function (array) {
        // Add ECMA262-5 Array methods if not supported natively
        //
        if (!('indexOf' in array.prototype)) {
            array.prototype.indexOf = function (find, i /*opt*/) {
                if (i === undefined) i = 0;
                if (i < 0) i += this.length;
                if (i < 0) i = 0;
                for (var n = this.length; i < n; i++)
                    if (i in this && this[i] === find)
                        return i;
                return -1;
            };
        }
        if (!('lastIndexOf' in array.prototype)) {
            array.prototype.lastIndexOf = function (find, i /*opt*/) {
                if (i === undefined) i = this.length - 1;
                if (i < 0) i += this.length;
                if (i > this.length - 1) i = this.length - 1;
                for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
                    if (i in this && this[i] === find)
                        return i;
                return -1;
            };
        }
        if (!('forEach' in array.prototype)) {
            array.prototype.forEach = function (action, that /*opt*/) {
                for (var i = 0, n = this.length; i < n; i++)
                    if (i in this)
                        action.call(that, this[i], i, this);
            };
        }
        if (!('map' in array.prototype)) {
            array.prototype.map = function (mapper, that /*opt*/) {
                var other = new Array(this.length);
                for (var i = 0, n = this.length; i < n; i++)
                    if (i in this)
                        other[i] = mapper.call(that, this[i], i, this);
                return other;
            };
        }
        if (!('filter' in array.prototype)) {
            array.prototype.filter = function (filter, that /*opt*/) {
                var other = [], v;
                for (var i = 0, n = this.length; i < n; i++)
                    if (i in this && filter.call(that, v = this[i], i, this))
                        other.push(v);
                return other;
            };
        }
        if (!('every' in array.prototype)) {
            array.prototype.every = function (tester, that /*opt*/) {
                for (var i = 0, n = this.length; i < n; i++)
                    if (i in this && !tester.call(that, this[i], i, this))
                        return false;
                return true;
            };
        }
        if (!('some' in array.prototype)) {
            array.prototype.some = function (tester, that /*opt*/) {
                for (var i = 0, n = this.length; i < n; i++)
                    if (i in this && tester.call(that, this[i], i, this))
                        return true;
                return false;
            };
        }

        array.prototype.shuffle = function () {
            var currentIndex = this.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this[currentIndex];
                this[currentIndex] = this[randomIndex];
                this[randomIndex] = temporaryValue;
            }

            return this;
        }
        array.prototype.contains = function (element) {
            return this.indexOf(element) > 0;
        };
        array.prototype.searchFirst = function (tester, that /*opt*/) {
            var res = this.filter(tester, that);
            if (res) {
                return res.first();
            }else{
                return null;
            }
        };
        /**
        * Remove an element from the array.
        * @function
        * @param {Object} element : Element to remove from the array.
        * @returns {Array} The array modified. Used for chain.
        * @memberof Array.prototype
        */
        array.prototype.remove = function (element) {
            this.removeAt(this.indexOf(element));
            return this;
        };
        array.prototype.removeAt = function (index) {
            if (index !== -1) {
                this.splice(index, 1);
            }
            return this;
        };
        /**
        * Gets the first element of the array
        * @method first
        * @returns {Object} The first element of the array.
        * @memberof Array.prototype
        */
        array.prototype.first = function () {
            if (this.length > 0)
                return this[0];
            else
                return null;
        };
        /**
        * Gets the last element of the array
        * @method last
        * @returns {Object} The last element of the array.
        * @memberof Array.prototype
        */
        array.prototype.last = function () {
            if (this.length > 0)
                return this[this.length - 1];
            else
                return null;
        };
        /**
        * Remove all elements of the array.
        * @method clear
        * @return {Array} The modified array. Used for chaining.
        * @memberof Array.prototype
        */
        array.prototype.clear = function () {
            while (this.length > 0)
                this.pop();
            return this;
        };
    })(Array);

    /* String Extension */
    (function (_string) {
        if (typeof _string.prototype.startsWith != 'function') {
            // see below for better implementation!
            _string.prototype.startsWith = function (str) {
                return this.slice(0, str.length) == str;
            };
            _string.prototype.capitalizeFirstLetter = function () {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }
        }
    })(String);

    /* Date */
    (function (date) {
        /*
        * Date Format 1.2.3
        * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
        * MIT license
        *
        * Includes enhancements by Scott Trenda <scott.trenda.net>
        * and Kris Kowal <cixar.com/~kris.kowal/>
        *
        * Accepts a date, a mask, or a date and a mask.
        * Returns a formatted version of the given date.
        * The date defaults to the current date/time.
        * The mask defaults to dateFormat.masks.default.
        */

        var dateFormat = function () {
            var token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };

            // Regexes and supporting functions are cached through closure
            return function (date, mask, utc) {
                var dF = dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies Date.parse, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date)) throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    M = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    m = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        M: M + 1,
                        MM: pad(M + 1),
                        MMM: dF.i18n.monthNames[M],
                        MMMM: dF.i18n.monthNames[M + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        m: m,
                        mm: pad(m),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
            };
        }();

        // Some common format strings
        dateFormat.masks = {
            "default": "ddd MMM dd yyyy HH:mm:ss",
            shortDate: "M/d/yy",
            mediumDate: "MMM d, yyyy",
            longDate: "MMM d, yyyy",
            fullDate: "dddd, MMMM d, yyyy",
            shortTime: "h:mm TT",
            mediumTime: "h:mm:ss TT",
            longTime: "h:mm:ss TT Z",
            isoDate: "yyyy-MM-dd",
            isoTime: "HH:mm:ss",
            isoDateTime: "yyyy-MM-dd'T'HH:mm:ss",
            isoUtcDateTime: "UTC:yyyy-MM-dd'T'HH:mm:ss'Z'"
        };

        // Internationalization strings
        dateFormat.i18n = {
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        };

        /*
         * Usage:
         * var now = new Date(); 
         * now.format("m/dd/yy");
         * // Returns, e.g., 6/09/07
         * 
         * // ...Or add your own
         * dateFormat.masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
         * now.format("hammerTime");
         * // 17:46! Can't touch this!
         */
        Date.prototype.format = function (mask, utc) {
            return dateFormat(this, mask, utc);
        };
    })(Date);

})();

/* Check Types */
var Utils = (function (module, window) {
    module.isArray = function (target) {
        return Object.prototype.toString.call(target) === '[object Array]';
    };
    module.isString = function (target) {
        return typeof target === 'string';
    };
    return module;
})(Utils || {}, this);

/* Guid */
var Utils = (function (module, window) {
    module.createGuid = function () {
        var _p8 = function (s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        };
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    return module;
})(Utils || {}, this);
