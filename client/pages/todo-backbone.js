var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap'); 

import _ from 'underscore'; 
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html';


// Backbone Todo App 

var TodoModel;
var TodoControllerView;
var TodoView;

var todoModel;
var TodoControllerView;


// Model

TodoModel = Backbone.Model.extend({
  defaults: {
    
  },
  fetch: function(){
    // gets the data
  },
  save: function(){
    // saves the data 
  }
});

todoModel = new TodoModel();

// View 

TodoControllerView = Backbone.View.extend({
  el: 'body',
  model: todoModel,
  events: {
  },
  initialize: function(){},
  render: function(){
    alert('backbone!');
  }
});

todoControllerView = new TodoControllerView(); // it calls ViewClass.initialize

module.exports = todoControllerView;
