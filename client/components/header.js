import $ from 'jquery';
import navbar from 'templates/navbar.html';

var $body = $('body');
var $window = $(window);

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('header').append(navbar);
    app.bindEvents();
  },
  bindEvents: function(){
    function scrollbarCheck() {

      var windowsize = $window.width();

      if (windowsize >= 752){
        $('.is-sidebar').perfectScrollbar({
        wheelSpeed: 1,
        suppressScrollX: true
      });

        } else {
          $('.is-sidebar').perfectScrollbar('destroy');
        }

    }

    setTimeout(function(){
    scrollbarCheck();
  }, 0);

    $(window).on('resize', function(){
    scrollbarCheck();
  });
  }
};

  $('.SideNav .menu-item-has-children > a').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    var $parent = $this.closest('li');
    navHoverTimeout = setTimeout(function(){  
      if ( $parent.hasClass('not-visible') ){
        $parent.removeClass('not-visible');
        $parent.addClass('is-visible');
        $parent.children('.sub-menu').animate({
          opacity: 'show',
          height: 'show'
        }, 160);
      } else if ( $parent.hasClass('is-visible') ){
        $parent.children('.sub-menu').animate({
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

module.exports = app;

