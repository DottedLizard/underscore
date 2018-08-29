var _ = {

  each: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    for (var i = 0; i < len; i++) {

      key = keys[i];
      _.callIteratee(iteratee, [list[key], key, list], context);
    }

    return list;
  },

  map: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newArr = [];

    for (var i = 0; i < len; i++) {

      key = keys[i];
      newArr.push(_.callIteratee(iteratee, [list[key], key, list], context));
    }

    return newArr;
  },

  reduce: function(list, iteratee, memo, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    if ((memo === undefined) && (keys.length > 0)) {
      memo = list[keys[0]];
    }

    for (var i = 0; i < len; i++) {

      key = keys[i];
      memo = _.callIteratee(iteratee, [memo, list[key], key, list], context);
    }

    return memo;
  },

  reduceRight: function(list, iteratee, memo, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    if ((memo === undefined) && (keys.length > 0)) {
      memo = list[keys[keys.length - 1]];
    }

    for (var i = len - 1; i >= 0; i--) {

      key = keys[i];
      memo = _.callIteratee(iteratee, [memo, list[key], key, list], context);
    }

    return memo;
  },

  find: function(list, predicate, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (_.callIteratee(predicate, [list[key], key, list], context)) {
        return list[key];
      }
    }
  },

  filter: function(list, predicate, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newArr = [];

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (_.callIteratee(predicate, [list[key], key, list], context)) {
        newArr.push(list[key]);
      }
    }

    return newArr;
  },

  where: function(list, properties) {

    var newArr = [];

    for (var i = 0; i < list.length; i++) {

      var match = true;
      var item = list[i];

      for (var prop in properties) {

        if ((!item.hasOwnProperty(prop)) || (item[prop] !== properties[prop])) {

          match = false;
          break;
        }
      }

      if (match) {
        newArr.push(item);
      }
    }

    return newArr;
  },

  findWhere: function(list, properties) {

    for (var i = 0; i < list.length; i++) {

      var match = true;
      var item = list[i];

      for (prop in properties) {

        if ((!item.hasOwnProperty(prop)) || (item[prop] !== properties[prop])) {

          match = false;
          break;
        }
      }

      if (match) {
        return item;
      }
    }
  },

  reject: function(list, predicate, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newArr = [];

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (!_.callIteratee(predicate, [list[key], key, list], context)) {
        newArr.push(list[key]);
      }
    }

    return newArr;
  },

  every: function(list, predicate, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if ((!predicate && !list[key])
        || (predicate && !_.callIteratee(predicate, [list[key], key, list], context))) {
        return false;
      }
    }

    return true;
  },

  some: function(list, predicate, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if ((!predicate && list[key])
        || (predicate && _.callIteratee(predicate, [list[key], key, list], context))) {
        return true;
      }
    }

    return false;
  },

  contains: function(list, value, fromIndex) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    if (Array.isArray(list)) {
      return list.indexOf(value, fromIndex) !== -1;
    } else {

      for (var i = 0; i < len; i++) {

        key = keys[i];

        if (list[key] === value) {
          return true;
        }
      }
    }

    return false;
  },

  invoke: function() {

    var args = [].slice.call(arguments);
    var list = args[0];
    var methodName = args[1];
    var args = args.slice(2);
    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);

    for (var i = 0; i < len; i++) {

      key = keys[i];

      list[key] = list[key][methodName].apply(list[key], args);
    }

    return list;
  },

  pluck: function(list, propertyName) {

    var newArr = [];

    for (var i = 0; i < list.length; i++) {

      var item = list[i];

      if (item.hasOwnProperty(propertyName)) {
        newArr.push(item[propertyName]);
      }
    }

    return newArr;
  },

  max: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var memo = -Infinity;
    var val;

    if (len === 0) {
      return -Infinity;
    }

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (iteratee) {
        val = _.callIteratee(iteratee, [list[key], key, list], context);
      } else {
        val = list[key];
      }

      if (typeof val !== 'number') {
        continue;
      }

      memo = val > memo ? val : memo;
    }

    return memo;
  },

  min: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var memo = Infinity;
    var val;

    if (len === 0) {
      return Infinity;
    }

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (iteratee) {
        val = _.callIteratee(iteratee, [list[key], key, list], context);
      } else {
        val = list[key];
      }

      if (typeof val !== 'number') {
        continue;
      }

      memo = val < memo ? val : memo;
    }

    return memo;
  },

  sortBy: function(list, iteratee, context) {

    var func;

    if (typeof iteratee === 'string') {
      func = function(a, b) { return a[iteratee] - b[iteratee] };
    } else {
      func = function(a, b) { return _.callIteratee(iteratee, [a], context) - _.callIteratee(iteratee, [b], context) };
    }

    return list.sort(func);
  },

  groupBy: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newDict = {};
    var val;

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (typeof iteratee === 'string') {
        val = list[key][iteratee];
      } else {
        val = _.callIteratee(iteratee, [list[key]], context);
      }

      if (!newDict[val]) {
        newDict[val] = [];
      }

      newDict[val].push(list[key]);
    }

    return newDict;
  },

  indexBy: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newDict = {};
    var val;

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (typeof iteratee === 'string') {
        val = list[key][iteratee];
      } else {
        val = _.callIteratee(iteratee, [list[key]], context);
      }

      newDict[val] = list[key];
    }

    return newDict;
  },

  countBy: function(list, iteratee, context) {

    var key;
    var keys = _.getKeys(list);
    var len = _.getLength(list);
    var newDict = {};
    var val;

    for (var i = 0; i < len; i++) {

      key = keys[i];

      if (typeof iteratee === 'string') {
        val = list[key][iteratee];
      } else {
        val = _.callIteratee(iteratee, [list[key]], context);
      }

      if (!newDict[val]) {
        newDict[val] = 0;
      }

      newDict[val] += 1;
    }

    return newDict;
  },

  shuffle: function(list) {

    var j;
    var tmp;

    for (var i = 0; i < list.length - 1; i++) {

      j = i + Math.floor(Math.random() * (list.length - i));
      tmp = list[j];
      list[j] = list[i];
      list[i] = tmp;
    }

    return list;
  },

  sample: function(list, n) {

    if (n === undefined) {

      return list[Math.floor(Math.random() * list.length)];

    } else {

      var arr = list.slice();
      var newArr = [];
      var idx;

      for (var i = n; i > 0; i--) {

        idx = Math.floor(Math.random() * arr.length);
        newArr.push(arr[idx]);
        arr.splice(idx, 1);
      }

      return newArr;
    }
  },

  toArray: function(list) {
    return [].slice.call(list);
  },

  size: function(list) {
    return _.getLength(list);
  },

  partition: function(array, predicate) {

    var passCondition = _.filter(array, predicate);
    var doNotPassCondition = _.filter(array, function(item) {
      return !predicate(item);
    });

    return [passCondition, doNotPassCondition];
  },

  first: function(arr, n, block) {

    if ((n === undefined) || block) {

      if (arr.length > 0) {
        return arr[0];
      }

    } else {

      return arr.slice(0, n);
    }
  },

  initial: function(array, n) {

    var len = array.length;

    if (len > 0) {

      if (n === undefined) {
        return array.slice(0, len - 1);
      } else if (n < len) {
        return array.slice(0, len - n);
      }
    }

    return [];
  },

  last: function(array, n) {

    var len = array.length;

    if (len > 0) {

      if (n === undefined) {
        return array[len - 1];
      } else if (n < len) {
        return array.slice(len - n);
      }
    }

    return [];
  },

  rest: function(array, index) {

    if (index === undefined) {
      return array.slice(1);
    }

    return array.slice(index);
  },

  compact: function(array) {

    return _.filter(array, function(item) {
      return !!item;
    });
  },

  flatten: function(array, shallow) {

    var newArr = [];

    array.forEach(function(item) {

      if (!Array.isArray(item)) {
        newArr.push(item);
      } else {

        if (shallow) {

          for (var i = 0; i < item.length; i++) {
            newArr.push(item[i]);
          }

        } else {
          newArr = newArr.concat(_.flatten(item));
        }
      }
    });

    return newArr;
  },

  without: function() {

    var args = [].slice.call(arguments);
    var array = args[0];
    var values = _.rest(args);
    var newArr = [];

    array.forEach(function(item) {

      if (!values.includes(item)) {
        newArr.push(item);
      }
    });

    return newArr;
  },

  union: function() {

    var args = [].slice.call(arguments);
    var item;
    var newArr = [];

    for (var i = 0; i < args.length; i++) {

      for (var j = 0; j < args[i].length; j++) {

        item = args[i][j];

        if (!newArr.includes(item)) {
          newArr.push(item);
        }
      }
    }

    return newArr;
  },

  intersection: function() {

    var args = [].slice.call(arguments);
    var include;
    var item;
    var newArr = [];

    for (var i = 0; i < args[0].length; i++) {

      include = true;
      item = args[0][i];

      for (var j = 1; j < args.length; j++) {

        if (!args[j].includes(item)) {

          include = false;
          break;
        }
      }

      if (include) {
        newArr.push(item);
      }
    }

    return newArr;
  },

  difference: function() {

    var args = [].slice.call(arguments);
    var array = args[0];
    var item;
    var present;
    var newArr = [];

    for (var i = 0; i < array.length; i++) {

      present = false;
      item = array[i];

      for (var j = 1; j < args.length; j++) {

        if (args[j].includes(item)) {

          present = true;
          break;
        }
      }

      if (!present) {
        newArr.push(item);
      }
    }

    return newArr;
  },

  uniq: function(array, isSorted, iteratee) {

    var val;
    var newArr = [];

    array.forEach(function(item) {

      if (iteratee) {
        val = iteratee(item);
      } else {
        val = item;
      }

      if (!newArr.includes(val)) {
        newArr.push(val);
      }
    });

    return newArr;
  },

  zip: function() {

    var args = [].slice.call(arguments);
    var newArr = [];

    args.forEach(function(item) {
      newArr.push(new Array(item.length));
    });

    for (var i = 0; i < args[0].length; i++) {

      for (var j = 0; j < newArr.length; j++) {
        newArr[j][i] = args[i][j];
      }
    }

    return newArr;
  },

  unzip: function(array) {

    var newArr = [];

    array.forEach(function(item) {
      newArr.push(new Array(item.length));
    });

    for (var i = 0; i < array[0].length; i++) {

      for (var j = 0; j < newArr.length; j++) {
        newArr[j][i] = array[i][j];
      }
    }

    return newArr;
  },

  object: function(list, values) {

    var newObj = {};
    var key;
    var value;

    for (var i = 0; i < list.length; i++) {

      if (values === undefined) {

        key = list[i][0];
        value = list[i][1];

      } else {

        key = list[i];
        value = values[i];
      }

      newObj[key] = value;
    }

    return newObj;
  },

  indexOf: function(array, value, isSorted) {

    if (isSorted === true) {

      for (var idx = _.sortedIndex(array, value); idx >= 0; idx--) {

        if ((array[idx] === value) && (!idx || (array[idx - 1] !== value))) {
          return idx;
        }
      }

      return -1;
    }

    var begin = (typeof isSorted === 'number') ? isSorted : 0;

    for (var i = begin; i < array.length; i++) {

      if (array[i] === value) {
        return i;
      }
    }

    return -1;
  },

  lastIndexOf: function(array, value, isSorted) {

    if (isSorted === true) {

      for (var idx = _.sortedIndex(array, value); idx < array.length; idx++) {

        if ((idx > 0) && (array[idx - 1] === value) && (array[idx] !== value)) {
          return idx - 1;
        }

        if ((array[idx] === value) &&
          ((idx === array.length - 1) || (array[idx + 1] !== value))) {
          return idx;
        }
      }

      return -1;
    }

    var end = (typeof isSorted === 'number') ? isSorted : (array.length - 1);

    for (var i = end; i >= 0; i--) {

      if (array[i] === value) {
        return i;
      }
    }

    return -1;
  },

  sortedIndex: function(list, value, iteratee, context) {

    var high = list.length;
    var low = 0;
    var comp;

    if (iteratee) {

      if (typeof iteratee === 'string') {
        value = value[iteratee];
      } else {
        value = _.callIteratee(iteratee, [value], context);
      }
    }

    while (low < high) {

      mid = Math.floor((low + high) / 2);

      if (iteratee) {

        if (typeof iteratee === 'string') {
          comp = list[mid][iteratee];
        } else {
          comp = _.callIteratee(iteratee, [list[mid]], context);
        }

      } else {
        comp = list[mid];
      }

      if (comp < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  },

  findIndex: function(array, predicate, context) {

    if (typeof predicate === 'object') {
      predicate = _.matchObject(predicate);
    }

    for (var i = 0; i < array.length; i++) {

      if (_.callIteratee(predicate, [array[i]], context)) {
        return i;
      }
    }

    return -1;
  },

  findLastIndex: function(array, predicate, context) {

    if (typeof predicate === 'object') {
      predicate = _.matchObject(predicate);
    }

    for (var i = array.length - 1; i >= 0; i--) {

      if (_.callIteratee(predicate, [array[i]], context)) {
        return i;
      }
    }

    return -1;
  },

  range: function(start, stop, step) {

    var args = [].slice.call(arguments);
    var newArr = [];
    var start;
    var stop;
    var step;

    if (args.length === 1) {

      start = 0;
      stop = args[0];
      step = 1;

    } else {

      start = args[0];
      stop = args[1];
      step = args[2] || 1;
    }

    if (step > 0) {

      for (var i = start; i < stop; i += step) {
        newArr.push(i);
      }

    } else {

      for (var i = start; i > stop; i += step) {
        newArr.push(i);
      }
    }

    return newArr;
  },

  bind: function(func, obj, argmts) {

    var args = [].slice.call(arguments);
    args = _.rest(args, 2);

    return (function() {

      args = args.concat([].slice.call(arguments));
      return func.apply(obj, args);
    });
  },

  bindAll: function(obj, methodNames) {

    var args = [].slice.call(arguments);
    args = _.rest(args);

    for (var i = 0; i < args.length; i++) {
      obj[args[i]] = obj[args[i]].bind(obj);
    }
  },

  partial: function() {

    var args = [].slice.call(arguments);
    var func = args[0];
    var preFillArgs = _.rest(args, 1);

    return (function() {

      var additionalArgs = [].slice.call(arguments);

      preFillArgs = preFillArgs.map(function(item) {

        if (item === _) {
          return additionalArgs.shift();
        }

        return item;
      });

      var allArgs = preFillArgs.concat(additionalArgs);

      return func.apply(this, allArgs);
    });
  },

  memoize: function(func, hashFunc) {

    var newFunc = function() {

      var args = [].slice.call(arguments);
      var key = String(args[0]);

      if (hashFunc) {
        key = String(hashFunc.apply(this, args));
      }

      if (newFunc.cache[key] === undefined) {
        newFunc.cache[key] = func.apply(this, args);
      }

      return newFunc.cache[key];
    };

    newFunc.cache = {};

    return newFunc;
  },

  delay: function() {

    var args = [].slice.call(arguments);
    var func = args[0];
    var wait = args[1];
    args = _.rest(args, 2);

    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  },

  defer: function() {

    var args = [].slice.call(arguments);
    var func = args[0];
    args = _.rest(args, 1);

    setTimeout(function() {
      return func.apply(this, args);
    }, 0);
  },

  throttle: function(func, wait, options) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      options = options || {};

      newFunc.timer = Date.now() - newFunc.last;

      if (newFunc.timer >= wait) {

        newFunc.last = Date.now();
        newFunc.timer = 0;

        if ((options.leading !== false) || newFunc.waiting) {

          newFunc.waiting = false;

          return func.apply(this, args);
        }

      } else {

        clearTimeout(newFunc.timeout);

        if (options.trailing !== false) {

          newFunc.waiting = true;

          newFunc.timeout = setTimeout(function() {
            return newFunc.apply(this, args);
          }, wait - newFunc.timer);
        }
      }
    };

    newFunc.last = 0;
    newFunc.waiting = false;

    return newFunc;
  },

  debounce: function(func, wait, immediate) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      newFunc.timer = Date.now() - newFunc.last;

      if (newFunc.timer >= wait) {

        newFunc.last = Date.now();
        newFunc.timer = 0;

        return func.apply(this, args);

      } else {

        newFunc.timer = (newFunc.timer >= wait) ? 0 : newFunc.timer;

        setTimeout(function() {
          return newFunc.apply(this, args);
        }, wait - newFunc.timer);
      }
    };

    newFunc.last = immediate ? 0 : Date.now();

    return newFunc;
  },

  once: function(func) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      if (!newFunc.called) {

        newFunc.called = true;
        newFunc.cache = func.apply(this, args);

        return newFunc.cache;
      }

      return newFunc.cache;
    };

    newFunc.called = false;

    return newFunc;
  },

  after: function(count, func) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      newFunc.cnt += 1;

      if (newFunc.cnt >= count) {
        return func.apply(this, args);
      }
    };

    newFunc.cnt = 0;

    return newFunc;
  },

  before: function(count, func) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      newFunc.cnt += 1;

      if (newFunc.cnt === count) {
        func.cache = func.apply(this, args);
      }

      if (newFunc.cnt <= count) {
        return func.apply(this, args);
      }

      return func.cache;
    };

    newFunc.cnt = 0;

    return newFunc;
  },

  wrap: function(func, wrapper) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      return wrapper.apply(this, [func].concat(args));
    };

    return newFunc;
  },

  negate: function(predicate) {

    var newFunc = function() {

      var args = [].slice.call(arguments);

      return !predicate.apply(this, args);
    };

    return newFunc;
  },

  compose: function() {

    var args = [].slice.call(arguments);

    if (args.length === 1) {
      return args[0];
    } else {

      return (function() {

        var argmts = [].slice.call(arguments);
        var nestedFunc = _.compose.apply(this, _.rest(args));
        var input = nestedFunc.apply(this, argmts);

        if (!Array.isArray(input)) {
          input = [input];
        }

        return args[0].apply(this, input);
      });
    }
  },

  getKeys: function(obj) {

    if (!Array.isArray(obj)) {
      return Object.keys(obj);
    } else {
      return obj.map(function(item, i) { return i; });
    }
  },

  getLength: function(obj) {

    if (!Array.isArray(obj)) {
      return Object.keys(obj).length;
    } else {
      return obj.length;
    }
  },

  callIteratee: function(iteratee, args, context) {

    if (context) {
      return iteratee.call(context, args);
    } else if (args.length === 1) {
      return iteratee(args[0]);
    } else if (args.length === 3) {
      return iteratee(args[0], args[1], args[2]);
    } else if (args.length === 4) {
      return iteratee(args[0], args[1], args[2], args[3]);
    }
  },

  matchObject: function(obj) {

    return (function(dct) {

      for (var prop in obj) {

        if (dct[prop] !== obj[prop]) {
          return false;
        }
      }

      return true;
    });
  }
};
