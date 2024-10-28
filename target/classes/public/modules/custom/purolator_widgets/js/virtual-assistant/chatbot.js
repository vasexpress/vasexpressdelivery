//Variables for Virtual Assistant Pop up/DropIn UI setup
var dropinTitle;
var dropinSrc;
var param = '';
var appContainer = document.querySelector('section[data-apps="tracker"');

//Used for DropIn UI setup
var typeParamPin;
var typeParamCategory;
var typeParamCampaign;
const categoryTypes = [ "Address-Correction","tracking-general","file-a-claim","generalbilling","notifications","location","billing-invoice-inquiries","tech-support","international-inquiries","schedule-pickup","residential-schedule-pickup","sales" ];

//Hook to open Virtual Assistant pop up
//1. Function to check if browser is IE 11 or below
function isIE() {
  var userAgentString = window.navigator.userAgent;
  var msie = userAgentString.indexOf('MSIE ');
  var trident = userAgentString.indexOf('Trident/');

  return (msie > 0 || trident > 0);
}

//1a. Function to check if page language is french
function langCheck() {
  if (document.documentElement.lang === "fr" || window.location.pathname.indexOf('/fr') != -1) {
    return true;
  } else {
    return false;
  }
}

//1b. Function to check Environment
function enviromentCheck() {
  if (window.location.hostname.search(/(dev|stg|certeshiponline).purolator.com/)  != -1 || window.location.hostname == "localhost") {
    return true;
  } else {
    return false;
  }
}

