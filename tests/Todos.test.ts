import { describe, test, expect } from "vitest";
import Todos, { filters, validateTodo } from "../src/components/Todos.vue";
import { mount } from "@vue/test-utils";

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

  test("添加任务", async () => {
    const wrapper = mount(Todos);
    const todo = "看电影";

    // 输入任务名
    const input = wrapper.find("input.new-todo");
    await input.setValue(todo);
    // expect(input.element.value).toBe(todo);

    // 添加输入按钮
    await input.trigger("keyup.enter");
    const todos = wrapper.find("ul.todo-list");
    expect(todos.text()).toContain(todo);
  });

  test("完成任务", async () => {
    const wrapper = mount(Todos);

    const todos = [
      { id: 1, title: "吃饭", completed: true },
      { id: 2, title: "打游戏", completed: true },
      { id: 3, title: "睡觉", completed: false },
    ];

    await wrapper.setData({ todos });
  });
});
