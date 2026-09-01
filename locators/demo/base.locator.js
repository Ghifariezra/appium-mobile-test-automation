export class BaseLocators {
    #humbergerMenu = '~View menu';
    #logoutBtn = '~Login Menu Item';
    #titleHeader = '~App logo and name';
    #checkoutBtn = `~Displays number of items in your cart`;

    get humbergerMenu() { return $(this.#humbergerMenu); }
    get logoutBtn() { return $(this.#logoutBtn); }
    get titleHeader() { return $(this.#titleHeader); }
    get checkoutBtn() { return $(this.#checkoutBtn); }
}