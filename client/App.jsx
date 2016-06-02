
import $ from 'jquery';
import 'styles/main.scss'; 
import todos from 'pages/todo'; 
import maven from 'pages/maven';
import funnySquares from 'pages/funnySquares';
import header from 'components/header';

$(function(){

  header.init();


  // what page are we on?
  var url = window.location.pathname;

  // our first javascript router

  switch (url) {
    case '/pages/todo.html':
        todos.init();
    break;
    case '/pages/project.html':
  // init the project javascript
    break;
    case '/pages/funnySquares.html':
          funnySquares.init();
    break;

  }

});
