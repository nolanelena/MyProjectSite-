import $ from 'jquery';
import navbar from 'templates/navbar.html';


var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('header').append(navbar);
    app.bindEvents();
  },
  bindEvents: function(){
    $('.is-navmenu').find('.menu-item-has-children a').each(function(){
      var $this = $(this);
      if ($this.next().hasClass('sub-menu') ) {
        $this.append('<i class="fa fa-caret-down"></i>');
      }
    });
    $('.is-navmenu').find('.menu-item-has-children').each(function(){
      var $this = $(this);
      $this.addClass('not-visible');
    });

    var navHoverTimeout =setTimeout(function(){});

    $('.NavBar .menu-item-has-children > a').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      var $this = $(this);
      var $parent = $this.closest('li');
      navHoverTimeout = setTimeout(function(){  
        if ($parent.hasClass('not-visible')){
          $parent.removeClass('not-visible');
          $parent.addClass('is-visible');
          $parent.next().next().animate({
            opacity: 'show',
            height: 'show'
          }, 160);
        } 
        else if ($parent.hasClass('is-visible')){
          $parent.next().next().animate({
            opacity: 'hide',
            height: 'hide'
          }, 100, function(){
            $parent.removeClass('is-visible');
            $parent.addClass('not-visible');
          });
          clearTimeout(navHoverTimeout);
        }
      }, 10);
    });
  }
};
module.exports = app;

