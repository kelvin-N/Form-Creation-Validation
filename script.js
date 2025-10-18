// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

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
    removeButton.classList.add("remove-btn"); // ✅ uses classList.add

    // Assign onclick event to remove button
    removeButton.onclick = function () {
      taskList.removeChild(li);
    };

    // Append remove button to li, then li to task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

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
