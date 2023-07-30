import { describe, test, expect } from "vitest";
import { filters, validateTodo } from "../src/components/Todos.vue";

describe("Todos", () => {
  test("任务过滤", () => {
    const todos = [
      { id: 1, title: "吃饭", completed: true },
      { id: 2, title: "打游戏", completed: true },
      { id: 3, title: "睡觉", completed: false },
    ];

    expect(filters.all(todos).length).toEqual(3);
    expect(filters.completed(todos).length).toEqual(2);
    expect(filters.active(todos)).toContainEqual(todos[2]);
  });

  test("任务名称长度校验", () => {
    const normalText = "看电影";
    const longText = "在今年年底之前，读完100本书";
    expect(validateTodo("")).toBeFalsy();
    expect(validateTodo(normalText)).toBeTruthy();
    expect(validateTodo(longText)).toBeFalsy();
  });
});
