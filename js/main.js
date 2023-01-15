"use strict";

const newTodoForm = document.querySelector("#new-todo-form");
const todoListActive = document.querySelector("#todo-list-active");
const todoListDone = document.querySelector("#todo-list-done");

class Todo {
    constructor(title, details, priority) {
        this.titleText = title;
        this.detailsText = details;
        this.priority = Number(priority);
        this.state = "active";

        this.#createElements();
        this.#addToListActive();
    }

    #createElements() {
        this.todo = document.createElement("section");
        this.todo.classList.add("todo");
        this.todo.setAttribute("data-state", this.state);

        this.title = document.createElement("h3");
        this.title.classList.add("todo-title");
        this.title.textContent = this.titleText;

        this.details = document.createElement("p");
        this.details.classList.add("todo-details");
        this.details.textContent = this.detailsText;

        this.btnsContainer = document.createElement("div");
        this.btnsContainer.classList.add("todo-btns");

        this.stateChangeBtn = document.createElement("button");
        this.stateChangeBtn.classList.add("todo-state-change-btn");
        this.stateChangeBtn.addEventListener("click", () => {
            if (this.todo.getAttribute("data-state") === "active") {
                this.todo.setAttribute("data-state", "transfer");
                setTimeout(() => {
                    this.todo.setAttribute("data-state", "done");
                    todoListDone.append(this.todo);
                }, 750);
                return;
            }
            this.todo.setAttribute("data-state", "transfer");
            setTimeout(() => {
                this.todo.setAttribute("data-state", "active");
                todoListActive.append(this.todo);
            }, 750);
        });

        this.removeBtn = document.createElement("button");
        this.removeBtn.classList.add("todo-remove-btn");
        this.removeBtn.addEventListener("click", () => {
            this.todo.setAttribute("data-state", "removal");
            setTimeout(() => {
                this.todo.remove();
            }, 750);
        });

        this.priorityContainer = document.createElement("div");
        this.priorityContainer.classList.add("todo-priority");

        for (let i = 0; i < this.priority; i++) {
            const priorityIcon = document.createElement("div");
            priorityIcon.classList.add("todo-priority-icon");
            this.priorityContainer.append(priorityIcon);
        }

        this.btnsContainer.append(this.stateChangeBtn);
        this.btnsContainer.append(this.removeBtn);

        this.todo.append(this.title);
        this.todo.append(this.details);
        this.todo.append(this.btnsContainer);
        this.todo.append(this.priorityContainer);
    }

    #addToListActive() {
        todoListActive.append(this.todo);
    }
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const data = {
    tasks: [
        {
            title: "monolog",
            details: "napisac monolog na polski",
            priority: 2,
            status: "active",
        },
    ],
};

// download(JSON.stringify(data), "task-list.json", "type/json");

// TODO: safe task list to file wihout node.js

newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleText = document.querySelector("#new-todo-title").value;
    const detailsText = document.querySelector("#new-todo-details").value;

    function getPriorityLevel() {
        const btns = document.querySelectorAll("[data-new-todo-priority]");
        for (const btn of btns) {
            if (btn.checked === true) {
                const level = btn.getAttribute("data-new-todo-priority");
                return level;
            }
        }
    }

    const todo = new Todo(titleText, detailsText, getPriorityLevel());
});

let xd = xd + "dsds";
