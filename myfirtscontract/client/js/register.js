function register() {
    if (document.getElementById("flexCheckDefault").checked) {
        window.location = "registerStartup.html";
        return true;
    }
    window.location = "index.html";
    return false;
}
