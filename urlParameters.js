var urlCode = {
    decode : function(urlEncoded) {
        this.decoding = urlEncoded;
        while (this.decoding.search("%3C") >= 0) {
            this.decoding = this.decoding.replace("%3C", "<");
        }
        while (this.decoding.search("%3E") >= 0) {
            this.decoding = this.decoding.replace("%3E", ">");
        }
        while (this.decoding.search("%22") >= 0) {
            this.decoding = this.decoding.replace("%22", '"');
        }
        while (this.decoding.search("%20") >= 0) {
            this.decoding = this.decoding.replace("%20", " ");
        }
        while (this.decoding.search("%21") >= 0) {
            this.decoding = this.decoding.replace("%21", "!");
        }
        while (this.decoding.search("%23") >= 0) {
            this.decoding = this.decoding.replace("%23", "#");
        }
        while (this.decoding.search("%24") >= 0) {
            this.decoding = this.decoding.replace("%24", "$");
        }
        while (this.decoding.search("%25") >= 0) {
            this.decoding = this.decoding.replace("%25", "%");
        }
        while (this.decoding.search("%26") >= 0) {
            this.decoding = this.decoding.replace("%26", "&");
        }
        while (this.decoding.search("%27") >= 0) {
            this.decoding = this.decoding.replace("%27", "'");
        }
        while (this.decoding.search("%28") >= 0) {
            this.decoding = this.decoding.replace("%28", "(");
        }
        while (this.decoding.search("%29") >= 0) {
            this.decoding = this.decoding.replace("%29", ")");
        }
        while (this.decoding.search("%2A") >= 0) {
            this.decoding = this.decoding.replace("%2A", "*");
        }
        while (this.decoding.search("%2B") >= 0) {
            this.decoding = this.decoding.replace("%2B", "+");
        }
        while (this.decoding.search("%2C") >= 0) {
            this.decoding = this.decoding.replace("%2C", ",");
        }
        while (this.decoding.search("%2D") >= 0) {
            this.decoding = this.decoding.replace("%2D", "-");
        }
        while (this.decoding.search("%2E") >= 0) {
            this.decoding = this.decoding.replace("%2E", ".");
        }
        while (this.decoding.search("%2F") >= 0) {
            this.decoding = this.decoding.replace("%2F", "/");
        }
        while (this.decoding.search("%30") >= 0) {
            this.decoding = this.decoding.replace("%30", "0");
        }
        while (this.decoding.search("%31") >= 0) {
            this.decoding = this.decoding.replace("%31", "1");
        }
        while (this.decoding.search("%32") >= 0) {
            this.decoding = this.decoding.replace("%32", "2");
        }
        while (this.decoding.search("%33") >= 0) {
            this.decoding = this.decoding.replace("%33", "3");
        }
        while (this.decoding.search("%34") >= 0) {
            this.decoding = this.decoding.replace("%34", "4");
        }
        while (this.decoding.search("%35") >= 0) {
            this.decoding = this.decoding.replace("%35", "5");
        }
        while (this.decoding.search("%36") >= 0) {
            this.decoding = this.decoding.replace("%36", "6");
        }
        while (this.decoding.search("%37") >= 0) {
            this.decoding = this.decoding.replace("%37", "7");
        }
        while (this.decoding.search("%38") >= 0) {
            this.decoding = this.decoding.replace("%38", "8");
        }
        while (this.decoding.search("%39") >= 0) {
            this.decoding = this.decoding.replace("%39", "9");
        }
        while (this.decoding.search("%3A") >= 0) {
            this.decoding = this.decoding.replace("%3A", ":");
        }
        while (this.decoding.search("%3B") >= 0) {
            this.decoding = this.decoding.replace("%3B", ";");
        }
        while (this.decoding.search("%3D") >= 0) {
            this.decoding = this.decoding.replace("%3D", "=");
        }
        while (this.decoding.search("%3F") >= 0) {
            this.decoding = this.decoding.replace("%3F", "?");
        }
        while (this.decoding.search("%40") >= 0) {
            this.decoding = this.decoding.replace("%40", "@");
        }
        return this.decoding;
    }
}

var urlParameters = {
    link : location.href,
    get : function(variable_name) {
        if (this.link.search(variable_name + "=") >= 0) {
            this.preparedValue = '';
            for (i = this.link.search(variable_name + "=") + variable_name.length + 1; i < this.link.length; i++) {
                if (this.link[i] == '&' || this.link[i] == '?') {
                    i = this.link.length;
                } else {
                    this.preparedValue += this.link[i];
                }
            }
            return urlCode.decode(this.preparedValue);
        } else {
            return null;
        }
    },
    has : function(variable_name) {
        if (this.link.search(variable_name + "=") >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
