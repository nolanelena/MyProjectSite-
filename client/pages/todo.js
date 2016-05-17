
var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap'); 

import _ from 'underscore'; 
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'html!/templates/todoItem.html';

// var $ = require('jquery');

  
// Data Model
var savedData = lscache.get('todos'); // if you are declaring a value 
var todos;
if (savedData === null) {
  todos = [];
} else {
  todos = savedData;
}


// Application
var template;
var app = {
  init: function(){
    app.compileTemplates();
    app.render();
  },
  render: function(){
    // render the todos
    lscache.set('todos', todos);
    var todoHtml = _.map(todos, function(todo){
      return template(todo);
    });
    app.unbindEvents();
    $('ul.list-group').html(todoHtml.join(''));
    app.bindEvents();
  },
  compileTemplates: function(){
    template = Handlebars.compile(rawTemplate);
  },
  unbindEvents: function(){
    $('.list-group-item').off();
    $('.add-todo-container button').off();
    $('input[type="checkbox"]').off();
    $('list-group-item button').off();
    $('.title-edit input').off();
  },
  bindEvents: function(){
    app.bindHoverEvents();
    app.bindCheckboxEvents();
    app.bindAddTodoEvents();
    app.bindRemoveTodoEvents();
    app.bindEditTodoEvents();
  },    
  bindHoverEvents: function(){
    var $items = $('.list-group-item');
    $items.on('mouseover', function(){
      $(this).addClass('list-group-item-success');
    });
    $items.on('mouseout', function(){
      $(this).removeClass('list-group-item-success');
    });
  },
  bindCheckboxEvents: function(){
    var $checkboxes = $('input[type="checkbox"]');
    $checkboxes.on('change', function(){
      var wasChecked = $(this).is(':checked');
      if (!wasChecked) {
        $(this).parent().parent().removeClass('disabled');
      } else {
        $(this).parent().parent().addClass('disabled');
      }
    });
  },
 
   bindAddTodoEvents: function(){
    var $container = $('.add-todo-container');
    $container.find('button').on('click', function(){
      var newTodoTitle = $container.find('input').val();
      if (_.isString(newTodoTitle) && newTodoTitle.length > 2) {
        var newTodoObject = { 
          id: todos.length,
          title: newTodoTitle, 
          completed: false 
        };
        todos.push(newTodoObject);
        $container.find('input').val('');
        app.render(); 
      }
    });
  },
  bindRemoveTodoEvents: function(){
    $('.list-group-item button').on('click', function(){
      var index = $(this).parent().parent().index();
      todos.splice(index, 1);
      app.render();
    });
  },
  bindEditTodoEvents: function(){
    $('.title').on('click', function(){
      var $parent = $(this).parent();
      $parent.find('.title').addClass('hidden');
      $parent.find('.title-edit').removeClass('hidden');
    });
    $('.title-edit input').on('keypress', function(event){
      var key = event.which;
      // if they hit the enter key
      if (key === 13) {
        var newTitle = $(this).val();
        var editId = $(this).attr('data-id');
        editId = parseInt(editId, 10);
        // update the title in our model
        var editTodo = _.filter(todos, function(todo){
          if (todo.id === editId) {
            return true;
          }
          return false;
        });
        editTodo[0].title = newTitle;
        app.render();
      }
    });
  }
};

module.exports = app;


