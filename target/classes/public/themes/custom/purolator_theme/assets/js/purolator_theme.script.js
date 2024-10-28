/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/purolator_theme.script.js":
/*!******************************************!*\
  !*** ./src/js/purolator_theme.script.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

    (function ($, Drupal) {
        'use strict';
      
        Drupal.behaviors.de_themeAccessibilityFix = {
          attach: function attach(context, settings) {
            jQuery('body').on('chosen:ready', function (evt, params) {
              jQuery('.js-form-item.js-form-type-select', context).each(function (index, element) {
                jQuery(this).find('.chosen-container-multi input.chosen-search-input').attr('aria-label', jQuery.trim(jQuery(this).find('label').text()));
                jQuery(this).find('.chosen-container-single input.chosen-search-input').attr('aria-label', jQuery.trim(jQuery(this).find('label').text()));
              });
            });
            $('table tbody > tr:first-child th').each(function () {
              $(this).attr('scope', 'col');
            });
            $('table tbody > tr:not(:first-child) th').each(function () {
              $(this).attr('scope', 'row');
            });
          }
        }; // Define collapsed menu on load
      
        $('.navbar-nav .nav-item.dropdown > .dropdown-toggle > a').attr('aria-expanded', 'false');
        Drupal.behaviors.main_menu_accessibility = {
          attach: function attach(context) {
            // Attach keyboard functionality
            $('.navbar-nav').each(function () {
              keyboardActions($(this));
            }); // Toggle aria-expanded on top lvl items
      
            $('.navbar-nav .nav-item.dropdown > .dropdown-toggle > a').on('click', function () {
              $(this).attr('aria-expanded', function (index, attr) {
                return attr == 'false' ? 'true' : 'false';
              });
            }).on('keydown', function (e) {
              if (e.which == 13 || e.which == 32) {
                $(this).attr('aria-expanded', function (index, attr) {
                  return attr == 'false' ? 'true' : 'false';
                });
              }
            }); // Show sub menu when recieves focus
      
            $('.navbar-nav .dropdown-menu').on('focusin', function () {
              $(this).addClass('show');
              $(this).closest('li').addClass('show');
              $(this).prev().find('a').attr('aria-expanded', 'true');
            }).on('focusout', function () {
              $(this).removeClass('show');
              $(this).closest('li').removeClass('show');
              $(this).prev().find('a').attr('aria-expanded', 'false');
            });
      
            function keyboardActions(elm) {
              // ==== Escape key functionality
              $('.navbar-nav').find('a').on('focusin', function () {
                $(this).on('keydown', function (e) {
                  if (e.which == 27) {
                    $(this).closest('.dropdown-menu').prev().find('a').focus();
                  }
                });
              }); // ==== Arrow key functionality
      
              var list = $(elm).children('li');
              var li_first = list[0];
              var li_last = list[list.length - 1];
              list.find('.dropdown-toggle > a').on('keydown', function (e) {
                var active = e.target.parentElement.parentElement; // ==== Right arrow
      
                if (e.which === 39) {
                  // Move focus to next item
                  $(this).parents('li').next().find('.dropdown-toggle > a').focus(); // ===== forward from last
      
                  if (active === li_last) {
                    $(li_first).find('.dropdown-toggle > a').focus();
                  }
                } // ===== Left arrow
                else if (e.which === 37) {
                    $(this).parents('li').prev().find('.dropdown-toggle > a').focus(); // ===== back from first
      
                    if (active === li_first) {
                      $(li_last).find('.dropdown-toggle > a').focus();
                    }
                  } // ===== Down arrow
                  else if (e.which === 40 && $(this).parents('li').hasClass('dropdown')) {
                      var subMenuFirst = $(this).parent('.dropdown-toggle').next().find('> li:first-child a');
                      subMenuFirst[0].focus();
                      e.preventDefault();
                    }
              });
            }
          }
        };
        Drupal.behaviors.purolator_components = {
          attach: function attach(context, settings) {
            $(".dropdown-toggle").dropdown(); // ===== Front page arrow scroll
      
            $('.scroll-arrow').on('click', function (e) {
              scrollTo($('.page--full .brick'));
            });
            /******************************
            * Scroll to
            ******************************/
      
            function scrollTo(element) {
              var offset = $(element).offset().top; // ==== msobile header
      
              if ($(window).width() < 991) {
                var headerHeight = $(".header-top").outerHeight() + 20;
              } // ==== full header
              else {
                  var headerHeight = $(".header-bottom").outerHeight() + 20;
                }
      
              $('html, body').animate({
                scrollTop: eval(offset - headerHeight)
              }, 200);
            }
      
            ssm.addState({
              id: 'medium-screen-max',
              query: '(max-width: 991px)',
              onEnter: function onEnter() {
                $('.header-bottom').removeClass('show');
                $('.navbar-toggler').on('click', function () {
                  // Make user scroll menu not page
                  $('html').toggleClass('no-scroll'); // header top height
      
                  var headerHeight = $('.header-top').outerHeight(); // Header top position
      
                  var headerPosition = $('.header-top').position().top + headerHeight; // header bottom height
      
                  var menuOffset = $(window).height() - headerHeight;
                  $('.header-bottom').css({
                    'max-height': menuOffset,
                    'height': menuOffset,
                    'top': headerPosition
                  });
                }); // ==== Scroll to opening menu item
      
                $(".dropdown-toggle").on('click', function (element) {
                  // ==== Opening closed item
                  if ($(this).attr('aria-expanded') == 'true') {
                    // Reset scroll height
                    $('.header-bottom').animate({
                      scrollTop: 0
                    }, 0);
                    var position = $(element.target).position().top; // var fixedMenuItemHeight = $(".header-top").outerHeight() + 20;
                    // Scroll to the anchor with the menu height as an offset
      
                    $('.header-bottom').animate({
                      scrollTop: position
                    }, 200);
                  } // Closing open item
                  else {
                      // Scroll to top
                      $('.header-bottom').animate({
                        scrollTop: 0
                      }, 200);
                    }
                });
              },
              onLeave: function onLeave() {
                $('html').removeClass('no-scroll');
      
                if ($('.header-bottom').hasClass('show')) {
                  // fake a close menu click when entering large screen
                  $('.navbar-toggler').click();
                  $('.navbar-toggler').unbind();
                } // Reset menu styles
      
      
                $('.header-bottom').css({
                  'max-height': 'unset',
                  'height': 'auto',
                  'top': 'unset'
                });
              }
            });
            $('.video-embed-field-lazy-modal .video-embed-field-lazy-play', context).once().each(function () {
              $(this).click(function (e) {
                //Get Embedded Video HTML
                var $html = $(this).parent().attr('data-video-embed-field-lazy'); //Set Modal Body to embedded video HTML
      
                $(this).parent().parent().find('.modal-body').html($html);
              });
            }); //Functionality for accessibile slider
      
            $('.btn-slider').each(function () {
              $(this).click(function (e) {
                //Toggle carousel functionality
                if ($(this).hasClass('pause')) {
                  $('#' + $(this).attr('data-slider')).carousel('pause');
                  $(this).parent().attr('aria-live', 'polite');
                  $(this).attr('aria-label', Drupal.t('Start autoplaying of carousel'));
                } else {
                  $('#' + $(this).attr('data-slider')).carousel('cycle');
                  $(this).parent().attr('aria-live', 'off');
                  $(this).attr('aria-label', Drupal.t('Stop autoplaying of carousel'));
                }
      
                $(this).toggleClass('pause fa-play fa-pause');
              });
            }); // $('.block-type-alert').on('click', function(){
            //   $('body').removeClass('has-alert');
            // });
          }
        };
        $('table').stacktable();
      })(jQuery, Drupal);
      
      /***/ }),
      
      /***/ "./src/sass/purolator_theme.style.scss":
      /*!*********************************************!*\
        !*** ./src/sass/purolator_theme.style.scss ***!
        \*********************************************/
      /*! no static exports found */
      /***/ (function(module, exports) {
      
      // removed by extract-text-webpack-plugin
      
      /***/ }),
      
      /***/ 0:
      /*!**************************************************************************************!*\
        !*** multi ./src/js/purolator_theme.script.js ./src/sass/purolator_theme.style.scss ***!
        \**************************************************************************************/
      /*! no static exports found */
      /***/ (function(module, exports, __webpack_require__) {
      
      __webpack_require__(/*! /Users/admin/Sites/purolator/docroot/themes/custom/purolator_theme/src/js/purolator_theme.script.js */"./src/js/purolator_theme.script.js");
      module.exports = __webpack_require__(/*! /Users/admin/Sites/purolator/docroot/themes/custom/purolator_theme/src/sass/purolator_theme.style.scss */"./src/sass/purolator_theme.style.scss");
      
      
      /***/ })
      
      /******/ });