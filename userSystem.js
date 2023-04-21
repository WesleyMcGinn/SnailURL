var user = {
    hasName : function() {
        return (localStorage.username != undefined);
    },
    setName : function(name) {
        localStorage.username = name;
    },
    getName : function() {
        if (this.hasName()) {
            return localStorage.username;
        } else {
            return "anonymous";
        }
    }
}