window.jQuery = window.$ = $;
require('bootstrap'); 

import $ from 'jQuery'; 
import lscache from 'lscache';
import services from 'templates/services.html';
import 'jquery-ui';

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('.ui-accordion').accordion();
  }
};
module.exports = app;
