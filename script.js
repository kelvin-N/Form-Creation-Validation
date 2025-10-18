// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage when the page loads
  loadTasks();

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      const li = document.createElement("li");
      li.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");

      removeButton.onclick = function () {
        taskList.removeChild(li);
        removeTask(taskText);
      };

      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }

  // Function to remove a task and update Local Storage
  function removeTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  // Create the addTask Function
  function addTask() {
    const taskText = taskInput.value.trim();

    // Check if taskText is empty
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create new li element
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Assign onclick event to remove button
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTask(taskText);
    };

    // Append remove button to li, then li to task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save to Local Storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    // Clear input field
    taskInput.value = "";
  }

  // Attach Event Listeners
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
