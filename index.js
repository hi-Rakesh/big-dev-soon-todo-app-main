document.addEventListener("DOMContentLoaded", function () {
  const newTodoInput = document.getElementById("newTodoInput");
  const addTodoButton = document.getElementById("addTodoButton");
  const taskList = document.getElementById("taskList");
  const taskCounter = document.getElementById("taskCounter");
  const themeToggle = document.getElementById("themeToggle");
  const container = document.querySelector(".container");

  newTodoInput.addEventListener("input", function () {
    if (newTodoInput.value.trim() !== "") {
      addTodoButton.classList.remove("hidden");
    } else {
      addTodoButton.classList.add("hidden");
    }
  });

  addTodoButton.addEventListener("click", function () {
    const todoText = newTodoInput.value.trim();

    if (todoText !== "") {
      const todoItem = document.createElement("div");
      todoItem.className = "task-item";

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.className = "complete-checkbox";
      completeCheckbox.addEventListener("change", function () {
        todoTextElement.classList.toggle(
          "completed-task",
          completeCheckbox.checked
        );
        sortTasks();
        updateTaskCounter();
      });

      const todoTextElement = document.createElement("span");
      todoTextElement.innerText = todoText;

      const deleteIcon = document.createElement("img");
      deleteIcon.className = "delete-icon";
      deleteIcon.src = "assets/icons/close.svg";
      deleteIcon.alt = "Delete Icon";
      deleteIcon.addEventListener("click", function () {
        taskList.removeChild(todoItem);
        if (taskList.children.length === 0) {
          taskList.classList.add("empty-state");
          taskList.innerHTML = `
                        <img src="assets/icons/cactus.svg" alt="Empty State Image">
                        <p>There are no todos</p>
                    `;
          taskCounter.classList.add("hidden");
        }
        updateTaskCounter();
      });

      todoItem.appendChild(completeCheckbox);
      todoItem.appendChild(todoTextElement);
      todoItem.appendChild(deleteIcon);

      taskList.appendChild(todoItem);

      newTodoInput.value = "";
      addTodoButton.classList.add("hidden");

      if (taskList.classList.contains("empty-state")) {
        taskList.classList.remove("empty-state");
        taskList.innerHTML = "";
      }

      sortTasks();
      updateTaskCounter();
    }
  });

  function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const aCompleted = a.querySelector(".complete-checkbox").checked;
      const bCompleted = b.querySelector(".complete-checkbox").checked;

      if (aCompleted && !bCompleted) {
        return 1;
      } else if (!aCompleted && bCompleted) {
        return -1;
      } else {
        return 0;
      }
    });

    taskList.innerHTML = "";
    tasks.forEach((task) => taskList.appendChild(task));
  }

  function updateTaskCounter() {
    const totalTasks = taskList.children.length;
    const completedTasks = Array.from(taskList.children).filter(
      (task) => task.querySelector(".complete-checkbox").checked
    ).length;

    if (totalTasks > 0) {
      taskCounter.classList.remove("hidden");
      taskCounter.innerText = `${completedTasks}/${totalTasks} todos completed`;
    } else {
      taskCounter.classList.add("hidden");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
      body.setAttribute("data-theme", "light");
      themeToggle.src = "assets/icons/dark-mode.svg"; // Fix the typo here
    } else {
      body.setAttribute("data-theme", "dark");
      themeToggle.src = "assets/icons/light-mode.svg"; // Fix the typo here
    }
  });
});
