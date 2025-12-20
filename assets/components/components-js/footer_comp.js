class Footer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        const res = await fetch("../../../assets/components/footer_comp.html");

        const htmlnya = await res.text();

        this.innerHTML = htmlnya;
    }
}


customElements.define("footer-element", Footer);