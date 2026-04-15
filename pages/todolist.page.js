import { expect } from "@playwright/test";
export class TodoListPage {
    constructor(page) {
        this.page = page;
        this.newToDoInput = page.locator('#newtodo');
        this.todoList = page.locator('#mytodos li');
         this.updateBox = page.locator('#updatebox');
        this.inplaceUpdateBox = page.locator('#inplaceeditor #updatebox');
        this.editInput = page.locator('#mytodos li input[type="text"]');
        this.removeAllCompletedTodo = page.locator('.purge');
        this.saveButton = page.locator('input[value="Save"]');
        this.lists = page.locator('#lists li[data-listid]');
        this.categories = page.locator('#mycategories li');
    }

    async open() {
        await this.page.goto('https://todolistme.net/');
    }

    async addToDo(text) {
        await this.newToDoInput.fill(text);
        await this.newToDoInput.press('Enter');
    }

    async addToDos(...texts) {
        for (const text of texts) {
            await this.addToDo(text);
        }
    }

    async todoShouldExist(text) {
        await expect(this.page.getByText(text, { exact: true })).toBeVisible();
    }

    async todoShouldNotExist(text) {
        await expect(this.page.getByText(text, { exact: true })).toHaveCount(0);
    }

    async editToDo(oldText, newText) {
        const todoTask = this.todoList.filter({ hasText: oldText });
        await todoTask.dblclick();
        await this.editInput.fill(newText);
        await this.editInput.press('Enter');
    }

    async removeToDo(text) {
        const deleteToDo = this.todoList.filter({ hasText: text });
        await deleteToDo.hover();
        await deleteToDo.locator('.delete').click();
    }

    async completeToDo(text) {
        const checkBoxToDo = this.todoList.filter({ hasText: text });
        await checkBoxToDo.locator('input[type="checkbox"]').click();
    }

    async uncompleteToDo(text) {
        const uncheckBoxToDo = this.page.locator('#mydonetodos li').filter({ hasText: text });
        await uncheckBoxToDo.locator('input[type="checkbox"]').click();
    }

    async removeAllCompleted() {
        await this.removeAllCompletedTodo.click();
    }

    async moveToTomorrow(text) {
        const toDoItem = this.todoList.filter({ hasText: text });
        const tomorrow = this.page.locator('#tomorrowtitle');
        await toDoItem.dragTo(tomorrow);
        const showTomorrow = this.page.locator('#tomorrowarrow');
        await showTomorrow.click();
    }

    async sortAlphabetically() {
        await this.page.locator('#sortbutton').click();
        await this.page.locator('#sort1').click();
    }

    async sortNormal() {
        await this.page.locator('#sortbutton').click();
        await this.page.locator('#sort0').click();
    }

    async completedTodosShouldBe(texts) {
        await expect(this.page.locator('#mydonetodos li')).toHaveText(texts);
    }

    async createNewList(name) {
        await this.page.locator('#addlist').click();
        await this.updateBox.fill(name);
        await this.updateBox.press('Enter');
    }

    async renameList(oldName, newName) {
        const list = this.lists.filter({ hasText: oldName });
        await list.locator('span.listname').dblclick();
        await this.inplaceUpdateBox.waitFor({ state: 'visible' });
        await this.inplaceUpdateBox.fill(newName);
        await this.saveButton.click();
    }

     async deleteList(name) {
        const list = this.lists.filter({ hasText: name });
        await list.hover();
        await list.locator('.delete').click();
    }

     async listShouldExist(name) {
        await expect(this.lists.filter({ hasText: name })).toBeVisible();
    }

    async listShouldNotExist(name) {
        await expect(this.lists.filter({ hasText: name })).toHaveCount(0);
    }

    async createNewCategory(name) {
        await this.page.locator('#adddivider').click();
        await this.updateBox.waitFor({ state: 'visible' });
        await this.updateBox.fill(name);
        await this.saveButton.click();
    }

    async renameCategory(oldName, newName) {
        const category = this.categories.filter({ hasText: oldName });
        await category.locator('span.listname').dblclick();
        await this.inplaceUpdateBox.waitFor({ state: 'visible' });
        await this.inplaceUpdateBox.fill(newName);
        await this.saveButton.click();
    }

    async deleteCategory(name) {
        const category = this.categories.filter({ hasText: name });
        await category.hover();
        await category.locator('img.delete').click();
    }

    async categoryShouldExist(name) {
        await expect(this.categories.filter({ hasText: name })).toBeVisible();
    }

    async categoryShouldNotExist(name) {
        await expect(this.categories.filter({ hasText: name })).toHaveCount(0);
    }
}
