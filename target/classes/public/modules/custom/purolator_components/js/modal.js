/**
 * @file
 * Javasceipt to allow deeplinking to inside of components.
 */
 (function ($, Drupal) {
    Drupal.behaviors.purolatorTheme = {
      attach: function (context) {
        $('a.modal-link').off('click').on('click',function(e) {
          // Prevent default anchor behaviour
          e.preventDefault();
          // Determine modal to toggle, and make sure it exists on the page
          var modalID = $(this).attr('href');
          if ((typeof modalID === 'string' || modalID instanceof String) && $(modalID).length) {
            $(modalID).modal('toggle');
            $(modalID)
          }
        });
  
        $('.modal button.close').on('click',function(e) {
          var modalID = $(this).closest('.modal').attr('id');
          $('a[href="#' + modalID + '"]').first().focus();
        });
      }
    };
  })(jQuery, Drupal);
  