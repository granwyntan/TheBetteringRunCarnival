history.replaceState(null, "", window.location.href);
window.onpopstate = () => {
    history.go(1);
};
