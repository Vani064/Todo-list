var TodoListApp = (function () {
    var tasks = [];
    const tasksList = document.getElementById("list");
    const addTaskInput = document.getElementById("add");
    const tasksCounter = document.getElementById("tasks-counter");
     var a =25;
    console.log("Working");
  
    async function fetchToDos() {
      //    GET REQUEST fetch('https://jsonplaceholder.typicode.com/todos')
      //    .then(function(response)
      //    {
      //     console.log(response);
      //     return response.json();
      //    }).then(function(data){
      //        tasks = data.slice(0,10);
      //        renderList();
      //     //console.log(data);
      //    }).catch(function(error){
      //     console.log('error',error);
      //    });
  
      //async await method
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderList();
      } catch (error) {
        console.log(error);
      }
    }
  
    function addtasktoDOM(task) {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" id="${task.id}" data-id="${
        task.id
      }" ${task.completed ? "checked" : ""}  class="custom-checkbox" >
      <label for="${task.id}">${task.title}</label>
      <img src="trash.svg" class="delete" data-id="${task.id}" />
    `;
  
      tasksList.append(li);
    }
  
    function renderList() {
      tasksList.innerHTML = "";
  
      for (var i = 0; i < tasks.length; i++) {
        addtasktoDOM(tasks[i]);
      }
  
      tasksCounter.innerText = tasks.length;
    }
  
    function markTaskAsComplete(taskId) {
      console.log(taskId);
      const newtask = tasks.filter(function (task) {
        return task.id == taskId;
      });
  
      if (newtask.length > 0) {
        var currtask = newtask[0];
        currtask.completed = !currtask.completed;
        renderList();
        return;
      }
      showNotification("task could not be completed");
    }
  
    function deleteTask(taskId) {
      var newTasks = tasks.filter(function (task) {
        return task.id != taskId;
      });
  
      tasks = newTasks;
      renderList();
    }
  
    function addTask(task) {
      //POST REQUEST
  
      // if(task){
      // fetch('https://jsonplaceholder.typicode.com/todos' ,{  method: 'POST',
      // //Copied from using fetch web api- uplaoding json input
      // headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(task),
      // })
      //    .then(function(response)
      //    {
      //     console.log(response);
      //     return response.json();
      //    }).then(function(data){
      //        console.log(data);
      //        tasks.push(task);
      //        renderList();
      //     //console.log(data);
      //    }).catch(function(error){
      //     console.log('error',error);
      //    });
      //    return;
      // }
  
      if (task) {
        tasks.push(task);
        renderList();
        return;
      }
  
      showNotification("Text cannot be added successfully");
    }
  
    function showNotification(text) {
      alert(text);
    }
  
    function handleInputkeypress(e) {
      if (e.key == "Enter") {
        const text = e.target.value;
        console.log("text", text);
        if (text == "") {
          showNotification("Task cannot be empty.");
          return;
        }
  
        const task = {
          title: text,
          id: Date.now(),
          completed: false,
        };
        e.target.value = " ";
        addTask(task);
      }
    }
  
    function handleclickevent(e) {
      const target = e.target;
      if (target.className == "delete") {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
      } else if (target.className == "custom-checkbox") {
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
      }
    }
  
    function initializetask() {
      //fetchToDos();
      addTaskInput.addEventListener("keyup", handleInputkeypress);
      document.addEventListener("click", handleclickevent);
    }
    return{
        initialize: initializetask,
        a: a,
    }
  })();
  