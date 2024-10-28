/**
 * @file
 * Javasceipt to allow deeplinking to inside of components.
 */
 (function ($, Drupal) {
    $(document).ready(function(){
      $('.modal').on('hide.bs.modal', function (e) {
        var player = $(e.target).find('iframe');
        if (player.length && player.attr('src').indexOf('youtube')) {
          player.remove();
        }
        });
    });
  })(jQuery, Drupal);