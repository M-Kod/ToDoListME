import { test } from '@playwright/test';
import { TodoListPage } from '../pages/todolist.page.js';


let todoListPage;

test.beforeEach(async ({ page }) => {
    todoListPage = new TodoListPage(page);
    await todoListPage.open();
});


test('Add single todo', async ({ page }) => {
    await todoListPage.addToDo('Hello');
    await todoListPage.todoShouldExist('Hello');
});

test('Add multiple todos', async ({ page }) => {
    await todoListPage.addToDos('Hello', 'World', 'Love', 'Playwright');
    await todoListPage.todoShouldExist('Hello', 'World', 'Love', 'Playwright');
});

test('Edit todo', async () => {
    await todoListPage.addToDo('Edit me');
    await todoListPage.editToDo('Edit me', 'Hello World');
    await todoListPage.todoShouldExist('Hello World');
    await todoListPage.todoShouldNotExist('Edit me');
});

test('Remove todo', async () => {
    await todoListPage.addToDo('Hello');
    await todoListPage.removeToDo('Hello');
    await todoListPage.todoShouldNotExist('Hello');
});

test('Complete and uncomplete todo', async () => {
    await todoListPage.addToDo('Wash dishes');
    await todoListPage.completeToDo('Wash dishes');
    await todoListPage.completedTodosShouldBe(['Wash dishes']);
    await todoListPage.uncompleteToDo('Wash dishes');
    await todoListPage.todoShouldExist('Wash dishes');
});

test('Remove all completed todos', async () => {
    await todoListPage.addToDos('Hello', 'World', 'Wash dishes');
    await todoListPage.completeToDo('Hello');
    await todoListPage.completeToDo('World');
    await todoListPage.completeToDo('Wash dishes');
    await todoListPage.removeAllCompleted();
    await todoListPage.todoShouldNotExist('Hello');
    await todoListPage.todoShouldNotExist('World');
    await todoListPage.todoShouldNotExist('Wash dishes');
});

// nezinau kaip patikrinti ar todo yra tomorrow
test('Move todo to tomorrow', async () => {
    await todoListPage.addToDo('Hello');
    await todoListPage.moveToTomorrow('Hello');
});

test('Sort todos alphabetically', async () => {
    await todoListPage.addToDos('Banana', 'Apple', 'Cherry');
    await todoListPage.sortAlphabetically();
    await todoListPage.todoShouldExist('Apple', 'Banana', 'Cherry');
});

test('Sort todos normal', async () => {
    await todoListPage.addToDos('Banana tgrbgg', 'Apple', 'Cherry');
    await todoListPage.sortNormal();
    await todoListPage.todoShouldExist('Apple', 'Banana tgrbgg', 'Cherry');
});

test('Create new list', async () => {
    await todoListPage.createNewList('My List');
    await todoListPage.listShouldExist('My List');
});

test('Rename list', async () => {
    await todoListPage.createNewList('Your List');
    await todoListPage.renameList('Your List', 'Renamed List');
    await todoListPage.listShouldExist('Renamed List');
    await todoListPage.listShouldNotExist('Your List');
});

test('Delete list', async () => {
    await todoListPage.createNewList('Temp List');
    await todoListPage.deleteList('Temp List');
    await todoListPage.listShouldNotExist('Temp List');
});

test('Create new category', async () => {
    await todoListPage.createNewCategory('Work');
    await todoListPage.categoryShouldExist('Work');
});

test('Delete category', async () => {
    await todoListPage.createNewCategory('Temp Category');
    await todoListPage.deleteCategory('Temp Category');
    await todoListPage.categoryShouldNotExist('Temp Category');
});







