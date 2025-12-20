class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        const res = await fetch("../../../assets/components/navbar_comp.html");
        const htmlnya = await res.text();

        this.innerHTML = htmlnya;
    }
}

customElements.define("navbar-element", Navbar);