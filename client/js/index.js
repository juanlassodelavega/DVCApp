function login() {
    var username = document.getElementById('username').value;

    if (username != "admin") {
        window.location = "investments.html";
    } else {
        window.location = "investors.html";
    }
}