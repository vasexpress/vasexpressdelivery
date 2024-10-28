/**
 * @file
 * Helper js for back to top button.
 */
 (function ($, Drupal) {
    $('.mod-toTop').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });
  })(jQuery, Drupal);
  