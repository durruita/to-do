var nonImportantClass = "far fa-star";
var importantClass = "fas fa-star";
var isImportant = false;
var isFormVisible = true;

function toggleImportant() {
  console.log("icon clicked!");

  if (isImportant) {
    //non important
    isImportant = false;
    $("#iImportant").removeClass(importantClass);
    $("#iImportant").addClass(nonImportantClass);
  } else {
    $("#iImportant").removeClass(nonImportantClass);
    $("#iImportant").addClass(importantClass);
    isImportant = true;
  }
}
function toggleForm() {
  if(isFormVisible) {
    //hide
    isFormVisible = false;
    $("#form").hide();
  } 
  else {
    isFormVisible = true;
    $("#form").show();
  }
}

function saveTask() {
  console.log("task saved!");

  let title = $("#txtTitle").val();
  let date = $("#selDate").val();
  let contact = $("#txtContact").val();
  let location = $("#txtLocation").val();
  let desc = $("#txtDescription").val();
  let color = $("#selColor").val();

 

  // save the task
  //validate
  if (title.length < 5) {
    //show error
    alert("Title should be at least 1 character long");
    return;
  }
  if (!date) {
    alert("Due Date is required");
    return;
  }
let task = new Task(isImportant, title, date, contact, location, desc, color);
  console.log(task);

let dataStr = JSON.stringify(task);
  console.log(task);
  console.log(dataStr);

  $.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: dataStr,
    contentType: "application/json",
    
    sucess: function(data){
      console.log("Save results", data);
      let savedTask = JSON.parse(data);

      displayTask(savedTask);
    },
    error: function(error){
      console.log("Save Failed", error);
    }
  });


  //display
  displayTask(task);

  
}
// FINISH THIS
function clearForm() {
  $("#txtTitle").val("");
  $("#selDate").val("");
  $("#txtLocation").val("");
  $("#txtContact").val("");
  $("#selColor").val("#000000");
  $("#txtDescription").val("");

clearForm();
}

function displayTask(task) {
  // create the syntax
  let syntax = `<div id="${task._id}" class="task"> 
        <div>
          <h5>${task.title}</h5>
          <p>${task.description}</p>
        </div>

        <label class="date">${task.dueDate}</label>

        <div class="extra">
          <label class="location">${task.location}</label>
          <label class="contact">${task.contact}</label>
        </div>

        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>
    
    </div>`;

  //apppend the syntax to and element on the screen
  $("#task-list").append(syntax);
}

function deleteTask() {
  console.log("deleting task", id);
  $("#" + id).remove();
}

function clearData(){
  $.ajax({
    type: 'DELETE',
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/DerekCH26",
    sucess: () => {
      console.log("Data Cleared");
      $("#task-list").html("");
    },
    error: (details) => {
      console.log("Clear failed", details);
    }
  });
}



function retrieveTasks(){
  //https://restclass.azurewebsites.net/api/test
  $.ajax({
    type: "GET",
    url: "https://restclass.azurewebsites.net/api/task",
    sucess: (data) => {
      let list = JSON.parse(data);
      
      for(let i=0; i< list.length; i++){
        let task = list[i];
        if(task.name =="DerekCH26"){
          displayTask(task);
        }
      }
    },
    error: (error) => {
      console.log("Retrieve failed", error);
    }
  });
}

function init() {
  console.log("tasking...");

  //events
  $("#iImportant").click(toggleImportant);
  $("#btnToggleForm").click(toggleForm);
  $("#btnSave").click(saveTask);
  $("#")
  //load data
  retrieveTasks();
}
window.onload = init;