//1c. Santize parameters from URL (Security patch for XSS exploits)
function sanitize(str) {
  return str.replace(/[^\w.,;-\s]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}

//2. Build <div id="chat"></div> on load so both setups can bind/initialize to it
//   Check if isIE() function returns true on initialization
window.onload = function() {

  var chatDiv = document.createElement('div')
  chatDiv.setAttribute('id', 'chat');
  document.body.appendChild(chatDiv);

  if (isIE() || window.matchMedia('(max-width: 992px)').matches == true) {
    document.getElementById('chat').innerHTML = "<img style=\"position: fixed; bottom: 30px; right: 30px; cursor: pointer; z-index: 99;\" class=\"dropIndropInIconDefault_3iHSx\" src=\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA2MyA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzEuNSIgY3k9IjMxLjUiIHI9IjMxIiBmaWxsPSIjMDAxOTk2IiBzdHJva2U9IiMxRjQwOEYiLz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xMDMxXzU1NjEpIj4KPHBhdGggZD0iTTQ0IDE3SDIwQzE3Ljc5NjkgMTcgMTYgMTguNzk2OSAxNiAyMC45NDM3VjM4Ljg4NzVDMTYgNDEuMDkwNiAxNy43OTY5IDQyLjgzMTIgMjAgNDIuODMxMkgyNlY0OC4wMjVDMjYgNDguNjM0NCAyNi43MDMxIDQ4Ljk5MDYgMjcuMTk1IDQ4LjYzMTNMMzUuMDAxMiA0Mi43NzVINDQuMDAxMkM0Ni4yMDQ0IDQyLjc3NSA0OC4wMDEyIDQwLjk3ODEgNDguMDAxMiAzOC44MzEyVjIwLjk0MzdDNDggMTguNzk2OSA0Ni4yNTYyIDE3IDQ0IDE3Wk0zMi41NTYyIDM1SDI1LjU1NjJDMjQuNzMxMiAzNSAyNC4wNTYyIDM0LjMzMTIgMjQuMDU2MiAzMy41QzI0LjA1NjIgMzIuNjY4NyAyNC43MzEyIDMyIDI1LjU1NjIgMzJIMzIuNTU2MkMzMy4zODc1IDMyIDM0LjA1NjIgMzIuNjc1IDM0LjA1NjIgMzMuNUMzNC4wNTYyIDM0LjMyNSAzMy4zODc1IDM1IDMyLjU1NjIgMzVaTTM4LjU1NjIgMjlIMjUuNTU2MkMyNC43MzEyIDI5IDI0LjA1NjIgMjguMzMxMyAyNC4wNTYyIDI3LjVDMjQuMDU2MiAyNi42Njg3IDI0LjczMTIgMjYgMjUuNTU2MiAyNkgzOC41NTYyQzM5LjM4NzUgMjYgNDAuMDU2MiAyNi42NzUgNDAuMDU2MiAyNy41QzQwLjA1NjIgMjguMzI1IDM5LjM4NzUgMjkgMzguNTU2MiAyOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8xMDMxXzU1NjEiIHg9IjEyIiB5PSIxNyIgd2lkdGg9IjQwLjAwMTIiIGhlaWdodD0iMzkuNzc1NCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSI0Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTAzMV81NTYxIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzEwMzFfNTU2MSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K\" onmouseover=\"this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA2MyA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzEuNSIgY3k9IjMxLjUiIHI9IjMxIiBmaWxsPSIjMDAxMzcxIiBzdHJva2U9IiMxRjQwOEYiLz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xMDMxXzU1NjQpIj4KPHBhdGggZD0iTTQ0IDE3SDIwQzE3Ljc5NjkgMTcgMTYgMTguNzk2OSAxNiAyMC45NDM3VjM4Ljg4NzVDMTYgNDEuMDkwNiAxNy43OTY5IDQyLjgzMTIgMjAgNDIuODMxMkgyNlY0OC4wMjVDMjYgNDguNjM0NCAyNi43MDMxIDQ4Ljk5MDYgMjcuMTk1IDQ4LjYzMTNMMzUuMDAxMiA0Mi43NzVINDQuMDAxMkM0Ni4yMDQ0IDQyLjc3NSA0OC4wMDEyIDQwLjk3ODEgNDguMDAxMiAzOC44MzEyVjIwLjk0MzdDNDggMTguNzk2OSA0Ni4yNTYyIDE3IDQ0IDE3Wk0zMi41NTYyIDM1SDI1LjU1NjJDMjQuNzMxMiAzNSAyNC4wNTYyIDM0LjMzMTIgMjQuMDU2MiAzMy41QzI0LjA1NjIgMzIuNjY4NyAyNC43MzEyIDMyIDI1LjU1NjIgMzJIMzIuNTU2MkMzMy4zODc1IDMyIDM0LjA1NjIgMzIuNjc1IDM0LjA1NjIgMzMuNUMzNC4wNTYyIDM0LjMyNSAzMy4zODc1IDM1IDMyLjU1NjIgMzVaTTM4LjU1NjIgMjlIMjUuNTU2MkMyNC43MzEyIDI5IDI0LjA1NjIgMjguMzMxMyAyNC4wNTYyIDI3LjVDMjQuMDU2MiAyNi42Njg3IDI0LjczMTIgMjYgMjUuNTU2MiAyNkgzOC41NTYyQzM5LjM4NzUgMjYgNDAuMDU2MiAyNi42NzUgNDAuMDU2MiAyNy41QzQwLjA1NjIgMjguMzI1IDM5LjM4NzUgMjkgMzguNTU2MiAyOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8xMDMxXzU1NjQiIHg9IjEyIiB5PSIxNyIgd2lkdGg9IjQwLjAwMTIiIGhlaWdodD0iMzkuNzc1NCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSI0Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTAzMV81NTY0Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzEwMzFfNTU2NCIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K';\" onmouseout=\"this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA2MyA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzEuNSIgY3k9IjMxLjUiIHI9IjMxIiBmaWxsPSIjMDAxOTk2IiBzdHJva2U9IiMxRjQwOEYiLz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xMDMxXzU1NjEpIj4KPHBhdGggZD0iTTQ0IDE3SDIwQzE3Ljc5NjkgMTcgMTYgMTguNzk2OSAxNiAyMC45NDM3VjM4Ljg4NzVDMTYgNDEuMDkwNiAxNy43OTY5IDQyLjgzMTIgMjAgNDIuODMxMkgyNlY0OC4wMjVDMjYgNDguNjM0NCAyNi43MDMxIDQ4Ljk5MDYgMjcuMTk1IDQ4LjYzMTNMMzUuMDAxMiA0Mi43NzVINDQuMDAxMkM0Ni4yMDQ0IDQyLjc3NSA0OC4wMDEyIDQwLjk3ODEgNDguMDAxMiAzOC44MzEyVjIwLjk0MzdDNDggMTguNzk2OSA0Ni4yNTYyIDE3IDQ0IDE3Wk0zMi41NTYyIDM1SDI1LjU1NjJDMjQuNzMxMiAzNSAyNC4wNTYyIDM0LjMzMTIgMjQuMDU2MiAzMy41QzI0LjA1NjIgMzIuNjY4NyAyNC43MzEyIDMyIDI1LjU1NjIgMzJIMzIuNTU2MkMzMy4zODc1IDMyIDM0LjA1NjIgMzIuNjc1IDM0LjA1NjIgMzMuNUMzNC4wNTYyIDM0LjMyNSAzMy4zODc1IDM1IDMyLjU1NjIgMzVaTTM4LjU1NjIgMjlIMjUuNTU2MkMyNC43MzEyIDI5IDI0LjA1NjIgMjguMzMxMyAyNC4wNTYyIDI3LjVDMjQuMDU2MiAyNi42Njg3IDI0LjczMTIgMjYgMjUuNTU2MiAyNkgzOC41NTYyQzM5LjM4NzUgMjYgNDAuMDU2MiAyNi42NzUgNDAuMDU2MiAyNy41QzQwLjA1NjIgMjguMzI1IDM5LjM4NzUgMjkgMzguNTU2MiAyOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8xMDMxXzU1NjEiIHg9IjEyIiB5PSIxNyIgd2lkdGg9IjQwLjAwMTIiIGhlaWdodD0iMzkuNzc1NCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSI0Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTAzMV81NTYxIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzEwMzFfNTU2MSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K';\">";
    document.getElementById('chat').onclick = function() { openChatbot(); };
  } else {
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('data-mount', 'chat');
    el.setAttribute('data-prop-start-open', 'false');
    el.setAttribute('data-prop-apply-wrapper', 'true');
    if (langCheck()) {
      if (enviromentCheck()) {
        el.setAttribute('data-prop-brand-uri', 'TX Courier-DEV-FR');
      } else {
        el.setAttribute('data-prop-brand-uri', 'TX Courier-PROD-FR');
      }
    } else {
      if (enviromentCheck()) {
        el.setAttribute('data-prop-brand-uri', 'TX Courier-DEV');
      } else {
        el.setAttribute('data-prop-brand-uri', 'TX Courier-PROD');
      }
    }
    el.setAttribute('data-prop-payload', '{"context":{"action":"","pin":"","campaign":""}}');
    if (enviromentCheck()) {
      el.setAttribute('src', 'https://t.virtualchatpurolator.com/broker.js');
    } else {
      el.setAttribute('src', 'https://prod.virtualchatpurolator.com/broker.js');
    }
    document.body.appendChild(el);
  }
}

//3. Check if isIE() function returns true when openChatbot function is invoked (If yes pass parameter to popup UI setup, if not, pass paramater to DropIn UI setup)
//   Checks for PIN, Category and Campaign types
function openChatbot(parameter) {
  //Check if parameter is set
  if (parameter != null && parameter != undefined) {
    //Check if container for Tracker app exist
    if(typeof(appContainer) != undefined && appContainer != null) {
      param = "?pin=" + parameter;
      typeParamPin = parameter;
    }
    for (var i = 0; i < categoryTypes.length; i++) {
      if (categoryTypes[i] === parameter) {
        param = "?category=" + parameter;
        typeParamCategory = parameter;
        break;
      }
    }
    var escapeURL = sanitize(window.location.search);
    if (escapeURL.indexOf('campaign') != -1) {
      param = "?campaign=" + parameter;
      typeParamCampaign = parameter;
    }
  }

  if (isIE() || window.matchMedia('(max-width: 992px)').matches == true) {
    //Language and Environment checks
    if (langCheck()) {
      dropinTitle = "Assistant virtuel Puro";
      if (enviromentCheck()) {
        dropinSrc = "https://t.virtualchatpurolator.com/#/TX Courier-DEV-FR"+param;
      } else {
        dropinSrc = "https://prod.virtualchatpurolator.com/#/TX Courier-PROD-FR"+param;
      }
    } else {
      dropinTitle = "Puro Virtual Assistant";
      if (enviromentCheck()) {
        dropinSrc = "https://t.virtualchatpurolator.com/#/TX Courier-DEV"+param;
      } else {
        dropinSrc = "https://prod.virtualchatpurolator.com/#/TX Courier-PROD"+param;
      }
    }
    var w = window.open(dropinSrc, dropinTitle, "width=520,height=600"); // Open new window
    w.window.title = dropinTitle;
  } else {
    window.setVirtualAssistantPayload({
      "context": {
        "action": "",
        "pin": typeParamPin,
        "category": typeParamCategory,
        "campaign": typeParamCampaign
      }
    });
  }
}
(function ($, Drupal) {
  Drupal.behaviors.user_location = {
    attach: function (context, settings) {
        $('[data-action="open-chat"]').unbind('click');
        $('[data-action="open-chat"]').on('click', function(e) {
          e.preventDefault();
          openChatbot();
        });
      }
    }
})(jQuery, Drupal);
