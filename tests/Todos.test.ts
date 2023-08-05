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
    // 准备
    const wrapper = mount(Todos);
    const inputSelector = "input.new-todo";
    const resultSelector = "ul.todo-list";
    const todo = "看电影";

    // 模拟组件输入
    await wrapper.get(inputSelector).setValue(todo);
    // 判断输入是否正确渲染
    expect(wrapper.get(inputSelector).element.value).toBe(todo);

    // 模拟回车事件
    await wrapper.get(inputSelector).trigger("keyup.enter");
    expect(wrapper.get(resultSelector).text()).toContain(todo);
  });

  test("完成任务", async () => {
    const wrapper = mount(Todos);
    const todoSelector = "li.todo";
    const checkboxSelector = "input[type=checkbox]";

    // 初始化 todos
    await wrapper.setData({ todos: getDefaultTodos() });
    // 触发 todo 的 checkbox
    await wrapper
      .findAll(todoSelector)[2]
      .find(checkboxSelector)
      .setValue(true);

    // 判断 todo 的状态是否改变
    expect(wrapper.findAll(todoSelector)[2].classes()).toContain("completed");
  });

  test("删除任务", async () => {
    const wrapper = mount(Todos);
    const todoSelector = "li.todo";
    const deleteBtnSelector = "button.destroy";
    const todos = getDefaultTodos();

    // 初始化 todos
    await wrapper.setData({ todos: [...todos] });

    expect(wrapper.findAll(todoSelector).length).toBe(todos.length);

    // 触发删除按钮的点击事件
    await wrapper.find(deleteBtnSelector).trigger("click");
    expect(wrapper.findAll(todoSelector).length).toBe(todos.length - 1);
  });

  test("编辑任务", async () => {
    const wrapper = mount(Todos);
    const todos = getDefaultTodos();
    const todoSelector = "li.todo";
    const newTodo = "吃饭饭";

    // 初始化 todos
    await wrapper.setData({ todos: [...todos] });

    // 模拟双击事件
    await wrapper.find(todoSelector).find("label").trigger("dblclick");

    // 模拟编辑 todo
    await wrapper.find(todoSelector).find("input[type=text]").setValue(newTodo);
    
    expect(wrapper.find(todoSelector).text()).toBe(newTodo);
  });
});
