function setup() {
    resize();
    user.rememberThis();
    securityCheck.action();
    setBackgroundColor();
    if (!showMessage()) {
        if (urlParameters.get("goNow") == "disabled") {
            document.getElementById("go now").style.display = 'none';
        }
        document.getElementById("name").value = user.getName();
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

function resize() {
    document.getElementsByClassName("snail")[0].children[0].children[1].children[0].children[0].attributes.to.value = (2*window.innerWidth).toString() + " 0";
}

function setBackgroundColor() {
    if (urlParameters.has("C")) {
        document.body.style.backgroundColor = urlParameters.get("C");
        document.body.style.backgroundImage = "none";
    } else if (urlParameters.has("c")) {
        document.body.style.backgroundColor = urlParameters.get("c");
        document.body.style.backgroundImage = "none";
    }
    if (urlParameters.has("C") && urlParameters.has("c")) {
        document.body.style.backgroundImage = "linear-gradient(" + urlParameters.get("c") + ", " + urlParameters.get("C") + ")";
    }
}

function showMessage() {
    if (urlParameters.has("m")) {
        document.body.innerHTML = urlParameters.get("m");
        if (urlParameters.has("script")) {
            eval(urlParameters.get("script"));
        }
        return true;
    } else {
        return false;
    }
}

function setRedirectTimeout() {
    if (urlParameters.has("t")) {
        if (urlParameters.has("t") && urlParameters.has("r")) {
            window.setTimeout(function() {
                redirect();
            }, 1000*parseFloat(urlParameters.get("t")));
            document.getElementById("link").innerHTML = "<a href='" + urlParameters.get("r") + "'>" + urlParameters.get("r") + "</a>";
            document.getElementById("time").innerHTML = urlParameters.get("t");
            if (urlParameters.get("goNow") == "disabled") {
                document.getElementById("link").style.display = 'none';
                document.getElementById("countdown").innerHTML = document.getElementById("countdown").innerHTML.replace("You will be redirected to", "You will be redirected");
            }
            document.getElementById("countdown").style.display = 'inherit';
            countdown = parseFloat(urlParameters.get("t"));
            window.setInterval(function() {
                if (countdown > 0) { countdown--; }
                document.getElementById("time").innerHTML = countdown.toString();
            }, 1000);
        }
    } else {
        redirect();
    }
}

function checkName() {
    if (urlParameters.has("r") && urlParameters.has("an")) {
        var allowed = eval(urlParameters.get("an"));
        if (allowed.indexOf(user.getName()) != -1) {
            setRedirectTimeout();
        } else {
            document.getElementById("sign_in").style.display = 'inherit';
        }
    }
}

function redirect() {
    document.getElementById("notice").style.display = 'inherit';
    document.documentElement.style.cursor = 'progress';
    window.setTimeout(function() {
        location.assign(urlParameters.get('r'));
    }, 500);
}

function tryName() {
    if (urlParameters.has("r") && urlParameters.has("an")) {
        var allowed = eval(urlParameters.get("an"));
        if (allowed.indexOf(user.getName()) != -1) {
            setRedirectTimeout();
            document.getElementById("sign_in").style.display = 'none';
        } else {
            location.assign("https://wesleymcginn.github.io/SnailURL/home.html?m=%3Cp%3EYou%20do%20not%20have%20access%20to%20this%20page.%3C/p%3E%3Cbutton%20onclick=%27window.close();leave()%27%3EOkay%3C/button%3E&C=gold&c=yellow");
        }
    }
}

function tryPass() {
    if (urlParameters.has("r") && urlParameters.has("ap")) {
        if (urlParameters.get("ap") == document.getElementById("password").value) {
            localStorage.rights++;
            document.getElementById("gateway").style.display = 'none';
            setRedirectTimeout();
        } else {
            localStorage.wrongs++;
            securityCheck.action();
            location.assign("https://wesleymcginn.github.io/SnailURL/home.html?m=%3Ch1%3EYOU%20ENTERED%20THE%20WRONG%20PASSWORD!%3C/h1%3E%3Cp%3EIf%20SnailURL%20detects%20too%20much%20suspicious%20activity%20on%20this%20device,%20you%20may%20eventually%20be%20%3Cb%3EBLOCKED%3C/b%3E%20from%20several%20features%20on%20the%20site.%20%3Ci%3EPlease%20be%20cautious.%3C/i%3E%3C/p%3E%3Cbr%3E%3Cbr%3E%3Cdiv%20id=%27a%27%20class=%27box%27%3E...%3C/div%3E&C=black&c=red&script=document.getElementById(%27a%27).innerHTML%20=%20localStorage.wrongs");
        }
    }
}

function leave() {
    window.close();
    location.href = "about:blank";
}