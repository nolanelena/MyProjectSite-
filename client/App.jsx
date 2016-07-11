import $ from 'jquery';
import 'styles/main.scss';
import TodoListView from 'pages/todoReact/todoListView';
import maven from 'pages/maven';
import funnySquares from 'pages/funnySquares';
import photoSearch from 'pages/photoSearch';
import backboneForms from 'pages/backboneForms';
import header from 'components/header';
import services from 'pages/services';

$(function(){

  header.init();


  // what page are we on?
  var url = window.location.pathname;

  // our first javascript router

  switch (url) {
    case '/pages/todo.html':
       var todoListView = new TodoListView();
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
    case '/pages/navbar.html':
      header.render();
    break;
    case '/pages/services.html':
        services.init();
    break;
    default: break;
  }
});
