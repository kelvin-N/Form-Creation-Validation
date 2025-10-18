// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // In-memory tasks array (single source of truth)
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Load tasks from Local Storage into the DOM
  loadTasks();

  // Function: loadTasks - reads from localStorage (via tasks) and populates the DOM
  function loadTasks() {
    // tasks already initialized from localStorage above
    tasks.forEach((taskText) => {
      addTask(taskText, false); // false => don't save again to Local Storage
    });
  }

  // Function: addTask
  // If taskText param is provided it will use that value; otherwise it reads from input.
  // save === true means update tasks array + localStorage.
  function addTask(taskTextParam, save = true) {
    const taskText = typeof taskTextParam === "string"
      ? taskTextParam.trim()
      : taskInput.value.trim();

    // Validate
    if (taskText === "") {
      // Only alert when user attempted to add via input/button (i.e., no param provided)
      if (taskTextParam === undefined) {
        alert("Please enter a task!");
      }
      return;
    }

    // Create list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // use classList.add as required

    // Remove handler: remove from DOM and update tasks + localStorage
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTask(taskText);
    };

    // Append and (optionally) save
    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = ""; // clear input only when user added
    }
  }

  // Function: removeTask - remove first matching occurrence and update localStorage
  function removeTask(taskText) {
    const index = tasks.indexOf(taskText);
    if (index > -1) {
      tasks.splice(index, 1); // remove one occurrence
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  // Attach Event Listeners
  addButton.addEventListener("click", function () {
    addTask(); // reads from input and saves
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
