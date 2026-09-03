export class BaseLocators {
    #humbergerMenu = 'View menu';
    #titleHeader = '~App logo and name';
    #checkoutBtn = `Displays number of items in your cart`;
    #loginMenu = 'Login Menu Item';
    #logoutMenu = 'Logout Menu Item';

    get humbergerMenu() { return this.getButton(this.#humbergerMenu); }
    get titleHeader() { return $(this.#titleHeader); }
    get checkoutBtn() { return this.getButton(this.#checkoutBtn); }
    get loginMenu() { return this.getButton(this.#loginMenu); }
    get logoutMenu() { return this.getButton(this.#logoutMenu); }

    getButton(buttonText) { return $(`~${buttonText}`); }
}