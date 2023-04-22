function setup() {
    setBackgroundColor();
    showMessage();
    if (user.hasName()) {
        document.getElementById("name").value = user.getName();
    }
    if (urlParameters.has("r") && !urlParameters.has("an") && !urlParameters.has("ap")) {
        setRedirectTimeout();
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