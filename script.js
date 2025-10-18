// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // In-memory tasks array (single source of truth)
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Load tasks from Local Storage and populate the DOM
  loadTasks();

  // Create the addTask Function
  // If taskText is provided, it will use that; otherwise it reads the input field.
  // save === false prevents saving to Local Storage (used when loading existing tasks).
  function addTask(taskTextParam, save = true) {
    const taskText = (typeof taskTextParam === "string")
      ? taskTextParam.trim()
      : taskInput.value.trim();

    // Check if taskText is empty
    if (taskText === "") {
      if (!taskTextParam) { // only alert when user tried to add via input/button
        alert("Please enter a task!");
      }
      return;
    }

    // Create new li element
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // uses classList.add as required

    // Assign onclick event to remove button
    removeButton.onclick = function () {
      // Remove li from DOM
      taskList.removeChild(li);

      // Remove one occurrence of this task from the tasks array and update Local Storage
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1); // remove only the first matching occurrence
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    };

    // Append remove button to li, then li to task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // If this call should persist the task, update array & Local Storage
    if (save) {
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      // Clear input field only when user added via input
      taskInput.value = "";
    } else {
      // When loading from storage, don't clear input (there's no user input)
    }
  }

  // Load tasks from Local Storage into the DOM
  function loadTasks() {
    // tasks is already initialized from localStorage at top
    tasks.forEach((task) => addTask(task, false)); // false prevents double-saving
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
