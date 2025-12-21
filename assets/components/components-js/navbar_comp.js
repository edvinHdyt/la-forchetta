class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split("/");
        currentUrl = currentUrl[0] + "//" + currentUrl[2];
        console.log(currentUrl);
        const res = await fetch(currentUrl + "/assets/components/navbar_comp.html");
        const htmlnya = await res.text();

        this.innerHTML = htmlnya;
    }
}

customElements.define("navbar-element", Navbar);
