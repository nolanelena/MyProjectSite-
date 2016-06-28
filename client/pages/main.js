window.jQuery = window.$ = $;
require('bootstrap'); 

import homeMain from '/server/view.ejs';
import navbar from '/pages/templates/navbar.html';


var time = 600;

	var changeablesInterval = setInterval (function(){});

	function loopChangeables(el){

		var $imagesContainer = el;

		$imagesContainer.find('.is-changeable-item').each(function() {
			var $curImage = $(this);

			if( $curImage.css('opacity') == 1 ) {

				setTimeout(function(){
					
					$curImage.css('opacity', 0);
					if ( $curImage.next().length ) {
						$curImage.next().css('opacity', 1);
					} else {
						$imagesContainer.find('.is-changeable-item').first().css('opacity', 1);

					}	
				}, 0)

			}
			
		});

	}

	$('.is-changeable').on('mouseover', function(){

		var $imagesContainer = $(this);
		var numItems = $imagesContainer.find('.is-changeable-item').length;
		changeablesInterval = setInterval ( function() { 
			loopChangeables($imagesContainer); 
		}, time );


	})

	$('.is-changeable').on('mouseout', function(){
		if (typeof changeablesInterval != 'undefined') {
			clearInterval(changeablesInterval);
		}
	})



	/**
	 * ----------------------------------------------------------------------------------------
	 *    Isotope
	 * ----------------------------------------------------------------------------------------
	 */

	 var $isotopeContainer = $(".is-isotope");

	 $isotopeContainer.each(function(){

	 	var $this = $(this);

	 	var isotopeCols = $this.data('isotope-cols');

	 	function setIsotopeCols(){

	 		var windowWidth = window.innerWidth;

	 		if ( windowWidth <= 478 ) {
	 			if(typeof $this.data('isotope-cols-xs') != 'undefined') {
	 				isotopeCols = $this.data('isotope-cols-xs');
	 			} else {
	 				isotopeCols = 1;
	 			}
	 		}
	 		else if ( windowWidth <= 767 ) {

	 			if(typeof $this.data('isotope-cols-xs') != 'undefined') {
	 				isotopeCols = $this.data('isotope-cols-xs');
	 			} else if(typeof $this.data('isotope-cols-sm') != 'undefined') {
	 				isotopeCols = $this.data('isotope-cols-sm');
	 			} else if ( $this.data('isotope-cols') == 1){
	 				isotopeCols = 1;
	 			} else {
	 				isotopeCols = 2;
	 			}
	 		} else if ( windowWidth <= 992 ) {
	 			if(typeof $this.data('isotope-cols-sm') != 'undefined') {
	 				isotopeCols = $this.data('isotope-cols-sm');
	 			} else if ( $this.data('isotope-cols') > 1 ) {
	 				isotopeCols = $this.data('isotope-cols') - 1;
	 			} else {
	 				isotopeCols = $this.data('isotope-cols');
	 			}

	 		} else {
	 			if ( typeof $this.data('isotope-cols') == 'undefined' ) {
	 				isotopeCols = 3;
	 			} else {
	 				isotopeCols = $this.data('isotope-cols');
	 			}

	 		}

	 		if ( isotopeCols > 2 ) {

	 			$this.children().not('.isotope-item-width-2').css('width', $this.width() / isotopeCols - 1 + 'px' );
	 			$this.children('.isotope-item-width-2').css('width', ($this.width() / isotopeCols) * 2 - 2 + 'px' );
	 		} else {
	 			$this.children().css('width', $this.width() / isotopeCols - 1 + 'px' );
	 		}

	 		if( $this.data('isotope-square') == true ) {
	 			var itemsHeight = $this.children().not('.isotope-item-width-2').width();
	 			$this.children().css('height', itemsHeight + 'px' );
	 		}
	 		
	 		$this.find('.is-aspectratio').each(function(){
	 			var $el = $(this);
	 			var height = 0;
	 			var landscapeHeight = 0;

	 			if ( $el.hasClass('ar_4_3') ) {
	 				height = $el.width() / 1.333 ;
	 			}
	 			if ( $el.hasClass('ar_1_1') ) {
	 				height = $el.width();
	 			}
	 			if ( $el.hasClass('ar_3_2') ) {
	 				height = $el.width() / 1.5;
	 			}
	 			if ( $el.hasClass('ar_16_9') ) {
	 				height = $el.width() / 1.777;
	 			}
	 			if ( $el.hasClass('ar_3_1') ) {
	 				height = $el.width() / 3 ;
	 			}

	 			if ( $el.hasClass('ar_3_4') ) {
	 				height = $el.width() / 0.75;
	 			}
	 			if ( $el.hasClass('ar_2_3') ) {
	 				height = $el.width() / 0.666;
	 			}
	 			if ( $el.hasClass('ar_9_16') ) {
	 				height = $el.width() / 0.5625;
	 			}
	 			if ( $el.hasClass('ar_1_3') ) {
	 				height = $el.width() / 0.333;
	 			}

	 			// searches if there are landcape items
	 			landscapeHeight = $this.find('.is-autox-landscape').height();
	 			
	 			// checks if the current item is portrait
	 			if ( $el.hasClass('is-autox-portrait') ) {
	 				// if landscapeHeight is greater than 0, it means that there is at leaste one landscape image
	 				if ( landscapeHeight > 0 ) {
	 					$el.height(Math.floor(landscapeHeight*2 + $this.data('isotope-gutter')));	
	 				} else {
	 					$el.height(Math.floor(height));	
	 				}

	 			} else {
	 				$el.height(Math.floor(height));
	 			}

	 		})

			return isotopeCols;

		}


		function setIsotopeGutter(){

	 		// Set the Isotope width to be equal to the parent plus the number of columns in px because of the browser rounding bug

	 		$this.width($this.parent().width() + isotopeCols);

	 		if( typeof($this.data('isotope-gutter')) != "undefined" && $this.data('isotope-gutter') !== null && $this.data('isotope-gutter') != 0 ) {
	 			var itemGutter = $this.data('isotope-gutter');

	 			$this.css({
	 				'margin-top' : itemGutter + 'px'
	 			})

	 			$this.children().css({
	 				'margin-bottom' : itemGutter + 'px',
	 				'padding-left' : itemGutter + 'px',
	 				'overflow' : 'hidden'
	 			})

	 			$this.find('.is-aspectratio a').css({
	 				'left' : itemGutter + 'px'
	 			})

	 			$this.width($this.width() - itemGutter);

	 		}

	 	}

	 	setIsotopeGutter();

	 	var isotopeCols = setIsotopeCols();

		// Fires Layout when all images are loaded
		$this.imagesLoaded( function() {
			$this.show();

			// Isotope Init
			$this.isotope({
				transitionDuration: '0.2s',
				layoutMode: 'masonry',
				masonry: {
					columnWidth: $this.width() / isotopeCols - 1
				}
			});

			$window.trigger('throttledresize');
		});

		// Set the items width on resize
		$window.on('throttledresize', function (){

			setIsotopeGutter();
			var isotopeCols = setIsotopeCols();

			$this.isotope({
				transitionDuration: '0.2s',
				layoutMode: 'masonry',
				masonry: {
					columnWidth: $this.width() / isotopeCols - 1
				}
			});
			$this.isotope('layout');

		});

	}) // end isotope each



	/**
	* ----------------------------------------------------------------------------------------
	*    Isotope Filter
	* ----------------------------------------------------------------------------------------
	*/

	var items_per_page = null;

	var postid = $('.is-isotope-load-more').data('postid');

	var ajax_data = {
		action: '_action_inez_ajax_items_per_page',
		nonce: inez.nonce,
		postid: postid
	}

	if ( items_per_page == null ){
		$.ajax({
			type: 'POST',
			url: inez.ajaxurl,
			data: ajax_data,
			dataType: 'json',
			success: function(result){
				items_per_page = result;
			}
		})
	}

	function pressLoadMore($data_target){
		
		setTimeout(function(){
			if ( $('#' +  $data_target + ' > li:visible').size() < items_per_page && $('.is-isotope-load-more[data-target="' + $data_target + '"]:visible').length ) {
				$('.is-isotope-load-more[data-target="' + $data_target + '"]:visible').trigger('click');
				pressLoadMore();
			}
		}, 200)
		
	}

	$('.is-isotope-filter a').on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		var $data_target = $this.parents('.is-isotope-filter').data('target');
		var $target = $('#' +  $data_target);
		var selector = $this.attr('data-filter');
		$this.parents('.is-isotope-filter').find('.selected').removeClass('selected');
		$this.parent('li').addClass('selected');

		$target.isotope({ filter: selector });

		if ($('.is-isotope-load-more[data-target="' + $data_target + '"]').data('autopress') ) {
			// Press "Load More" button if shown thumbnails are less than items per page
			$target.on( 'arrangeComplete', function( event, filteredItems ) {
				if ( filteredItems.length < items_per_page ) {
					pressLoadMore($data_target);

				}
			});
		}
		

		


		return false;

	});