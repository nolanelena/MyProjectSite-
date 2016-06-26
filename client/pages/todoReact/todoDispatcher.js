
import todoModel from 'pages/todoReact/todoModel';

var dispatcher = {
  clickComplete: function(id){
    todoModel.itemCompleted(id);
  },
  addTodo: function(title){
    if (
      title !== '' 
      && typeof title === 'string'
      ) { 
      todoModel.addItem(title);
    }
  },
  removeTodo: function(id){
    todoModel.removeItem(id);
  },
  editTodoTitle: function(id, title, event){
    if (
      event.which === 13 
      && typeof title === 'string'
      && title.length > 0
    ) {
     todoModel.editTitle(id, title);
   }
  },
  startEditMode: function(id){
    todoModel.startEditing(id);
  }
};

module.exports = dispatcher;
