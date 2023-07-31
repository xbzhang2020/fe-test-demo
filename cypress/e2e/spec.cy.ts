const getDefaultTodos = () => [
  { id: 1, title: "吃饭", completed: true },
  { id: 2, title: "打游戏", completed: true },
  { id: 3, title: "睡觉", completed: false },
];

const todos = getDefaultTodos();

describe("Todos", () => {
  beforeEach(() => {
    // 模拟后端数据库
    localStorage.setItem("vue-todomvc", JSON.stringify(todos));
  });

  it("数据持久化", () => {
    cy.visit("/");

    cy.get('body').should('contain.text', 'todos')
    cy.get(".todo").should("contain.text", todos[0].title);
    cy.get(".todo").should("have.class", "completed");
  });

  it("错误处理", () => {
    cy.visit("/#/hello");

    cy.get('body').should('not.contain.text', 'todos')
    cy.get('body').should('contain.text', '404')
  });
});
