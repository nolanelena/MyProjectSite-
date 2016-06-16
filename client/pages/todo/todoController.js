var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap'); 

import _ from 'underscore'; 
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import todoModel from 'pages/todo/todoView'
import TodoControllerView from "pages/todo/todoView"

var TodoControllerView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },

initialize: function(todo){
    this.model.fetch();
    this.model.on('change', this.render, this);
  },
  render: function(){
    this.$el.html(this.template(this.data));
    this.$title = this.$el.find('.title');
    this.$titleEdit = this.$el.find('.title-edit');
    this.$titleInput = this.$titleEdit.find('.title-edit-input');
    this.$el.toggleClass('disabled', this.data.completed);
  },
  removeItem: function(){
    // get the id of the current item
    todoControllerView.removeItem(this.data.id);
  },
  completedClicked: function(event){
    var isChecked = $(event.currentTarget).is(':checked');
    todoControllerView.itemCompleted(this.data.id, isChecked);
  },
  titleClicked: function(){
    this.$title.addClass('hidden');
    this.$titleEdit.removeClass('hidden');
    this.$titleInput.focus();
  },
  titleEditConfirm: function(event){
    if (event.which === 13) {
      var newTitle = this.$titleInput.val();
      todoControllerView.titleEdit(newTitle, this.data.id);
    }
  }
});

var todoControllerView = new TodoControllerView(); // it calls ViewClass.initialize

module.exports = todoControllerView;
