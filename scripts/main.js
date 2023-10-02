function setBackgroundColor() {
    if (urlParameters.has("C")) {
        document.body.style.backgroundColor = urlParameters.get("C");
        document.body.style.backgroundImage = "none";
        console.log("Background Color Set");
    } else if (urlParameters.has("c")) {
        document.body.style.backgroundColor = urlParameters.get("c");
        document.body.style.backgroundImage = "none";
        console.log("Background Color Set - Alternative Method");
    }
    if (urlParameters.has("C") && urlParameters.has("c")) {
        document.body.style.backgroundImage = "linear-gradient(" + urlParameters.get("c") + ", " + urlParameters.get("C") + ")";
        console.log("Background Gradient Set");
    }
}

function showSnail() {
    if (urlParameters.has("snail")) {
        if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParameters.get("snail").toLowerCase())) {
            console.log("Snail Disabled by URL Parameter");
        } else {
            mySnail.run();
            console.log("Snail Enabled by URL Parameter");
            return true;
        }
    } else if (urlParameters.has("r") && !urlParameters.has("t") && !urlParameters.has("ap") && !urlParameters.has("an")) {
        console.log("Snail Disabled by Instant Redirect");
    } else if (urlParameters.has("t") && !urlParameters.has("ap") && !urlParameters.has("an")) {
        if (parseFloat(urlParameters.get("t")) < 4) {
            console.log("Snail Disabled by Instant Timer (< 4s)");
        } else {
            mySnail.run();
            console.log("Snail Enabled by Instant Long Timer");
            return true;
        }
    } else {
        mySnail.run();
        console.log("Snail Enabled by Default");
        return true;
    }
    return false;
}

function showMessage() {
    if (urlParameters.has("m")) {
        document.getElementById("content").innerHTML = urlParameters.get("m");
        console.log("Message Shown");
        if (urlParameters.has("script")) {
            console.log("Running URL Parameter Script....");
            eval(urlParameters.get("script"));
            console.log("URL Parameter Script Was Run.");
        }
        return true;
    } else {
        console.log("No Message to Show");
        return false;
    }
}

function hideGoNowButton() {
    if (urlParameters.has("goNow")) {
        if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParameters.get("goNow").toLowerCase())) {
            document.getElementById("go now").style.display = "none";
            console.log('"Go Now" Button Removed');
            return true;
        }
    }
    return false;
}

function recallName() {
    if (localStorage.username != undefined) {
        document.getElementById("name").value = localStorage.username;
        return localStorage.username;
    }
    return null;
}

function rememberName(name) {
    localStorage.username = name;
}

function setRedirectTimeout() {
    if (urlParameters.has("t")) {
        if (urlParameters.has("t") && urlParameters.has("r")) {
            window.setTimeout(function() {
                redirect();
            }, 1000 * parseFloat(urlParameters.get("t")));
            console.log("Redirect Timeout Set");
            document.getElementById("link").innerHTML = "<a href='" + urlParameters.get("r") + "'>" + urlParameters.get("r") + "</a>";
            document.getElementById("time").innerHTML = urlParameters.get("t");
            if (urlParameters.has("goNow")) {
                if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParameters.get("goNow").toLowerCase())) {
                    document.getElementById("link").style.display = 'none';
                    document.getElementById("countdown").innerHTML = document.getElementById("countdown").innerHTML.replace("You will be redirected to", "You will be redirected");
                }
            }
            document.getElementById("countdown").style.display = 'inherit';
            countdown = Math.floor(parseFloat(urlParameters.get("t")));
            window.setInterval(function() {
                if (countdown > 0) { countdown--; }
                document.getElementById("time").innerHTML = countdown.toString();
            }, 1000);
        }
    } else {
        redirect();
    }
}

function redirect() {
    console.log("Redirecting....");
    document.getElementById("notice").style.display = "inherit";
    document.documentElement.style.cursor = "progress";
    window.setTimeout(function() {
        location.assign(urlParameters.get("r"));
    }, 800);
}

function checkName() {
    if (urlParameters.has("r") && urlParameters.has("an")) {
        var allowed = eval(urlParameters.get("an"));
        if (allowed.includes(recallName())) {
            setRedirectTimeout();
        } else {
            document.getElementById("sign_in").style.display = "inherit";
        }
    }
}

function tryName() {
    if (urlParameters.has("r") && urlParameters.has("an")) {
        var allowed = eval(urlParameters.get("an"));
        if (allowed.includes(recallName())) {
            setRedirectTimeout();
            document.getElementById("sign_in").style.display = "none";
        } else {
            location.assign("https://wesleymcginn.github.io/SnailURL/home.html?m=%3Cp%3EYou%20do%20not%20have%20access%20to%20this%20page.%3C/p%3E%3Cbutton%20onclick=%27window.close();leave()%27%3EOkay%3C/button%3E&C=gold&c=yellow");
        }
    }
}

function tryPass() {
    if (localStorage.rights == undefined) { localStorage.rights = 0; }
    if (localStorage.wrongs == undefined) { localStorage.wrongs = 0; }
    if (urlParameters.has("r") && urlParameters.has("ap")) {
        if (urlParameters.get("ap") == document.getElementById("password").value) {
            localStorage.rights++;
            document.getElementById("gateway").style.display = "none";
            setRedirectTimeout();
        } else {
            localStorage.wrongs++;
            if (localStorage.wrongs > 4 && localStorage.rights < localStorage.wrongs) {
                localStorage.BLOCKED = true;
            }
            location.assign("https://wesleymcginn.github.io/SnailURL/home.html?m=%3Ch1%3EYOU%20ENTERED%20THE%20WRONG%20PASSWORD!%3C/h1%3E%3Cp%3EIf%20SnailURL%20detects%20too%20much%20suspicious%20activity%20on%20this%20device,%20you%20may%20eventually%20be%20%3Cb%3EBLOCKED%3C/b%3E%20from%20this%20site.%20%3Ci%3EPlease%20be%20cautious!%3C/i%3E%3C/p%3E%3Cbr%3E%3Cbr%3E%3Cdiv%20id=%27a%27%20class=%27box%27%3E...%3C/div%3E&C=black&c=red&script=document.getElementById(%27a%27).innerHTML%20=%20localStorage.wrongs");
        }
    }
}

function leave() {
    history.go(-1);
    history.go(-2);
    window.close();
    window.setTimeout(function() {
        location.href = "about:blank";
    }, 400);
}

function setup() {
    if (localStorage.BLOCKED == true) {
        if (urlParameters.has("apology")) {
            if (urlParameters.get("apology") == "pleaseunblockmeiwontdoiteveragainplease") {
                localStorage.BLOCKED == false;
            }
        }
        leave();
    } else {
        setBackgroundColor();
        showSnail();
        showMessage();
        hideGoNowButton();
        recallName();
        if (urlParameters.has("r")) {
            if (!urlParameters.has("an") && !urlParameters.has("ap")) {
                setRedirectTimeout();
            } else if (urlParameters.has("an") && !urlParameters.has("ap")) {
                checkName();
            } else if (!urlParameters.has("an") && urlParameters.has("ap")) {
                document.getElementById("gateway").style.display = 'inherit';
            }
        }
    }
}
