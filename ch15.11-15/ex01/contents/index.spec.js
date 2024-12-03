import { test, expect } from "@playwright/test";

test.describe("ToDo App", () => {
  test.beforeEach(async ({ page }) => {
    // サーバーが動作していることを確認し、アプリのページに移動
    await page.goto("http://localhost:3000");
  });

  test("should add a new task", async ({ page }) => {
    // 新しいタスクを追加
    await page.fill("#new-todo", "新しいタスク👽");
    await page.click('button[type="submit"]');

    // タスクがリストに追加されたことを確認
    const todoItem = page.locator("#todo-list li label");
    await expect(todoItem).toHaveText("新しいタスク👽");
  });

  test("should mark a task as completed", async ({ page }) => {
    // 新しいタスクを追加
    await page.fill("#new-todo", "やがて完了になるタスク");
    await page.click('button[type="submit"]');

    // タスクを完了にする
    const todoItem = page.locator("#todo-list li");
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.check();

    // タスクが完了として表示されていることを確認
    await expect(todoItem.locator("label")).toHaveCSS(
      "text-decoration-line",
      "line-through",
    );
  });

  test("should delete a task", async ({ page }) => {
    // 新しいタスクを追加
    await page.fill("#new-todo", "やがて消えるタスク");
    await page.click('button[type="submit"]');

    // タスクを削除
    const todoItem = page.locator("#todo-list li");
    await todoItem.locator("button").click();

    // タスクがリストから削除されたことを確認
    await expect(todoItem).not.toBeVisible();
  });
});
