function setBackgroundColor() {
    if (urlParams.has("C")) {
        document.body.style.backgroundColor = urlParams.get("C");
        document.body.style.backgroundImage = "none";
        console.log("Background Color Set");
    } else if (urlParams.has("c")) {
        document.body.style.backgroundColor = urlParams.get("c");
        document.body.style.backgroundImage = "none";
        console.log("Background Color Set - Alternative Method");
    }
    if (urlParams.has("C") && urlParams.has("c")) {
        document.body.style.backgroundImage = "linear-gradient(" + urlParams.get("c") + ", " + urlParams.get("C") + ")";
        console.log("Background Gradient Set");
    }
}

function showSnail() {
    if (urlParams.has("snail")) {
        if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParams.get("snail").toLowerCase())) {
            console.log("Snail Disabled by URL Parameter");
        } else {
            mySnail.run();
            console.log("Snail Enabled by URL Parameter");
            return true;
        }
    } else if (urlParams.has("r") && !urlParams.has("t") && !urlParams.has("ap") && !urlParams.has("an")) {
        console.log("Snail Disabled by Instant Redirect");
    } else if (urlParams.has("t") && !urlParams.has("ap") && !urlParams.has("an")) {
        if (parseFloat(urlParams.get("t")) < 4) {
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
    if (urlParams.has("m")) {
        document.getElementById("content").innerHTML = urlParams.get("m");
        console.log("Message Shown");
        if (urlParams.has("script")) {
            console.log("Running URL Parameter Script....");
            eval(urlParams.get("script"));
            console.log("URL Parameter Script Was Run.");
        }
        return true;
    } else {
        console.log("No Message to Show");
        return false;
    }
}

function hideGoNowButton() {
    if (urlParams.has("goNow")) {
        if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParams.get("goNow").toLowerCase())) {
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
    if (urlParams.has("t")) {
        if (urlParams.has("t") && urlParams.has("r")) {
            window.setTimeout(function() {
                redirect();
            }, 1000 * parseFloat(urlParams.get("t")));
            console.log("Redirect Timeout Set");
            countdown = Math.floor(parseFloat(urlParams.get("t")));
            document.getElementById("time").innerHTML = countdown.toString();
            document.getElementById("link").innerHTML = "<a href='" + urlParams.get("r") + "'>" + urlParams.get("r") + "</a>";
            if (urlParams.has("goNow")) {
                if (["0", "no", "none", "off", "nope", "false", "hide", "invisible"].includes(urlParams.get("goNow").toLowerCase())) {
                    document.getElementById("link").style.display = "none";
                    document.getElementById("countdown").innerHTML = document.getElementById("countdown").innerHTML.replace("You will be redirected to", "You will be redirected");
                }
            }
            document.getElementById("countdown").style.display = 'inherit';
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
        location.assign(urlParams.get("r"));
    }, 800);
}

function checkName() {
    if (urlParams.has("r") && urlParams.has("an")) {
        var allowed = eval(urlParams.get("an"));
        if (allowed.includes(recallName())) {
            setRedirectTimeout();
        } else {
            document.getElementById("sign_in").style.display = "inherit";
        }
    }
}

function tryName() {
    if (urlParams.has("r") && urlParams.has("an")) {
        var allowed = eval(urlParams.get("an"));
        if (allowed.includes(recallName())) {
            setRedirectTimeout();
            document.getElementById("sign_in").style.display = "none";
        } else {
            location.assign("./home.html?m=%3Cp%3EYou%20do%20not%20have%20access%20to%20this%20page.%3C/p%3E%3Cbutton%20onclick=%27window.close();leave()%27%3EOkay%3C/button%3E&C=gold&c=yellow&snail=0");
        }
    }
}

function tryPass() {
    if (localStorage.rights == undefined) { localStorage.rights = 0; }
    if (localStorage.wrongs == undefined) { localStorage.wrongs = 0; }
    if (urlParams.has("r") && urlParams.has("ap")) {
        if (urlParams.get("ap") == document.getElementById("password").value) {
            localStorage.rights++;
            document.getElementById("gateway").style.display = "none";
            setRedirectTimeout();
        } else {
            localStorage.wrongs++;
            if (localStorage.wrongs > 4 && localStorage.rights < localStorage.wrongs) {
                localStorage.BLOCKED = '1';
            }
            location.assign("./home.html?m=%3Ch1%3EYOU%20ENTERED%20THE%20WRONG%20PASSWORD!%3C/h1%3E%3Cp%3EIf%20SnailURL%20detects%20too%20much%20suspicious%20activity%20on%20this%20device,%20you%20may%20eventually%20be%20%3Cb%3EBLOCKED%3C/b%3E%20from%20this%20site.%20%3Ci%3EPlease%20be%20cautious!%3C/i%3E%3C/p%3E%3Cbr%3E%3Cbr%3E%3Cdiv%20id=%27a%27%20class=%27box%27%3E...%3C/div%3E&C=black&c=red&script=document.getElementById(%27a%27).innerHTML%20=%20localStorage.wrongs&snail=0");
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
    if (localStorage.BLOCKED == '1') {
        if (urlParams.has("apology")) {
            if (urlParams.get("apology") == "pleaseunblockmeiwontdoiteveragainplease") {
                localStorage.clear();
            }
        }
        leave();
    } else {
        setBackgroundColor();
        showSnail();
        showMessage();
        hideGoNowButton();
        recallName();
        if (urlParams.has("r")) {
            if (!urlParams.has("an") && !urlParams.has("ap")) {
                setRedirectTimeout();
            } else if (urlParams.has("an") && !urlParams.has("ap")) {
                checkName();
            } else if (!urlParams.has("an") && urlParams.has("ap")) {
                document.getElementById("gateway").style.display = 'inherit';
            }
        }
    }
}
