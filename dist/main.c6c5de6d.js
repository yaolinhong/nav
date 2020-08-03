// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $lastLi = $('.siteList').find('li.last');
var x = localStorage.getItem('x');
/* console.log(typeof x)
console.log(x) */

var removeX = function removeX(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('cn.', '').replace(/\/.*/, '');
};

var xObject = JSON.parse(x); //转换成对象；

var hashTable = xObject || [];
var hash2 = [{
  logo: 'V',
  url: 'https://cn.vuejs.org/'
}, {
  logo: 'R',
  url: 'https://reactjs.org/'
}, {
  logo: 'N',
  url: 'https://nodejs.org/en/'
}, {
  logo: 'N',
  url: 'https://developer.mozilla.org/zh-CN/'
}]; //构造函数遍历哈希表；哈希表数据结构为[{logo:'logo',url:'url},{}....]

var render = function render() {
  $('.siteList').find('li.newSite').remove();
  hashTable.forEach(function (node, index) {
    var $li = $("\n        <li class=\"newSite\">\n        <div class=\"site\">\n            <svg class=\"removeSite\" class=\"icon\"> \n            <use xlink:href=\"#icon-Remove\"></use>\n            </svg>\n            <div class=\"logo\" >".concat(removeX(node.url)[0], "</div>\n            <span>").concat(removeX(node.url), "</span>\n        </div>\n        </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", '.removeSite', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashTable.splice(index, 1);
      $('.siteList').find('li.newSite').remove();
      string = JSON.stringify(hashTable); //转换成字符串

      localStorage.setItem('x', string); //大小写- -！

      render();
    });
  });
};

render(); //执行遍历函数，渲染哈希表

$("#newSite").on("click", null, function () {
  var url = prompt("请输入网址");

  while (url == 0) {
    url = prompt("未检测到输入的网址，请重试");
  } //自动补全


  if (url.indexOf('http') == -1) {
    if (url.indexOf('www') == -1) {
      logo = removeX(url)[0];
      url = "https://www.".concat(url);
    } else {
      logo = removeX(url)[0];
      url = "https://".concat(url);
    }

    hashTable.push({
      logo: logo,
      url: url
    });
  } else {
    if (url.indexOf('www') == -1) {
      logo = removeX(node.url)[0];
      url = "www.".concat(url);
    } else {
      logo = removeX(node.url)[0];
      url = "https://".concat(url);
    }

    hashTable.push({
      logo: logo,
      url: url
    });
  } //删除之前的，重新渲染；


  render();
  string = JSON.stringify(hashTable); //转换成字符串

  localStorage.setItem('x', string); //大小写- -！
});
$(document).on('keypress', function (e) {
  var key = e.key;
  console.log(e.key);
  $('.searchForm').on("keypress", function (e) {
    e.stopPropagation();
  }); //阻止输入时，键盘事件冒泡

  for (var i = 0; i < hashTable.length; i++) {
    if (hashTable[i].logo.toLowerCase() === key) {
      window.open(hashTable[i].url);
    }
  }

  for (var _i = 0; _i < hash2.length; _i++) {
    if (hash2[_i].logo.toLowerCase() === key) {
      window.open(hash2[_i].url);
      console.log(_i);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.c6c5de6d.js.map