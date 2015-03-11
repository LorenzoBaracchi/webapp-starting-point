function AjaxClient(address, headers) {
    this._address = address;
    this._headers = headers || {};
    this._headers['Accept'] = 'application/json';
    this._headers['Content-Type'] = 'application/json';
    this._calls = [];
};
AjaxClient.prototype = {
    abort: function () {
        for (var i = 0; i < this._calls.length; ++i) {
            if (this._calls[i].readystate !== 4) {
                this._calls[i].abort();
            }
        };
        this._calls = [];
    },
    __performCall: function (callOpts) {
        var def = $.ajax(callOpts),
            self = this;
        this._calls.push(def);
        return def.always(function (result) {
            self._calls.remove(def);
            return result;
        });
    },
    __callMethod: function (methodName, parameters, type) {
        var method = null,
            address = this._address,
            self = this;
        if (address[address.length - 1] == '/') {
            method = address + methodName;
        } else {
            method = address + '/' + methodName;
        }
        return this.__performCall({
            url: method,
            type: type,
            dataType: 'json',
            contentType: 'application/json',
            headers: self._headers,
            data: parameters
        });
    },
    _callODataQuery: function (methodName, query) {
        var method = null,
            address = this._address,
            self = this;
        if (address[address.length - 1] == '/') { method = address + methodName; }
        else { method = address + '/' + methodName; }

        if (query) { method = method + '?' + query; }
        return this.__performCall({ url: method, dataType: "json", headers: self._headers });
    },

    _callGetMethod: function (methodName, parameters) {
        return this.__callMethod(methodName, parameters, 'GET');
    },
    _callPostMethod: function (methodName, parameters) {
        return this.__callMethod(methodName, parameters, 'POST');
    }
};

function UserClient(address, headers) {
    this.registerUser = function (course, name, surname, email) {
        return {
            done: function (callback) {
                callback(true);
            },
            fail: function (callback) {
                callback("error");
            }
        }
    }
}
