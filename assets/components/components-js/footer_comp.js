class Footer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        let currentUrl = window.location.href;
        currentUrl = currentUrl.split("/");
        currentUrl = currentUrl[0] + "//" + currentUrl[2];
        
        if (currentUrl == "https://edvinhdyt.github.io/"){
            currentUrl = currentUrl + "/la-forchetta/";
        }


        const res = await fetch(currentUrl + "/assets/components/footer_comp.html");

        const htmlnya = await res.text();

        this.innerHTML = htmlnya;
    }
}


customElements.define("footer-element", Footer);