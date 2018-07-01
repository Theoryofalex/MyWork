var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    

    this.todos.forEach(function (todo) {
     // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
      todo.completed = false;
     // Case 2 : Otherwise, make everything true.
      } else {
       todo.completed = true;
     }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    //var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(position);
    //deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    // in this code refractor. We can see we're passing in two arguements. todo = each item in the array, and the position.
      // we used i (on line 93) which was priviously a variable in the for loop.
    // this and the second argument to the callback is needed because, the callback function is not the function in the view object(NOT A METHOD)
      //therefore, 'this' in the callback function is not going to be equal to the view object.
        // In order to make the 'this' equal to the view object, 'this' has to be passed as a second argument next to the callback.
    todoList.todos.forEach(function(todo, position) {
      for (var i = 0; i < todoList.todos.length; i++) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';

        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
      
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
      }
    }, this)
  },
  
  createDeleteButton: function() {
                 // REQUIRMENTS:
  // there should be a way to create delete buttons CHECK 4 lines of code; (HINT: 2 properties, and a return statement)
  // there should be a delete button for each todo CHECK 1 line of code; (HINT: append the button to todoLi) ** becuase you appended the button as a chilld of the li, which is a child of the UL - it's a double nested f.
  // Each li should have an id that has the todo position CHECK 1 line of code; (HINT: use the displayTodos code, and utilize the already given for loop to acces the element i); like .calssName .id is a property
  // delete buttons should have access to the todo id CHECK 3 lines of code; (HINT: You want to have access, and add an event listener to just th unordered List) **get a reference**
  // clicking delete should update todoList.todos and the DOM (HINT: get the element that was clicked-create a new variable and set it(look for the event trigger), THEN check if elementClicked is a 'deleteButton'---conditional statement(and check the statement with a property))
  // UPDATE the deleteTodo logic. Get rid of the button, and the code referencing the button. 2 lines of code should be left. (HINT: the deleteTodo f (handlers object) needs a parameter passed in, as well as, a argument in the todoList.deleteTodo f. )
    // Finally, run the handers.deleteTodo. WITH the position. 1 line of code. (HINT: the position is the ID of the Li element. you need to gain acces to the id with a property.) THEN remember the delete handlers needs a number not a 'string'.
  // Refractor the code. (HINT: update the createDeleteButton with the the recent EventListener code) THEN call the setUpEventListeners method.
    
    
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
    var elementClicked = event.target;
    
      if (elementClicked.className === 'deleteButton') {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        
      }
    });
  }
};

view.setUpEventListeners();
  
  









