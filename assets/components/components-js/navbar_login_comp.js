class NavbarLogin extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split("/");
        currentUrl = currentUrl[0] + "//" + currentUrl[2];

        const res = await fetch(currentUrl + "/assets/components/navbar_login_comp.html");

        const htmlnya = await res.text();

        this.innerHTML = htmlnya;
    }
}


customElements.define("navbar-login-element", NavbarLogin);