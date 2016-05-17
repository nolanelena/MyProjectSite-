
import $ from 'jquery';
import _ from 'underscore';
import rawTemplate from 'html!templates/funnySquare.html';
import Handlebars from 'Handlebars';

var template;
var app = {
  init: function(){
    template = Handlebars.compile(rawTemplate);
    app.render();
  },
  render: function(){
    // display 6 squares
    var numberOfSquares = 6;
    var renderedHtml = '';
    _.times(numberOfSquares, function(index){
      renderedHtml += template({ id: index + 1});
    });
    $('h1').after(renderedHtml);
  }
};

module.exports = app;

