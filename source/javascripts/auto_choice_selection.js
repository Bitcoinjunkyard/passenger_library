var removeClass = function (elm, className) {
  if (document.documentElement.classList) {
    removeClass = function (elm, className) {
      elm.classList.remove(className);
    }
  } else {
    removeClass = function (elm, className) {
      if (!elm || !elm.className) {
          return false;
      }
      var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
      elm.className = elm.className.replace(regexp, "$2");
    }
  }
  removeClass(elm, className);
}

function getUrlVar(key) {
  var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
  return result && unescape(result[1]) || "";
}

function getDestWithAnchor(dest) {
  anchorParm = getUrlVar("a"); // destination anchors can be passed through the "a" URL param
  if (anchorParm) {
    dest += "#" + anchorParm;
  }
  return dest;
}

function applyChoice(choiceMap, storageKey, uriKey, value, linkId, uri) {
  if (window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch (err) {
      // Safari in Private Browsing mode throws exceptions
      // on localStorage.setItem(). Ignore and log these
      // exceptions.
      if (window.console) {
        console.error(err);
      }
    }
  }
  choiceMap[uriKey] = value;

  for (var key in choiceMap) {
    // (filter out keys from the Object.prototype)
    if (choiceMap.hasOwnProperty(key)) {
      uri = uri.replace((":" + key + ":"), choiceMap[key]);
    }
  }

  if (uri.indexOf('/:') < 0) {
    removeClass(document.getElementById(linkId), "disabled");
    document.getElementById(linkId).href = uri;
  }
}
