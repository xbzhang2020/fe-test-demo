import { describe, test, expect } from "vitest";
import Todos, { filters, validateTodo } from "../src/pages/todos/Todos.vue";
import { mount } from "@vue/test-utils";

const getDefaultTodos = () => [
  { id: 1, title: "吃饭", completed: true },
  { id: 2, title: "打游戏", completed: true },
  { id: 3, title: "睡觉", completed: false },
];

describe("Todos", () => {
  test("过滤任务", () => {
    const todos = getDefaultTodos();
    expect(filters.all(todos).length).toEqual(3);
    expect(filters.completed(todos).length).toEqual(2);
    expect(filters.active(todos)).toContainEqual(todos[2]);
  });

  test("校验任务名称", () => {
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
    await wrapper.setData({ todos: getDefaultTodos() });
    const todoView = wrapper.find("li.todo");

    await todoView.find("input[type=checkbox]").setValue(false);
    expect(todoView.classes()).not.toContain("completed");

    await todoView.find("input[type=checkbox]").setValue(true);
    expect(todoView.classes()).toContain("completed");
  });

  test("删除任务", async () => {
    const wrapper = mount(Todos);
    const todos = getDefaultTodos();
    await wrapper.setData({ todos: [...todos] });

    expect(wrapper.findAll("li.todo").length).toBe(todos.length);

    await wrapper.find("button.destroy").trigger("click");
    expect(wrapper.findAll("li.todo").length).toBe(todos.length - 1);
  });

  test("编辑任务", async () => {
    const wrapper = mount(Todos);
    const todos = getDefaultTodos();
    await wrapper.setData({ todos: [...todos] });

    const firstTodoView = wrapper.find("li.todo");
    expect(firstTodoView.text()).toBe(todos[0].title);

    // 模拟双击
    await firstTodoView.find("label").trigger("dblclick");

    // 修改输入
    const newTodo = "吃饭饭";
    await firstTodoView.find("input[type=text]").setValue(newTodo);
    expect(firstTodoView.text()).toBe(newTodo);
  });
});
