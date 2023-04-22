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
            return "Anonymous";
        }
    },
    isNew : function() {
        return (localStorage.thisSnailsData == undefined || localStorage.thisSnailsData.length == 0);
    },
    frequency : function() {
        if (this.isNew()) {
            return 0;
        } else {
            ThisSnailsTimes = eval(localStorage.thisSnailsTimes);
            return (ThisSnailsTimes.length);
        }
    },
    rememberThis : function() {
        if (this.isNew()) {
            ThisSnailsData = [];
            ThisSnailsTimes = [];
            localStorage.rights = 0;
            localStorage.wronts = 0;
        } else {
            ThisSnailsData = eval(localStorage.thisSnailsData);
            ThisSnailsTimes = eval(localStorage.thisSnailsTimes);
        }
        ThisSnailsData.splice(0, 0, location.href);
        ThisSnailsTimes.splice(0, 0, Date().toString());
        localStorage.thisSnailsData = JSON.stringify(ThisSnailsData);
        localStorage.thisSnailsTimes = JSON.stringify(ThisSnailsTimes);
    }
}