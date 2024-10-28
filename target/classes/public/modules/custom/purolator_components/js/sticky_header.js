/**
 * @file
 * Helper js for displaying header nav small logo.
 */
 (function ($, Drupal) {
    var body = $('body');
    var header_sticky = $('.header-bottom');
    var header_init_pos = header_sticky.offset().top;
  
    // Helper function to apply sticky class when necessary.
    function applyStickyClass(el){
      let init_top = header_init_pos - $(window).scrollTop();
      let is_stuck = (el.is(':visible') && init_top <= 0 ) ? true : false;
  
      body.toggleClass('sticky', is_stuck);
      el.toggleClass('is-sticky done-scroll', is_stuck);
      el.find('.logo-small').toggleClass('sticky d-block', is_stuck);
    }
  
    ssm.addState({
      id: 'large-screen',
        query: '(min-width: 992px)',
        onEnter: function() {
          header_init_pos = header_sticky.offset().top;
  
          var isScrolling;
  
          $(window).on('scroll', function(){
            applyStickyClass(header_sticky);
          });
  
          // Remove sticky from header top
          stickybits('.header-top').cleanup();
        },
        onLeave: function() {
          $(window).unbind('scroll');
          // Remove sticky from header bottom
          stickybits(header_sticky).cleanup();
          $('.logo-small').removeClass('sticky d-block');
        }
      });
  
      $(window).resize();
      $(window).scroll();
  
      $('.navbar-toggler').on('click', function() {
        header_sticky.toggleClass('show-mobile-menu');
      });
  
  })(jQuery, Drupal);
  
  // /**
  //  * @file
  //  * Helper js for displaying header nav small logo.
  //  */
  // (function ($, Drupal) {
  //   var main_header = $('nav.navbar');
  //   var header_sticky = $('.header-bottom');
  //   var header_init_pos = header_sticky.offset().top;
  
  //   // Helper function to apply sticky class when necessary.
  //   function applyStickyClass(el){
  //     let init_top = header_init_pos - $(window).scrollTop();
  //     let is_stuck = (el.is(':visible') && init_top <= 0 ) ? true : false;
  
  //     el.toggleClass('position-fixed', is_stuck);
  //     el.toggleClass('fixed-top', is_stuck);
  //     // el.toggleClass('container', is_stuck);
  //     el.find('.logo-small').toggleClass('sticky d-block', is_stuck);
  //   }
  
  //   ssm.addState({
  //     id: 'large-screen',
  //       query: '(min-width: 992px)',
  //       onEnter: function() {
  //         header_sticky.removeClass('sticky-top');
  //         header_init_pos = header_sticky.offset().top;
  //         if (typeof CSS !== "undefined" && CSS.supports && CSS.supports('position', 'sticky')) {
  //           applyStickyClass(header_sticky);
  
  //           $(window).on('scroll', function(){
  //             applyStickyClass(header_sticky);
  //           });
  //         }
  //       },
  //       onLeave: function() {
  //         header_sticky.addClass('sticky-top');
  //         $(window).unbind('scroll');
  //       }
  //     });
  
  
  //   $('.navbar-toggler').on('click', function() {
  //     header_sticky.toggleClass('show-mobile-menu');
  //   });
  
  // })(jQuery, Drupal);
  