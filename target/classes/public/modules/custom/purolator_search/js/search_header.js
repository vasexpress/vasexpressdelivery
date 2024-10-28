(function($) {
    'use strict';
    Drupal.behaviors.search_header = {
      attach: function (context, settings) {
        let searchHeaderForm = $('#general-search-header-form');
        let searchFormHandler = $('.block--header-search-block .header-search-trigger');
        let menuItem = $('.header-bottom .nav .nav-item .nav-link');
  
        // Toggle visibility of header search block
        function toggleSearchBlock(e) {
          searchHeaderForm.toggleClass('open show');
          searchFormHandler.find('span').toggleClass('d-none');
          searchFormHandler.attr('aria-expanded', function(index, attr){
            return attr == 'false' ? 'true' : 'false';
          });
          searchFormHandler.attr('aria-label', function(index, attr){
            return attr.indexOf('Open') != -1 ? attr.replace('Open', 'Close') : attr.replace('Close', 'Open');
          });
        }
  
        // Get click event outside search toggler or header search block.
        function getOutsideClick(evt) {
          if (searchHeaderForm.is(':visible') &&
            !$(evt.target).closest(searchHeaderForm).length &&
            !searchFormHandler.has($(evt.target)).length) {
            toggleSearchBlock();
            $(document).unbind('click', getOutsideClick);
          }
        }
        searchFormHandler.unbind('click');
        searchFormHandler.on('click', function(e) {
          e.preventDefault();
          toggleSearchBlock();
          if (searchHeaderForm.hasClass('show')) {
            $(document).on('click', getOutsideClick);
          }
          else {
            $(document).unbind('click', getOutsideClick);
          }
        });
        searchFormHandler.on('keydown', function(e) {
          if (e.which == 13 || e.which == 32) {
            e.preventDefault();
            toggleSearchBlock();
            if (searchHeaderForm.hasClass('show')) {
              $(document).on('click', getOutsideClick);
            }
            else {
              $(document).unbind('click', getOutsideClick);
            }
          }
        });
        searchHeaderForm.unbind('submit');
        searchHeaderForm.on('submit', function(e) {
          let searchHeaderFormInput = $('.form-item-search-content-header input');
          let searchValue = searchHeaderFormInput.val();
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'searchKeyword',
            'formKeyword': searchValue
          });
        });
  
        menuItem.unbind('click');
        menuItem.on('click', function(e) {
          if (searchHeaderForm.hasClass('show')) {
            toggleSearchBlock();
            $(document).unbind('click', getOutsideClick);
          }
        });
  
        $('.navbar-nav .dropdown-menu').each(function() {
          $(this).on('focusin', function() {
            searchHeaderForm.removeClass('open show');
            searchFormHandler.find('span.fa-times').addClass('d-none');
            searchFormHandler.find('span.fa-search').removeClass('d-none');
            searchFormHandler.attr('aria-expanded', 'false');
            searchFormHandler.attr('aria-label', function(index, attr){
              attr.replace('Open', 'Close');
            });
            $(document).unbind('click', getOutsideClick);
          });
        });
      }
    };
  })(jQuery);
  