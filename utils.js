var isFunction = function(func) {
  return Object.prototype.toString.call(func) === '[object Function]';
}

// combined accessors
var getSet = function getSet(obj){var props = arguments[1];if(props === void 0)props = null;var valueMode = arguments[2];if(valueMode === void 0)valueMode = false;

  if (!props) throw new Error('Property name is mandatory.');

  var add = function()  {var p = arguments[0];if(p === void 0)p = null;
    var _prop = '__' + p;
    if (!obj.hasOwnProperty(_prop)) obj[_prop] = null;

    obj[p] = function() {var value = arguments[0];if(value === void 0)value = null;
      if (value === null) return this[_prop];

      if (!isFunction(value) && !valueMode) {
        this[_prop] = function()  {return value};
      } else {
        this[_prop] = value;
      }

      return this;
    };
  };

  if (Array.isArray(props)) {
    props.forEach(function(p)  {return add(p)});
  } else {
    add(props);
  }

};

// @TODO test
var _counters = { '': 0 };
var uniqueId = function() {var prefix = arguments[0];if(prefix === void 0)prefix = '';
  if (prefix && !_counters[prefix]) {
    _counters[prefix] = 0;
  }

  var id = _counters[prefix];
  if (prefix) { id = [prefix, id].join('-'); }
  _counters[prefix] += 1;

  return id;
}

// create a default data accessor for each given attrs
/*
var defaultDataMap = function defaultDataMap(obj, attrs) {
  attrs.forEach((attr) => {
    obj[attr]((d, v = null) => {
      if (v === null) return d.y;
      d[attr] = +v;
      return obj;
    })
  });
};
*/

var extend = function extend() {
  // this can probably improved in es6
  var args = Array.prototype.slice.call(arguments);
  var host = args.shift();
  var copy = args.shift();

  for (var i in copy) { host[i] = copy[i]; }
  args.unshift(host);

  if (args.length > 1) { return extend.apply(null, args); }
  return host;
};


module.exports = {
  extend: extend,
  getSet: getSet,
  isFunction: isFunction
};