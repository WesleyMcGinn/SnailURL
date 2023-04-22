function setup() {
    user.rememberThis();
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
            }
        }
    }
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
        return true;
    } else {
        return false;
    }
}

function setRedirectTimeout() {
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
    }, 1000);
}