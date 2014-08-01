if (!this.DOMTokenList) {
    (function(DOMTokenList, prototype) {
        this.DOMTokenList = DOMTokenList;
        for (var property in prototype) {
            DOMTokenList.prototype[property] = prototype[property];
        }
    })(
        function ES5DOMTokenlist(element, attributeName) {
            this._attributes = element.attributes;
            this._attributeName = attributeName;
        }, {
            length: 0,
            contains: function(value) {
                return this._getTokens().indexOf(value) != -1;
            },
            item: function(index) {
                return this._getTokens()[index] || null;
            },
            add: function(value) {
                this._validateToken(value, "add");
                var tokens = this._getTokens();
                if (tokens.indexOf(value) == -1) {
                    tokens.push(value);
                }
                this._sync(tokens);
            },
            remove: function(value) {
                this._validateToken(value, "add");
                var tokens = this._getTokens(),
                    index = tokens.indexOf(value);
                if (index != -1) {
                    tokens = tokens.splice(index + 1, 1);
                }
                this._sync(tokens);
            },
            toggle: function(value) { //DONT USE FORCE USE ADD AND REMOVE!
                this._validateToken(value, "toggle");
                if (this.contains(value)) {
                    this.remove(value);
                    return false;
                } else {
                    this.add(value);
                    return true;
                }
            },
            toString: function() {
                return this._attributes[this._attributeName].value || "";
            },
            _validateToken: function(token, method) {
                if (token === "") {
                    throw new SyntaxError("Failed to execute '" + method + "' on 'DOMTokenList': The token provided must not be empty.");
                }
                if (/\s/m.test(token)) {
                    throw new InvalidCharacterError("Failed to execute '" + method + "' on 'DOMTokenList': The token provided ('" + token + "') contains HTML space characters, which are not valid in tokens.")
                }
            },
            _setAttribute: function(value) {
                this._attributes[this._attributeName].value = value;
            },
            _getTokens: function() {
                var att = this.toString();
                if (att === null || att === "") {
                    return [];
                }
                return att.split(/\s/gm);
            },
            _sync: function(tokens) {
                for (var i = 0; i != Math.max(this.length, tokens.length); i++) {
                    if (!tokens[i]) {
                        delete this[i];
                    } else {
                        this[i] = tokens[i];
                    }
                }
                this._setAttribute(tokens.join(" "));
                this.length = tokens.length;
            }
        });

    (function(htmlElement, classList, linkElement, areaElement, anchorElement, relList) {
        htmlElement.__defineGetter__("classList", classList);
        linkElement.__defineGetter__("relList", relList);
        areaElement.__defineGetter__("relList", relList);
        anchorElement.__defineGetter__("relList", relList);
    })(
        HTMLElement.prototype,
        function() {
            if (!this._classList) {
                this._classList = new DOMTokenList(this, "class");
            }
            return this._classList;
        },
        HTMLLinkElement.prototype,
        HTMLAreaElement.prototype,
        HTMLAnchorElement.prototype,
        function() {
            if (!this._relList) {
                this._relList = new DOMTokenList(this, "rel");
            }
            return this._relList;
        }
    );

}