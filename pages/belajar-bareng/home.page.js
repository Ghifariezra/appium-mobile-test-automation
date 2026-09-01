import { HomeLocators } from "../../locators/belajar-bareng/index.js";
import { BasePage } from "./base.page.js";

export class HomePage extends BasePage {
    #homeLocators = new HomeLocators();

    // Home Page Locators
    get titleHome() { return this.#homeLocators.titleHeader; }
    get logoutBtn() { return this.#homeLocators.logoutBtn; }
    get postInput() { return this.#homeLocators.postInput; }
    get postBtn() { return this.#homeLocators.postBtn; }
    get postList() { return this.#homeLocators.postList; }

    async postContent(content) {
        await this.setInputValue(this.postInput, content);

        await this.hideKeyboardIfVisible();
        await this.clickElement(this.postBtn);

        await this.hideKeyboardIfVisible();

        const createdPost = this.getPostByText(content);

        await createdPost.waitForExist({ timeout: 25000 });
        await createdPost.waitForDisplayed({ timeout: 10000 });

        return createdPost;
    }

    getPostByText(text) { return this.#homeLocators.getPostByText(text); }
}

export default new HomePage();