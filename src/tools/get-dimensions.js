import isNode from 'detect-node';

const getViewportSize = function (Name) {

  var size;
  var name = Name.toLowerCase();
  var document = window.document;
  var documentElement = document.documentElement;

  // IE6 & IE7 don't have window.innerWidth or innerHeight
  if (window['inner' + Name] === undefined) {
    size = documentElement['client' + Name];
  }

  // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy
  else if (window['inner' + Name] !== documentElement['client' + Name]) {

    // Insert markup to test if a media query will match document.doumentElement["client" + Name]
    var bodyElement = document.createElement('body');
    bodyElement.id = 'vpw-test-b';
    bodyElement.style.cssText = 'overflow:scroll';
    var divElement = document.createElement('div');
    divElement.id = 'vpw-test-d';
    divElement.style.cssText = 'position:absolute;top:-1000px';
    // Getting specific on the CSS selector so it won't get overridden easily
    divElement.innerHTML = '<style>@media(' + name + ':' + documentElement['client' + Name] + 'px){body#vpw-test-b div#vpw-test-d{' + name + ':7px!important}}</style>';
    bodyElement.appendChild(divElement);
    documentElement.insertBefore(bodyElement, document.head);

    if (divElement['offset' + Name] === 7) {
      // Media query matches document.documentElement["client" + Name]
      size = documentElement['client' + Name];
    } else {
      // Media query didn't match, use window["inner" + Name]
      size = window['inner' + Name];
    }
    // Cleanup
    documentElement.removeChild(bodyElement);
  }

  // Default to use window["inner" + Name]
  else {
    size = window['inner' + Name];
  }

  return size;
};

/**
 * Get the usable browser window dimentions.
 *
 * @param  {Number} wMin - Minimum width.
 * @param  {Number} hMin - Minimum height.
 * @param  {Number} wMax - Maximum width.
 * @param  {Number} hMax - Maximum height.
 *
 * @return {Object} { Number width, Number height }
 */
export default function (wMin, hMin, wMax, hMax) {

  let width = isNode ? 1024 : getViewportSize('Width');
  let height = isNode ? 768 : getViewportSize('Height');

  width = wMin ? (width < wMin ? wMin : width) : width;
  width = wMax ? (width > wMax ? wMax : width) : width;
  height = hMin ? (height < hMin ? hMin : height) : height;
  height = hMax ? (height > hMax ? hMax : height) : height;

  return { width, height };
}
