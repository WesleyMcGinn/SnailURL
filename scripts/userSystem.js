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
            localStorage.randomID = Math.random();
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

var securityCheck = {
    errorPercentage : 100*(localStorage.wrongs / (localStorage.rights + localStorage.wrongs)),
    errorRatio : (localStorage.wrongs / localStorage.rights),
    dangerLevel : function() {
        if (localStorage.wrongs == 0) {
            return 0; // No danger
        } else if (localStorage.wrongs < 4) {
            return 1; // Minimal danger
        } else if (localStorage.wrongs < 10) {
            return 2; // Potential danger
        } else if (localStorage.wrongs < 20) {
            return 3; // Real danger
        } else if (localStorage.wrongs < 50) {
            return 4; // Significant danger
        } else {
            return 5; // Extreme danger
        }
    },
    concern : function() {
        return (this.errorRatio > 1 && this.dangerLevel() > 1);
    },
    NOTIFY : function() {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "wesleymcginn1@gmail.com",
            Password: "F0C825FA1ABA268D00626F48DFCD4BBD1254",
            To: 'wesleymcginn1@gmail.com',
            From: "wesleymcginn1@gmail.com",
            Subject: "SnailURL: Suspicious Activity Report for User " + localStorage.randomID.toString(),
            Body: "User " + localStorage.randomID.toString() + " was caught in suspicious activity on SnailURL.<br>Here are the statistics:<br><br><table style='border-style: solid; border-width: 2px'><tr><td>Wrong Passwords:</td><td>Right Passwords:</td><td>Frequency:</td></tr><tr><td>" + localStorage.wrongs.toString() + "</td><td>" + localStorage.rights.toString() + "</td><td>" + user.frequency().toString() + "</td></tr></table>",
        }).then(function (message) {
            console.log(message);
            console.log('Hey there, hacker!  This is just to let you know that your suspicious activity has been reported and will soon be reviewed.  If you are sorry and would still like to have access to SnailURL, and if you promise to not attempt to hack passwords or username systems anymore, there is still hope...');
            console.log('Simply type "apologize()" below to write a short message explaining your intentions or confessions of what you did on this website.  Your statement will be reviewed along with your suspicious activity report.');
            console.log("Please do this.  If you do not, you will probably be officially banned from SnailURL.  Yes, it's that SpeechRecognitionResult.");
            console.log('This message, to you, was written by me, Wesley McGinn, the programmer of this website.  As a programmer myself, I can understand your longing to test things and figure things out and even hack things.  However, I simply cannot let you or anyone else hack my website.  I am sorry to tell you this but it is absolutely necessary.');
            console.log('Thank you for reading this.  Please run the code below:');
            console.log('apologize()');
        });
    },
    storageSpaceInMB : (JSON.stringify(localStorage).length/1000000),
    clearHistory : function() {
        localStorage.thisSnailsData = '[]';
        localStorage.thisSnailsTimes = '[]';
    },
    action : function() {
        if (this.concern()) {
            this.NOTIFY();
        }
        if (this.storageSpaceInMB > 9) {
            this.clearHistory();
        }
    }
}

function apologize() {
    var apology = prompt("Please honestly explain why your activity on this website has been so suspicious.  If you just did it for kicks but you say that you won't do it anymore, that's all this is asking for.  Just be honest.", "I am so sorry for attempting to hack your website.  I just thought it would be fun.  I had no idea that it would become this serious.  Please forgive me and let me continue to use SnailURL.  I won't do it again.");
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "wesleymcginn1@gmail.com",
        Password: "F0C825FA1ABA268D00626F48DFCD4BBD1254",
        To: 'wesleymcginn1@gmail.com',
        From: "wesleymcginn1@gmail.com",
        Subject: "SnailURL: Apology from User " + localStorage.randomID.toString(),
        Body: apology,
    }).then(function (message) {
        console.log("Your apology was sent.  Please leave this website and come back in about 24 hours.  A response will be ready for you by then.");
    });
}