import { AuthLocators } from "./auth/auth.locator";

export class HomeLocators extends AuthLocators {
    #titleHeader = 'Belajar Bareng';
    #logoutBtn = 'android=new UiSelector().className("android.widget.Button").instance(0)';
    #postInput = 'android=new UiSelector().className("android.widget.EditText")';
    #postBtn = 'Posting';
    #postList = 'android=new UiSelector().className("android.widget.ScrollView")';

    get titleHeader() { return $(`~${this.#titleHeader}`); }
    get logoutBtn() { return $(this.#logoutBtn); }
    get postInput() { return $(this.#postInput); }
    get postBtn() { return this.getButton(this.#postBtn); }
    get postList() { return $(this.#postList); }

    getPostByText(text) {
        return $(`//*[contains(@content-desc, "${text}")]`);
    }
}