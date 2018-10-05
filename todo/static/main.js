var API_URL = "http://127.0.0.1:8000";

var container = $("#todo-container");
var todoListData = [];

refreshListFromServer();

function fetchAllTodos() {
  return axios({
    method: "GET",
    url: API_URL + "/todos/",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function refreshListFromServer() {
  fetchAllTodos().then(function(response) {
    todoListData = response.data;
    renderTodos();
  });
}

$(window).click(unHighlightAllTodos);
$("button#add").click(addTodo);
container.click(function(e) {
  e.stopPropagation(); // to prevent this from triggering the global click listener
});

function renderTodos() {
  container.html("");
  if (todoListData && todoListData.length > 0) {
    todoListData.forEach(function(todoData, index) {
      var newTodo = $('<li class="todo"></li>');
      var checkbox = $('<input class="checkbox" type="checkbox"/>');
      var deleteButton = $(
        '<button class="delete"><i class="fa fa-trash"></i></button>'
      );
      if (todoData.checked) {
        checkbox.attr("checked", true);
      }
      var input;
      newTodo.append(checkbox);
      if (todoData.highlighted) {
        input = $('<input class="todo-name" value="' + todoData.name + '"/>');
        input.on("keydown", onKeyDown);
        newTodo.append(input);
      } else {
        var label = $("<label>" + todoData.name + "</value>");
        newTodo.append(label);
        label.click(function() {
          highlightTodo(index);
        });
      }

      newTodo.append(deleteButton);
      deleteButton.click(function() {
        deleteTodo(index);
      });
      checkbox.click(function() {
        checkTodo(index);
      });

      container.append(newTodo);
      if (input) {
        input.focus();
      }
    });
  } else {
    let noTodosMessage = $(
      '<p id="no-todos">There are no todos one. <br/>Get started by adding one now!</p>'
    );
    container.append(noTodosMessage);
  }
}

function checkTodo(index) {
  todoListData[index].checked = !todoListData[index].checked;
  apiUpdateTodo(index);
  renderTodos();
}

function deleteTodo(index) {
  apiDeleteTodo(index);
  todoListData.splice(index, 1);

  renderTodos();
}

function highlightTodo(index) {
  if (todoListData.highlighted) {
    return;
  }
  todoListData[index].highlighted = true;
  renderTodos();
}

function unHighlightAllTodos() {
  console.log("here");
  todoListData.forEach(function(todoData, index) {
    if (todoData.highlighted) {
      apiUpdateTodo(index);
      var value = $(".todo")
        .eq(index)
        .find(".todo-name")
        .first()
        .val();
      todoListData[index].name = value;
    }
    todoData.highlighted = false;
    setTimeout(renderTodos, 100);
  });
}

function addTodo() {
  apiCreateTodo(refreshListFromServer);
}

function onServerError() {
  refreshListFromServer();
  alert("Autch! The last operation didn't work! Please try again.");
}

function apiUpdateTodo(index) {
  var id = todoListData[index].id;
  axios({
    method: "PUT",
    url: API_URL + "/todos/" + id + "/",
    headers: {
      "Content-Type": "application/json",
    },
    data: todoListData[index],
  }).then(function() {}, onServerError);
}

function apiDeleteTodo(index) {
  var id = todoListData[index].id;
  axios({
    method: "DELETE",
    url: API_URL + "/todos/" + id + "/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function() {}, onServerError);
}
function apiCreateTodo(callback) {
  axios({
    method: "POST",
    url: API_URL + "/todos/",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      checked: false,
      name: "New Todo",
    },
  }).then(callback, onServerError);
}

function onKeyDown(e) {
  if (e.keyCode === 13) {
    unHighlightAllTodos();
  }
}
