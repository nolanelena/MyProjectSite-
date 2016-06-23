
import $ from 'jquery';
import 'styles/main.scss';
import TodoControllerView from 'pages/todoReact/todoController';
// import todos from 'pages/todo-backbone'; 
import maven from 'pages/maven';
import funnySquares from 'pages/funnySquares';
import photoSearch from 'pages/photoSearch';
import backboneForms from 'pages/backboneForms';
import header from 'components/header';

$(function(){

  header.init();


  // what page are we on?
  var url = window.location.pathname;

  // our first javascript router

  switch (url) {
    case '/pages/todo.html':
       var todoControllerView = new TodoControllerView();
    break;
    case '/pages/project.html':
  // init the project javascript
    break;
    case '/pages/funnySquares.html':
          funnySquares.init();
    break;
    case '/pages/photoSearch.html':
          photoSearch.init();
    case '/pages/backboneForms.html':
      backboneForms.render();
    break;
    default: break;

  }

});
