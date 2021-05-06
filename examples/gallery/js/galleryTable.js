(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.L.A === region.Q.A)
	{
		return 'on line ' + region.L.A;
	}
	return 'on lines ' + region.L.A + ' through ' + region.Q.A;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return $elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return $elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? $elm$core$Result$Ok(value)
				: (value instanceof String)
					? $elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return $elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.as,
		impl.aA,
		impl.ay,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$GalleryTable$elmToJS = _Platform_outgoingPort('elmToJS', $elm$core$Basics$identity);
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.a) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{d: nodeList, a: (len / $elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$VegaLite$combineSpecs = function (specs) {
	return $elm$json$Json$Encode$object(specs);
};
var $author$project$VegaLite$X = 0;
var $author$project$VegaLite$Y = 1;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$VegaLite$arrangementLabel = function (arrng) {
	switch (arrng) {
		case 1:
			return 'row';
		case 0:
			return 'column';
		case 2:
			return 'repeat';
		default:
			return 'layer';
	}
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$VegaLite$binProperty = function (binProp) {
	switch (binProp.$) {
		case 5:
			var n = binProp.a;
			return _Utils_Tuple2(
				'maxbins',
				$elm$json$Json$Encode$int(n));
		case 0:
			var x = binProp.a;
			return _Utils_Tuple2(
				'anchor',
				$elm$json$Json$Encode$float(x));
		case 1:
			var x = binProp.a;
			return _Utils_Tuple2(
				'base',
				$elm$json$Json$Encode$float(x));
		case 8:
			var x = binProp.a;
			return _Utils_Tuple2(
				'step',
				$elm$json$Json$Encode$float(x));
		case 9:
			var xs = binProp.a;
			return _Utils_Tuple2(
				'steps',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs));
		case 6:
			var x = binProp.a;
			return _Utils_Tuple2(
				'minstep',
				$elm$json$Json$Encode$float(x));
		case 2:
			var xs = binProp.a;
			return _Utils_Tuple2(
				'divide',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs));
		case 3:
			var mn = binProp.a;
			var mx = binProp.b;
			return _Utils_Tuple2(
				'extent',
				A2(
					$elm$json$Json$Encode$list,
					$elm$json$Json$Encode$float,
					_List_fromArray(
						[mn, mx])));
		case 4:
			var s = binProp.a;
			return _Utils_Tuple2(
				'extent',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'param',
							$elm$json$Json$Encode$string(s))
						])));
		default:
			var b = binProp.a;
			return _Utils_Tuple2(
				'nice',
				$elm$json$Json$Encode$bool(b));
	}
};
var $author$project$VegaLite$bin = function (bProps) {
	return _Utils_eq(bProps, _List_Nil) ? _Utils_Tuple2(
		'bin',
		$elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
		'bin',
		$elm$json$Json$Encode$object(
			A2($elm$core$List$map, $author$project$VegaLite$binProperty, bProps)));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$VegaLite$dayLabel = function (dayName) {
	switch (dayName) {
		case 0:
			return 'Mon';
		case 1:
			return 'Tue';
		case 2:
			return 'Wed';
		case 3:
			return 'Thu';
		case 4:
			return 'Fri';
		case 5:
			return 'Sat';
		default:
			return 'Sun';
	}
};
var $author$project$VegaLite$monthNameLabel = function (mon) {
	switch (mon) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		default:
			return 'Dec';
	}
};
var $author$project$VegaLite$dateTimeProperty = function (dtp) {
	switch (dtp.$) {
		case 0:
			var y = dtp.a;
			return _Utils_Tuple2(
				'year',
				$elm$json$Json$Encode$int(y));
		case 1:
			var q = dtp.a;
			return _Utils_Tuple2(
				'quarter',
				$elm$json$Json$Encode$int(q));
		case 2:
			var mon = dtp.a;
			return _Utils_Tuple2(
				'month',
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$monthNameLabel(mon)));
		case 3:
			var n = dtp.a;
			return _Utils_Tuple2(
				'month',
				$elm$json$Json$Encode$int(n));
		case 4:
			var d = dtp.a;
			return _Utils_Tuple2(
				'date',
				$elm$json$Json$Encode$int(d));
		case 5:
			var d = dtp.a;
			return _Utils_Tuple2(
				'day',
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$dayLabel(d)));
		case 6:
			var h = dtp.a;
			return _Utils_Tuple2(
				'hours',
				$elm$json$Json$Encode$int(h));
		case 7:
			var m = dtp.a;
			return _Utils_Tuple2(
				'minutes',
				$elm$json$Json$Encode$int(m));
		case 8:
			var s = dtp.a;
			return _Utils_Tuple2(
				'seconds',
				$elm$json$Json$Encode$int(s));
		default:
			var ms = dtp.a;
			return _Utils_Tuple2(
				'milliseconds',
				$elm$json$Json$Encode$int(ms));
	}
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$VegaLite$toList = $elm$json$Json$Encode$list($elm$core$Basics$identity);
var $author$project$VegaLite$dataValueSpec = function (val) {
	switch (val.$) {
		case 2:
			var x = val.a;
			return $elm$json$Json$Encode$float(x);
		case 3:
			var s = val.a;
			return $elm$json$Json$Encode$string(s);
		case 0:
			var b = val.a;
			return $elm$json$Json$Encode$bool(b);
		case 1:
			var d = val.a;
			return $elm$json$Json$Encode$object(
				A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
		case 4:
			var s = val.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 5:
			return $elm$json$Json$Encode$null;
		case 6:
			var vals = val.a;
			return $author$project$VegaLite$dataValuesSpecs(vals);
		case 7:
			var kvs = val.a;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$map,
					function (_v3) {
						var k = _v3.a;
						var v = _v3.b;
						return _Utils_Tuple2(
							k,
							$author$project$VegaLite$dataValueSpec(v));
					},
					kvs));
		default:
			var xs = val.a;
			return A2($elm$json$Json$Encode$list, $author$project$VegaLite$dataValueSpec, xs);
	}
};
var $author$project$VegaLite$dataValuesSpecs = function (dvs) {
	switch (dvs.$) {
		case 2:
			var xs = dvs.a;
			return $author$project$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$float, xs));
		case 4:
			var ss = dvs.a;
			return $author$project$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$string, ss));
		case 1:
			var dtss = dvs.a;
			return $author$project$VegaLite$toList(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$map($author$project$VegaLite$dateTimeProperty),
						$elm$json$Json$Encode$object),
					dtss));
		case 3:
			var s = dvs.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 0:
			var bs = dvs.a;
			return $author$project$VegaLite$toList(
				A2($elm$core$List$map, $elm$json$Json$Encode$bool, bs));
		case 5:
			var obs = dvs.a;
			return $author$project$VegaLite$toList(
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$map(
							function (_v1) {
								var k = _v1.a;
								var v = _v1.b;
								return _Utils_Tuple2(
									k,
									$author$project$VegaLite$dataValueSpec(v));
							}),
						$elm$json$Json$Encode$object),
					obs));
		default:
			var ds = dvs.a;
			return $author$project$VegaLite$toList(
				A2($elm$core$List$map, $author$project$VegaLite$dataValuesSpecs, ds));
	}
};
var $author$project$VegaLite$filterProperties = function (f) {
	switch (f.$) {
		case 0:
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'equal',
					$author$project$VegaLite$dataValueSpec(val))
				]);
		case 1:
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'lt',
					$author$project$VegaLite$dataValueSpec(val))
				]);
		case 2:
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'lte',
					$author$project$VegaLite$dataValueSpec(val))
				]);
		case 3:
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'gt',
					$author$project$VegaLite$dataValueSpec(val))
				]);
		case 4:
			var field = f.a;
			var val = f.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'gte',
					$author$project$VegaLite$dataValueSpec(val))
				]);
		case 7:
			var selName = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(selName))
				]);
		case 8:
			var selName = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(selName)),
					_Utils_Tuple2(
					'empty',
					$elm$json$Json$Encode$bool(false))
				]);
		case 10:
			var field = f.a;
			var vals = f.b;
			var fromTs = function (ts) {
				if (ts.$ === 1) {
					var s = ts.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							]));
				} else {
					if (!ts.a.b) {
						return $elm$json$Json$Encode$null;
					} else {
						var d = ts.a;
						return $elm$json$Json$Encode$object(
							A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
					}
				}
			};
			var values = function () {
				if (!vals.$) {
					var mn = vals.a;
					var mx = vals.b;
					return A2(
						$elm$json$Json$Encode$list,
						$elm$json$Json$Encode$float,
						_List_fromArray(
							[mn, mx]));
				} else {
					var ts1 = vals.a;
					var ts2 = vals.b;
					return $author$project$VegaLite$toList(
						_List_fromArray(
							[
								fromTs(ts1),
								fromTs(ts2)
							]));
				}
			}();
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2('range', values)
				]);
		case 9:
			var field = f.a;
			var vals = f.b;
			var values = function () {
				switch (vals.$) {
					case 2:
						var xs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs);
					case 1:
						var ds = vals.a;
						return A2(
							$elm$json$Json$Encode$list,
							function (d) {
								return $elm$json$Json$Encode$object(
									A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
							},
							ds);
					case 4:
						var ss = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
					case 3:
						var s = vals.a;
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								]));
					case 0:
						var bs = vals.a;
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$bool, bs);
					case 5:
						var obs = vals.a;
						return A2(
							$elm$json$Json$Encode$list,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$List$map(
									function (_v4) {
										var k = _v4.a;
										var v = _v4.b;
										return _Utils_Tuple2(
											k,
											$author$project$VegaLite$dataValueSpec(v));
									}),
								$elm$json$Json$Encode$object),
							obs);
					default:
						var ds = vals.a;
						return A2($elm$json$Json$Encode$list, $author$project$VegaLite$dataValuesSpecs, ds);
				}
			}();
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2('oneOf', values)
				]);
		case 11:
			var field = f.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'valid',
					$elm$json$Json$Encode$bool(true))
				]);
		default:
			return _List_Nil;
	}
};
var $author$project$VegaLite$ArAria = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$anchorSpec = function (an) {
	switch (an.$) {
		case 0:
			return $elm$json$Json$Encode$string('start');
		case 1:
			return $elm$json$Json$Encode$string('middle');
		case 2:
			return $elm$json$Json$Encode$string('end');
		default:
			var s = an.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$ariaProperty = function (arProp) {
	switch (arProp.$) {
		case 0:
			var b = arProp.a;
			return _Utils_Tuple2(
				'aria',
				$elm$json$Json$Encode$bool(b));
		case 1:
			var d = arProp.a;
			return _Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(d));
		default:
			var s = arProp.a;
			return _Utils_Tuple2(
				'aria',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						])));
	}
};
var $author$project$VegaLite$compositionAlignmentLabel = function (ca) {
	switch (ca) {
		case 0:
			return 'none';
		case 1:
			return 'each';
		default:
			return 'all';
	}
};
var $author$project$VegaLite$fontWeightSpec = function (w) {
	switch (w.$) {
		case 3:
			return $elm$json$Json$Encode$string('normal');
		case 0:
			return $elm$json$Json$Encode$string('bold');
		case 1:
			return $elm$json$Json$Encode$string('bolder');
		case 2:
			return $elm$json$Json$Encode$string('lighter');
		case 13:
			var s = w.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 4:
			return $elm$json$Json$Encode$float(100);
		case 5:
			return $elm$json$Json$Encode$float(200);
		case 6:
			return $elm$json$Json$Encode$float(300);
		case 7:
			return $elm$json$Json$Encode$float(400);
		case 8:
			return $elm$json$Json$Encode$float(500);
		case 9:
			return $elm$json$Json$Encode$float(600);
		case 10:
			return $elm$json$Json$Encode$float(700);
		case 11:
			return $elm$json$Json$Encode$float(800);
		default:
			return $elm$json$Json$Encode$float(900);
	}
};
var $author$project$VegaLite$hAlignSpec = function (al) {
	switch (al.$) {
		case 1:
			return $elm$json$Json$Encode$string('left');
		case 0:
			return $elm$json$Json$Encode$string('center');
		case 2:
			return $elm$json$Json$Encode$string('right');
		default:
			var s = al.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$legendOrientSpec = function (orient) {
	switch (orient) {
		case 3:
			return $elm$json$Json$Encode$string('left');
		case 7:
			return $elm$json$Json$Encode$string('top-left');
		case 6:
			return $elm$json$Json$Encode$string('top');
		case 8:
			return $elm$json$Json$Encode$string('top-right');
		case 5:
			return $elm$json$Json$Encode$string('right');
		case 2:
			return $elm$json$Json$Encode$string('bottom-right');
		case 0:
			return $elm$json$Json$Encode$string('bottom');
		case 1:
			return $elm$json$Json$Encode$string('bottom-left');
		default:
			return $elm$json$Json$Encode$string('none');
	}
};
var $author$project$VegaLite$markOrientationLabel = function (orient) {
	if (!orient) {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var $author$project$VegaLite$multilineTextSpec = function (tText) {
	var _v0 = A2($elm$core$String$split, '\n', tText);
	if (!_v0.b) {
		return $elm$json$Json$Encode$string('');
	} else {
		if (!_v0.b.b) {
			var s = _v0.a;
			return $elm$json$Json$Encode$string(s);
		} else {
			var ss = _v0;
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
		}
	}
};
var $author$project$VegaLite$numExpr = F2(
	function (objName, n) {
		switch (n.$) {
			case 0:
				var x = n.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$float(x))
					]);
			case 1:
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var s = n.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(s))
								])))
					]);
		}
	});
var $author$project$VegaLite$numsExpr = F2(
	function (objName, ns) {
		if (!ns.$) {
			var xs = ns.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs))
				]);
		} else {
			var s = ns.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $author$project$VegaLite$overlapStrategySpec = function (strat) {
	switch (strat.$) {
		case 0:
			return $elm$json$Json$Encode$bool(false);
		case 1:
			return $elm$json$Json$Encode$string('parity');
		case 2:
			return $elm$json$Json$Encode$string('greedy');
		default:
			var s = strat.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$strExpr = F2(
	function (objName, s) {
		switch (s.$) {
			case 0:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$string(x))
					]);
			case 1:
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(x))
								])))
					]);
		}
	});
var $author$project$VegaLite$symbolLabel = function (sym) {
	switch (sym.$) {
		case 0:
			return 'circle';
		case 1:
			return 'square';
		case 2:
			return 'cross';
		case 3:
			return 'diamond';
		case 4:
			return 'triangle-up';
		case 5:
			return 'triangle-down';
		case 6:
			return 'triangle-left';
		case 7:
			return 'triangle-right';
		case 12:
			return 'triangle';
		case 9:
			return 'stroke';
		case 10:
			return 'arrow';
		case 11:
			return 'wedge';
		case 8:
			var svgPath = sym.a;
			return svgPath;
		default:
			var s = sym.a;
			return s;
	}
};
var $author$project$VegaLite$symbolSpec = function (sym) {
	if (sym.$ === 13) {
		var s = sym.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'expr',
					$elm$json$Json$Encode$string(s))
				]));
	} else {
		return $elm$json$Json$Encode$string(
			$author$project$VegaLite$symbolLabel(sym));
	}
};
var $author$project$VegaLite$vAlignSpec = function (al) {
	switch (al.$) {
		case 0:
			return $elm$json$Json$Encode$string('top');
		case 1:
			return $elm$json$Json$Encode$string('line-top');
		case 2:
			return $elm$json$Json$Encode$string('middle');
		case 3:
			return $elm$json$Json$Encode$string('bottom');
		case 4:
			return $elm$json$Json$Encode$string('line-bottom');
		case 5:
			return $elm$json$Json$Encode$string('alphabetic');
		default:
			var s = al.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$legendProperty = function (legendProp) {
	switch (legendProp.$) {
		case 0:
			var aps = legendProp.a;
			if (!aps.b) {
				return _List_fromArray(
					[
						$author$project$VegaLite$ariaProperty(
						$author$project$VegaLite$ArAria(false))
					]);
			} else {
				return A2($elm$core$List$map, $author$project$VegaLite$ariaProperty, aps);
			}
		case 1:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'clipHeight', n);
		case 2:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'columnPadding', n);
		case 31:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'rowPadding', n);
		case 3:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'columns', n);
		case 4:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadius', n);
		case 6:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'fillColor', s);
		case 5:
			var d = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$markOrientationLabel(d)))
				]);
		case 58:
			var lType = legendProp.a;
			if (!lType) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('gradient'))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('symbol'))
					]);
			}
		case 7:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'format', s);
		case 8:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 9:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 10:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'formatType', s);
		case 11:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'gradientLength', n);
		case 12:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'gradientOpacity', n);
		case 13:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'gradientThickness', n);
		case 14:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 15:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'gradientStrokeWidth', n);
		case 16:
			var ga = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 17:
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 18:
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 19:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelColor', s);
		case 20:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFont', s);
		case 21:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelFontSize', n);
		case 22:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFontStyle', s);
		case 23:
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 24:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelLimit', n);
		case 25:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelOffset', n);
		case 26:
			var lo = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$author$project$VegaLite$overlapStrategySpec(lo))
				]);
		case 27:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'offset', n);
		case 28:
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$author$project$VegaLite$legendOrientSpec(orient))
				]);
		case 30:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'padding', n);
		case 32:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'strokeColor', s);
		case 33:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'strokeWidth', n);
		case 34:
			var sd = legendProp.a;
			return A2($author$project$VegaLite$numsExpr, 'symbolDash', sd);
		case 35:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolDashOffset', n);
		case 36:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'symbolFillColor', s);
		case 37:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolLimit', n);
		case 38:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolOffset', n);
		case 39:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolOpacity', n);
		case 42:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 43:
			var s = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$author$project$VegaLite$symbolSpec(s))
				]);
		case 40:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolSize', n);
		case 41:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'symbolStrokeWidth', n);
		case 44:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickCount', n);
		case 45:
			var txt = legendProp.a;
			switch (txt.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('title', $elm$json$Json$Encode$null)
						]);
				case 0:
					var s = txt.a;
					return (s === '') ? _List_fromArray(
						[
							_Utils_Tuple2('title', $elm$json$Json$Encode$null)
						]) : _List_fromArray(
						[
							_Utils_Tuple2(
							'title',
							$author$project$VegaLite$multilineTextSpec(s))
						]);
				default:
					return A2($author$project$VegaLite$strExpr, 'title', txt);
			}
		case 46:
			var ha = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 47:
			var an = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$author$project$VegaLite$anchorSpec(an))
				]);
		case 48:
			var va = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 49:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleColor', s);
		case 50:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFont', s);
		case 51:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleFontSize', n);
		case 52:
			var s = legendProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFontStyle', s);
		case 53:
			var fw = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 54:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLimit', n);
		case 55:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLineHeight', n);
		case 56:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleOpacity', n);
		case 29:
			var orient = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleOrient',
					$author$project$VegaLite$legendOrientSpec(orient))
				]);
		case 57:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'titlePadding', n);
		case 59:
			var vals = legendProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$author$project$VegaLite$dataValuesSpecs(vals))
				]);
		case 60:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'legendX', n);
		case 61:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'legendY', n);
		default:
			var n = legendProp.a;
			return A2($author$project$VegaLite$numExpr, 'zindex', n);
	}
};
var $author$project$VegaLite$measurementLabel = function (mType) {
	switch (mType) {
		case 0:
			return 'nominal';
		case 1:
			return 'ordinal';
		case 2:
			return 'quantitative';
		case 3:
			return 'temporal';
		default:
			return 'geojson';
	}
};
var $elm$core$String$length = _String_length;
var $elm$core$String$trim = _String_trim;
var $author$project$VegaLite$operationSpec = function (op) {
	switch (op.$) {
		case 0:
			var maybeField = op.a;
			if (maybeField.$ === 1) {
				return $elm$json$Json$Encode$string('argmax');
			} else {
				var f = maybeField.a;
				return (!$elm$core$String$length(
					$elm$core$String$trim(f))) ? $elm$json$Json$Encode$string('argmax') : $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'argmax',
							$elm$json$Json$Encode$string(f))
						]));
			}
		case 1:
			var maybeField = op.a;
			if (maybeField.$ === 1) {
				return $elm$json$Json$Encode$string('argmin');
			} else {
				var f = maybeField.a;
				return (!$elm$core$String$length(
					$elm$core$String$trim(f))) ? $elm$json$Json$Encode$string('argmin') : $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'argmin',
							$elm$json$Json$Encode$string(f))
						]));
			}
		case 4:
			return $elm$json$Json$Encode$string('count');
		case 2:
			return $elm$json$Json$Encode$string('ci0');
		case 3:
			return $elm$json$Json$Encode$string('ci1');
		case 5:
			return $elm$json$Json$Encode$string('distinct');
		case 6:
			return $elm$json$Json$Encode$string('max');
		case 7:
			return $elm$json$Json$Encode$string('mean');
		case 8:
			return $elm$json$Json$Encode$string('median');
		case 9:
			return $elm$json$Json$Encode$string('min');
		case 10:
			return $elm$json$Json$Encode$string('missing');
		case 11:
			return $elm$json$Json$Encode$string('product');
		case 12:
			return $elm$json$Json$Encode$string('q1');
		case 13:
			return $elm$json$Json$Encode$string('q3');
		case 15:
			return $elm$json$Json$Encode$string('stdev');
		case 16:
			return $elm$json$Json$Encode$string('stdevp');
		case 17:
			return $elm$json$Json$Encode$string('sum');
		case 14:
			return $elm$json$Json$Encode$string('stderr');
		case 18:
			return $elm$json$Json$Encode$string('valid');
		case 19:
			return $elm$json$Json$Encode$string('variance');
		default:
			return $elm$json$Json$Encode$string('variancep');
	}
};
var $author$project$VegaLite$booExpr = F2(
	function (objName, n) {
		if (!n.$) {
			var b = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$bool(b))
				]);
		} else {
			var s = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $author$project$VegaLite$cInterpolateSpec = function (iType) {
	switch (iType.$) {
		case 7:
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('rgb')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
		case 4:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl'))
					]));
		case 5:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hsl-long'))
					]));
		case 6:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('lab'))
					]));
		case 2:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl'))
					]));
		case 3:
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('hcl-long'))
					]));
		case 0:
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('cubehelix')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
		default:
			var gamma = iType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('cubehelix-long')),
						_Utils_Tuple2(
						'gamma',
						$elm$json$Json$Encode$float(gamma))
					]));
	}
};
var $author$project$VegaLite$channelLabel = function (ch) {
	switch (ch) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'color';
		case 5:
			return 'opacity';
		case 6:
			return 'shape';
		case 7:
			return 'size';
		default:
			return 'strokeDash';
	}
};
var $author$project$VegaLite$scaleDomainSpec = function (sdType) {
	var numsSpec = function (ns) {
		if (!ns.$) {
			var xs = ns.a;
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs);
		} else {
			var s = ns.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		}
	};
	var numSpec = function (n) {
		switch (n.$) {
			case 0:
				var x = n.a;
				return $elm$json$Json$Encode$float(x);
			case 1:
				return $elm$json$Json$Encode$null;
			default:
				var s = n.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
		}
	};
	switch (sdType.$) {
		case 0:
			var xs = sdType.a;
			return numsSpec(xs);
		case 1:
			var x = sdType.a;
			return numSpec(x);
		case 2:
			var x = sdType.a;
			return numSpec(x);
		case 3:
			var x = sdType.a;
			return numSpec(x);
		case 7:
			var ds = sdType.a;
			return A2(
				$elm$json$Json$Encode$list,
				function (d) {
					return $elm$json$Json$Encode$object(
						A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
				},
				ds);
		case 8:
			var s = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
		case 4:
			var ts = sdType.a;
			if (!ts.$) {
				var d = ts.a;
				return $elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
			} else {
				var s = ts.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
			}
		case 5:
			var ts = sdType.a;
			if (!ts.$) {
				var d = ts.a;
				return $elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d));
			} else {
				var s = ts.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(s))
						]));
			}
		case 6:
			var cats = sdType.a;
			return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, cats);
		case 9:
			var selName = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName))
					]));
		case 11:
			var selName = sdType.a;
			var ch = sdType.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName)),
						_Utils_Tuple2(
						'encoding',
						$elm$json$Json$Encode$string(
							$author$project$VegaLite$channelLabel(ch)))
					]));
		case 10:
			var selName = sdType.a;
			var f = sdType.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(selName)),
						_Utils_Tuple2(
						'field',
						$elm$json$Json$Encode$string(f))
					]));
		case 13:
			return $elm$json$Json$Encode$string('unaggregated');
		default:
			var scDo = sdType.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'unionWith',
						$author$project$VegaLite$scaleDomainSpec(scDo))
					]));
	}
};
var $author$project$VegaLite$scaleLabel = function (sc) {
	switch (sc) {
		case 0:
			return 'linear';
		case 1:
			return 'pow';
		case 4:
			return 'symlog';
		case 2:
			return 'sqrt';
		case 3:
			return 'log';
		case 5:
			return 'time';
		case 6:
			return 'utc';
		case 7:
			return 'ordinal';
		case 8:
			return 'band';
		case 9:
			return 'point';
		case 10:
			return 'bin-ordinal';
		case 11:
			return 'quantile';
		case 12:
			return 'quantize';
		default:
			return 'threshold';
	}
};
var $author$project$VegaLite$timeUnitLabel = function (tu) {
	switch (tu.$) {
		case 0:
			return 'year';
		case 13:
			return 'yeardayofyear';
		case 1:
			return 'yearquarter';
		case 2:
			return 'yearquartermonth';
		case 3:
			return 'yearmonth';
		case 4:
			return 'yearmonthdate';
		case 5:
			return 'yearmonthdatehours';
		case 6:
			return 'yearmonthdatehoursminutes';
		case 7:
			return 'yearmonthdatehoursminutesseconds';
		case 8:
			return 'yearweek';
		case 9:
			return 'yearweekday';
		case 10:
			return 'yearweekdayhours';
		case 11:
			return 'yearweekdayhoursminutes';
		case 12:
			return 'yearweekdayhoursminutesseconds';
		case 14:
			return 'quarter';
		case 15:
			return 'quartermonth';
		case 16:
			return 'month';
		case 17:
			return 'monthdate';
		case 18:
			return 'monthdatehours';
		case 19:
			return 'monthdatehoursminutes';
		case 20:
			return 'monthdatehoursminutesseconds';
		case 21:
			return 'week';
		case 22:
			return 'weekday';
		case 23:
			return 'weekdayhours';
		case 24:
			return 'weekdayhoursminutes';
		case 25:
			return 'weekdayhoursminutesseconds';
		case 26:
			return 'date';
		case 27:
			return 'day';
		case 28:
			return 'dayofyear';
		case 29:
			return 'dayhours';
		case 30:
			return 'dayhoursminutes';
		case 31:
			return 'dayhoursminutesseconds';
		case 32:
			return 'hours';
		case 33:
			return 'hoursminutes';
		case 34:
			return 'hoursminutesseconds';
		case 35:
			return 'minutes';
		case 36:
			return 'minutesseconds';
		case 37:
			return 'seconds';
		case 38:
			return 'secondsmilliseconds';
		case 39:
			return 'milliseconds';
		case 40:
			return '';
		case 41:
			return '';
		default:
			return '';
	}
};
var $author$project$VegaLite$scaleNiceSpec = function (ni) {
	switch (ni.$) {
		case 0:
			return $elm$json$Json$Encode$string('millisecond');
		case 1:
			return $elm$json$Json$Encode$string('second');
		case 2:
			return $elm$json$Json$Encode$string('minute');
		case 3:
			return $elm$json$Json$Encode$string('hour');
		case 4:
			return $elm$json$Json$Encode$string('day');
		case 5:
			return $elm$json$Json$Encode$string('week');
		case 6:
			return $elm$json$Json$Encode$string('month');
		case 7:
			return $elm$json$Json$Encode$string('year');
		case 10:
			var tu = ni.a;
			var step = ni.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'interval',
						$elm$json$Json$Encode$string(
							$author$project$VegaLite$timeUnitLabel(tu))),
						_Utils_Tuple2(
						'step',
						$elm$json$Json$Encode$int(step))
					]));
		case 8:
			return $elm$json$Json$Encode$bool(true);
		case 9:
			return $elm$json$Json$Encode$bool(false);
		case 11:
			var n = ni.a;
			return $elm$json$Json$Encode$int(n);
		default:
			var s = ni.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$schemeProperty = F2(
	function (clrs, extent) {
		var nameSpec = function () {
			if (!clrs.$) {
				var ss = clrs.a;
				if (!ss.b) {
					return A2(
						$elm$json$Json$Encode$list,
						$elm$json$Json$Encode$string,
						_List_fromArray(
							['rgb(86,119,164)', 'rgb(86,119,164)']));
				} else {
					if (!ss.b.b) {
						var sch = ss.a;
						return $elm$json$Json$Encode$string(sch);
					} else {
						return A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss);
					}
				}
			} else {
				var ex = clrs.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'expr',
							$elm$json$Json$Encode$string(ex))
						]));
			}
		}();
		if (!extent.b) {
			return _Utils_Tuple2('scheme', nameSpec);
		} else {
			if (!extent.b.b) {
				var n = extent.a;
				return _Utils_Tuple2(
					'scheme',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('name', nameSpec),
								_Utils_Tuple2(
								'count',
								$elm$json$Json$Encode$float(n))
							])));
			} else {
				if (!extent.b.b.b) {
					var mn = extent.a;
					var _v1 = extent.b;
					var mx = _v1.a;
					return _Utils_Tuple2(
						'scheme',
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2('name', nameSpec),
									_Utils_Tuple2(
									'extent',
									A2(
										$elm$json$Json$Encode$list,
										$elm$json$Json$Encode$float,
										_List_fromArray(
											[mn, mx])))
								])));
				} else {
					return _Utils_Tuple2('scheme', nameSpec);
				}
			}
		}
	});
var $author$project$VegaLite$strsExpr = F2(
	function (objName, ss) {
		if (!ss.$) {
			var xs = ss.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, xs))
				]);
		} else {
			var s = ss.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $author$project$VegaLite$scaleProperty = function (scaleProp) {
	switch (scaleProp.$) {
		case 0:
			var sType = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$scaleLabel(sType)))
				]);
		case 2:
			var s = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domain',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		case 1:
			var sdType = scaleProp.a;
			switch (sdType.$) {
				case 1:
					var x = sdType.a;
					return A2($author$project$VegaLite$numExpr, 'domainMin', x);
				case 2:
					var x = sdType.a;
					return A2($author$project$VegaLite$numExpr, 'domainMid', x);
				case 3:
					var x = sdType.a;
					return A2($author$project$VegaLite$numExpr, 'domainMax', x);
				case 4:
					var ts = sdType.a;
					if (!ts.$) {
						var d = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMin',
								$elm$json$Json$Encode$object(
									A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d)))
							]);
					} else {
						var s = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMin',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'expr',
											$elm$json$Json$Encode$string(s))
										])))
							]);
					}
				case 5:
					var ts = sdType.a;
					if (!ts.$) {
						var d = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMax',
								$elm$json$Json$Encode$object(
									A2($elm$core$List$map, $author$project$VegaLite$dateTimeProperty, d)))
							]);
					} else {
						var s = ts.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'domainMax',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'expr',
											$elm$json$Json$Encode$string(s))
										])))
							]);
					}
				default:
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'domain',
							$author$project$VegaLite$scaleDomainSpec(sdType))
						]);
			}
		case 3:
			var range = scaleProp.a;
			switch (range.$) {
				case 5:
					var x = range.a;
					return A2($author$project$VegaLite$numExpr, 'rangeMin', x);
				case 6:
					var x = range.a;
					return A2($author$project$VegaLite$numExpr, 'rangeMax', x);
				case 0:
					var xs = range.a;
					return A2($author$project$VegaLite$numsExpr, 'range', xs);
				case 2:
					var ss = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							A2(
								$elm$json$Json$Encode$list,
								function (s) {
									return $elm$json$Json$Encode$object(
										_List_fromArray(
											[
												_Utils_Tuple2(
												'expr',
												$elm$json$Json$Encode$string(s))
											]));
								},
								ss))
						]);
				case 3:
					var xss = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$list($elm$json$Json$Encode$float),
								xss))
						]);
				case 1:
					var ss = range.a;
					return A2($author$project$VegaLite$strsExpr, 'range', ss);
				case 4:
					var s = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							$elm$json$Json$Encode$string(s))
						]);
				default:
					var s = range.a;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'range',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'field',
										$elm$json$Json$Encode$string(s))
									])))
						]);
			}
		case 4:
			var schName = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($author$project$VegaLite$schemeProperty, schName, extent)
				]);
		case 5:
			var schExpr = scaleProp.a;
			var extent = scaleProp.b;
			return _List_fromArray(
				[
					A2($author$project$VegaLite$schemeProperty, schExpr, extent)
				]);
		case 6:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'align', x);
		case 7:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'padding', x);
		case 18:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'base', x);
		case 15:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'exponent', x);
		case 16:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'domainMid', x);
		case 17:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'constant', x);
		case 8:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'paddingInner', x);
		case 9:
			var x = scaleProp.a;
			return A2($author$project$VegaLite$numExpr, 'paddingOuter', x);
		case 10:
			var b = scaleProp.a;
			return A2($author$project$VegaLite$booExpr, 'round', b);
		case 11:
			var b = scaleProp.a;
			return A2($author$project$VegaLite$booExpr, 'clamp', b);
		case 12:
			var interp = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$author$project$VegaLite$cInterpolateSpec(interp))
				]);
		case 13:
			var ni = scaleProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'nice',
					$author$project$VegaLite$scaleNiceSpec(ni))
				]);
		case 14:
			var b = scaleProp.a;
			return A2($author$project$VegaLite$booExpr, 'zero', b);
		default:
			var b = scaleProp.a;
			return A2($author$project$VegaLite$booExpr, 'reverse', b);
	}
};
var $author$project$VegaLite$sortProperties = function (sp) {
	switch (sp.$) {
		case 0:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('ascending'))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					$elm$json$Json$Encode$string('descending'))
				]);
		case 5:
			var ch = sp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encoding',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$channelLabel(ch)))
				]);
		case 4:
			var field = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'op',
					$author$project$VegaLite$operationSpec(op))
				]);
		case 3:
			var arr = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$arrangementLabel(arr)))
							]))),
					_Utils_Tuple2(
					'op',
					$author$project$VegaLite$operationSpec(op))
				]);
		default:
			return _List_Nil;
	}
};
var $author$project$VegaLite$timeUnitProperties = function (tUnit) {
	switch (tUnit.$) {
		case 40:
			var tu = tUnit.a;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'utc',
					$elm$json$Json$Encode$bool(true)),
				$author$project$VegaLite$timeUnitProperties(tu));
		case 41:
			var n = tUnit.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'maxbins',
					$elm$json$Json$Encode$int(n))
				]);
		case 42:
			var x = tUnit.a;
			var tu = tUnit.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'step',
					$elm$json$Json$Encode$float(x)),
				$author$project$VegaLite$timeUnitProperties(tu));
		default:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'unit',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$timeUnitLabel(tUnit)))
				]);
	}
};
var $author$project$VegaLite$timeUnitSpec = function (tUnit) {
	return $elm$json$Json$Encode$object(
		$author$project$VegaLite$timeUnitProperties(tUnit));
};
var $author$project$VegaLite$booleanOpSpec = function (bo) {
	switch (bo.$) {
		case 0:
			var ex = bo.a;
			return $elm$json$Json$Encode$string(ex);
		case 1:
			var f = bo.a;
			return $author$project$VegaLite$filterSpec(f);
		case 2:
			var tr = bo.a;
			var f = bo.b;
			return A2($author$project$VegaLite$trFilterSpec, tr, f);
		case 4:
			var operand1 = bo.a;
			var operand2 = bo.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'and',
						A2(
							$elm$json$Json$Encode$list,
							$author$project$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		case 5:
			var operand1 = bo.a;
			var operand2 = bo.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'or',
						A2(
							$elm$json$Json$Encode$list,
							$author$project$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		case 6:
			var operand = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'not',
						$author$project$VegaLite$booleanOpSpec(operand))
					]));
		case 3:
			var p = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'param',
						$elm$json$Json$Encode$string(p))
					]));
		case 8:
			var selName = bo.a;
			return $elm$json$Json$Encode$string(selName);
		default:
			var sel = bo.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'selection',
						$elm$json$Json$Encode$string(sel))
					]));
	}
};
var $author$project$VegaLite$filterSpec = function (f) {
	switch (f.$) {
		case 5:
			var ex = f.a;
			return $elm$json$Json$Encode$string(ex);
		case 6:
			var boolExpr = f.a;
			return $author$project$VegaLite$booleanOpSpec(boolExpr);
		default:
			return $elm$json$Json$Encode$object(
				$author$project$VegaLite$filterProperties(f));
	}
};
var $author$project$VegaLite$markChannelProperties = function (field) {
	switch (field.$) {
		case 0:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(s))
				]);
		case 3:
			var d = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$author$project$VegaLite$dataValueSpec(d))
				]);
		case 4:
			var arr = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 5:
			var arr = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 6:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$measurementLabel(t)))
				]);
		case 7:
			var sps = field.a;
			return _Utils_eq(sps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('scale', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$scaleProperty, sps)))
				]);
		case 15:
			var lps = field.a;
			return _Utils_eq(lps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('legend', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'legend',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$legendProperty, lps)))
				]);
		case 9:
			var bps = field.a;
			return _List_fromArray(
				[
					$author$project$VegaLite$bin(bps)
				]);
		case 8:
			var x = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'band',
					$elm$json$Json$Encode$float(x))
				]);
		case 11:
			var sps = field.a;
			_v3$4:
			while (true) {
				if (!sps.b) {
					return _List_fromArray(
						[
							_Utils_Tuple2('sort', $elm$json$Json$Encode$null)
						]);
				} else {
					if (!sps.b.b) {
						switch (sps.a.$) {
							case 0:
								var _v4 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('ascending'))
									]);
							case 1:
								var _v5 = sps.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$elm$json$Json$Encode$string('descending'))
									]);
							case 2:
								var dvs = sps.a.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'sort',
										$author$project$VegaLite$dataValuesSpecs(dvs))
									]);
							default:
								break _v3$4;
						}
					} else {
						break _v3$4;
					}
				}
			}
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'sort',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$sortProperties, sps)))
				]);
		case 10:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 1:
			var predicate = field.a;
			var ifClause = field.b;
			var elseClause = field.c;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					$elm$json$Json$Encode$object(
						_Utils_ap(
							$author$project$VegaLite$predicateProperties(predicate),
							A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, ifClause)))),
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, elseClause));
		case 2:
			var ifClauses = field.a;
			var elseClause = field.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2(
						$elm$json$Json$Encode$list,
						function (_v6) {
							var predicate = _v6.a;
							var ifClause = _v6.b;
							return $elm$json$Json$Encode$object(
								_Utils_ap(
									$author$project$VegaLite$predicateProperties(predicate),
									A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, ifClause)));
						},
						ifClauses)),
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, elseClause));
		case 20:
			var isSelection = field.a;
			var tests = field.b;
			var elseClause = field.c;
			var testClause = function (_v8) {
				var predicate = _v8.a;
				var ifClause = _v8.b;
				return isSelection ? $elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'selection',
							$author$project$VegaLite$booleanOpSpec(predicate)),
						A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, ifClause))) : $elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'test',
							$author$project$VegaLite$booleanOpSpec(predicate)),
						A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, ifClause)));
			};
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					function () {
						if (tests.b && (!tests.b.b)) {
							var test = tests.a;
							return testClause(test);
						} else {
							return A2($elm$json$Json$Encode$list, testClause, tests);
						}
					}()),
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, elseClause));
		case 12:
			var tu = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$author$project$VegaLite$timeUnitSpec(tu))
				]);
		case 13:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					$author$project$VegaLite$multilineTextSpec(t))
				]);
		case 14:
			var op = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$author$project$VegaLite$operationSpec(op))
				]);
		case 16:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string(s))
				]);
		case 17:
			var x = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$float(x))
				]);
		case 18:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string(s))
				]);
		default:
			var b = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$bool(b))
				]);
	}
};
var $author$project$VegaLite$predicateProperties = function (predicate) {
	switch (predicate.$) {
		case 0:
			var p = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(p))
				]);
		case 1:
			var p = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'param',
					$elm$json$Json$Encode$string(p)),
					_Utils_Tuple2(
					'empty',
					$elm$json$Json$Encode$bool(false))
				]);
		default:
			var bo = predicate.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'test',
					$author$project$VegaLite$booleanOpSpec(bo))
				]);
	}
};
var $author$project$VegaLite$trFilterSpec = F2(
	function (mc, f) {
		switch (f.$) {
			case 5:
				var ex = f.a;
				return $elm$json$Json$Encode$string(ex);
			case 6:
				var boolExpr = f.a;
				return $author$project$VegaLite$booleanOpSpec(boolExpr);
			default:
				return $elm$json$Json$Encode$object(
					_Utils_ap(
						$author$project$VegaLite$markChannelProperties(mc),
						$author$project$VegaLite$filterProperties(f)));
		}
	});
var $author$project$VegaLite$color = function (markProps) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'color',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, markProps))));
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$VegaLite$VLData = 12;
var $author$project$VegaLite$dataTypeLabel = function (dType) {
	switch (dType.$) {
		case 0:
			return 'number';
		case 1:
			return 'boolean';
		case 2:
			var dateFmt = dType.a;
			return (dateFmt === '') ? 'date' : ('date:\'' + (dateFmt + '\''));
		default:
			var dateFmt = dType.a;
			return (dateFmt === '') ? 'utc' : ('utc:\'' + (dateFmt + '\''));
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$VegaLite$formatProperties = function (fmt) {
	switch (fmt.$) {
		case 0:
			var propertyName = fmt.a;
			return ($elm$core$String$trim(propertyName) === '') ? _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('json'))
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('json')),
					_Utils_Tuple2(
					'property',
					$elm$json$Json$Encode$string(propertyName))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('csv'))
				]);
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('tsv'))
				]);
		case 3:
			var delim = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('dsv')),
					_Utils_Tuple2(
					'delimiter',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromChar(delim)))
				]);
		case 4:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('arrow'))
				]);
		case 5:
			var objectSet = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'feature',
					$elm$json$Json$Encode$string(objectSet))
				]);
		case 6:
			var objectSet = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'mesh',
					$elm$json$Json$Encode$string(objectSet))
				]);
		default:
			var fmts = fmt.a;
			return _Utils_eq(fmts, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('parse', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'parse',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							function (_v1) {
								var field = _v1.a;
								var fFormat = _v1.b;
								return _Utils_Tuple2(
									field,
									$elm$json$Json$Encode$string(
										$author$project$VegaLite$dataTypeLabel(fFormat)));
							},
							fmts)))
				]);
	}
};
var $author$project$VegaLite$dataFromUrl = F2(
	function (u, fmts) {
		return _Utils_eq(fmts, _List_Nil) ? _Utils_Tuple2(
			12,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						$elm$json$Json$Encode$string(u))
					]))) : _Utils_Tuple2(
			12,
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						$elm$json$Json$Encode$string(u)),
						_Utils_Tuple2(
						'format',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $author$project$VegaLite$formatProperties, fmts)))
					])));
	});
var $author$project$VegaLite$VLDescription = 2;
var $author$project$VegaLite$description = function (s) {
	return _Utils_Tuple2(
		2,
		$elm$json$Json$Encode$string(s));
};
var $author$project$VegaLite$VLEncoding = 17;
var $author$project$VegaLite$encoding = function (channels) {
	return _Utils_Tuple2(
		17,
		$elm$json$Json$Encode$object(channels));
};
var $author$project$VegaLite$MAggregate = function (a) {
	return {$: 14, a: a};
};
var $author$project$VegaLite$mAggregate = $author$project$VegaLite$MAggregate;
var $author$project$VegaLite$MName = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$mName = $author$project$VegaLite$MName;
var $author$project$VegaLite$Mean = {$: 7};
var $author$project$VegaLite$opMean = $author$project$VegaLite$Mean;
var $author$project$VegaLite$PName = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$pName = $author$project$VegaLite$PName;
var $author$project$VegaLite$Ordinal = 1;
var $author$project$VegaLite$PmType = function (a) {
	return {$: 6, a: a};
};
var $author$project$VegaLite$pOrdinal = $author$project$VegaLite$PmType(1);
var $author$project$GalleryTable$path = 'https://cdn.jsdelivr.net/npm/vega-datasets@2.2/data/';
var $author$project$VegaLite$AxLabelAlign = function (a) {
	return {$: 20, a: a};
};
var $author$project$VegaLite$AxGridColor = function (a) {
	return {$: 73, a: a};
};
var $author$project$VegaLite$Str = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$axGridColor = function (s) {
	return $author$project$VegaLite$AxGridColor(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxGridDash = function (a) {
	return {$: 74, a: a};
};
var $author$project$VegaLite$Nums = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$axGridDash = function (ns) {
	return $author$project$VegaLite$AxGridDash(
		$author$project$VegaLite$Nums(ns));
};
var $author$project$VegaLite$AxGridDashOffset = function (a) {
	return {$: 75, a: a};
};
var $author$project$VegaLite$Num = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$axGridDashOffset = function (n) {
	return $author$project$VegaLite$AxGridDashOffset(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxGridOpacity = function (a) {
	return {$: 76, a: a};
};
var $author$project$VegaLite$axGridOpacity = function (n) {
	return $author$project$VegaLite$AxGridOpacity(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxGridWidth = function (a) {
	return {$: 77, a: a};
};
var $author$project$VegaLite$axGridWidth = function (n) {
	return $author$project$VegaLite$AxGridWidth(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$axLabelAlign = $author$project$VegaLite$AxLabelAlign;
var $author$project$VegaLite$AxLabelBaseline = function (a) {
	return {$: 22, a: a};
};
var $author$project$VegaLite$axLabelBaseline = $author$project$VegaLite$AxLabelBaseline;
var $author$project$VegaLite$AxLabelColor = function (a) {
	return {$: 24, a: a};
};
var $author$project$VegaLite$axLabelColor = function (s) {
	return $author$project$VegaLite$AxLabelColor(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxLabelFont = function (a) {
	return {$: 28, a: a};
};
var $author$project$VegaLite$axLabelFont = function (s) {
	return $author$project$VegaLite$AxLabelFont(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxLabelFontSize = function (a) {
	return {$: 29, a: a};
};
var $author$project$VegaLite$axLabelFontSize = function (n) {
	return $author$project$VegaLite$AxLabelFontSize(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxLabelFontStyle = function (a) {
	return {$: 30, a: a};
};
var $author$project$VegaLite$axLabelFontStyle = function (s) {
	return $author$project$VegaLite$AxLabelFontStyle(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxLabelFontWeight = function (a) {
	return {$: 31, a: a};
};
var $author$project$VegaLite$axLabelFontWeight = $author$project$VegaLite$AxLabelFontWeight;
var $author$project$VegaLite$AxLabelOffset = function (a) {
	return {$: 34, a: a};
};
var $author$project$VegaLite$axLabelOffset = function (n) {
	return $author$project$VegaLite$AxLabelOffset(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxLabelOpacity = function (a) {
	return {$: 35, a: a};
};
var $author$project$VegaLite$axLabelOpacity = function (n) {
	return $author$project$VegaLite$AxLabelOpacity(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxLabelPadding = function (a) {
	return {$: 37, a: a};
};
var $author$project$VegaLite$axLabelPadding = function (n) {
	return $author$project$VegaLite$AxLabelPadding(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxTickColor = function (a) {
	return {$: 43, a: a};
};
var $author$project$VegaLite$axTickColor = function (s) {
	return $author$project$VegaLite$AxTickColor(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxTickDash = function (a) {
	return {$: 45, a: a};
};
var $author$project$VegaLite$axTickDash = function (ns) {
	return $author$project$VegaLite$AxTickDash(
		$author$project$VegaLite$Nums(ns));
};
var $author$project$VegaLite$AxTickDashOffset = function (a) {
	return {$: 46, a: a};
};
var $author$project$VegaLite$axTickDashOffset = function (n) {
	return $author$project$VegaLite$AxTickDashOffset(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxTickOpacity = function (a) {
	return {$: 49, a: a};
};
var $author$project$VegaLite$axTickOpacity = function (n) {
	return $author$project$VegaLite$AxTickOpacity(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxTickSize = function (a) {
	return {$: 52, a: a};
};
var $author$project$VegaLite$axTickSize = function (n) {
	return $author$project$VegaLite$AxTickSize(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$AxTickWidth = function (a) {
	return {$: 53, a: a};
};
var $author$project$VegaLite$axTickWidth = function (n) {
	return $author$project$VegaLite$AxTickWidth(
		$author$project$VegaLite$Num(n));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$VegaLite$maybeNumExpr = F2(
	function (objName, n) {
		if (!n.$) {
			var maybeX = n.a;
			if (!maybeX.$) {
				var x = maybeX.a;
				return (x === 1) ? _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$bool(true))
					]) : _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$float(x))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$bool(false))
					]);
			}
		} else {
			var s = n.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					objName,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(s))
							])))
				]);
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$VegaLite$sideSpec = function (side) {
	switch (side.$) {
		case 0:
			return $elm$json$Json$Encode$string('top');
		case 1:
			return $elm$json$Json$Encode$string('bottom');
		case 2:
			return $elm$json$Json$Encode$string('left');
		case 3:
			return $elm$json$Json$Encode$string('right');
		default:
			var ex = side.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(ex))
					]));
	}
};
var $author$project$VegaLite$strokeCapSpec = function (cap) {
	switch (cap.$) {
		case 0:
			return $elm$json$Json$Encode$string('butt');
		case 1:
			return $elm$json$Json$Encode$string('round');
		case 2:
			return $elm$json$Json$Encode$string('square');
		default:
			var s = cap.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$tickBandSpec = function (tb) {
	switch (tb.$) {
		case 0:
			return $elm$json$Json$Encode$string('center');
		case 1:
			return $elm$json$Json$Encode$string('extent');
		default:
			var s = tb.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$VegaLite$axisProperty = function (axisProp) {
	switch (axisProp.$) {
		case 0:
			var aps = axisProp.a;
			if (!aps.b) {
				return _List_fromArray(
					[
						$author$project$VegaLite$ariaProperty(
						$author$project$VegaLite$ArAria(false))
					]);
			} else {
				return A2($elm$core$List$map, $author$project$VegaLite$ariaProperty, aps);
			}
		case 1:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'bandPosition', n);
		case 79:
			var predicate = axisProp.a;
			var cap = axisProp.b;
			var firstProp = A2(
				$elm$core$Basics$composeR,
				$elm$core$List$head,
				$elm$core$Maybe$withDefault(
					_Utils_Tuple2('', $elm$json$Json$Encode$null)));
			var _v2 = function () {
				switch (cap.$) {
					case 0:
						var ha1 = cap.a;
						var ha2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$AxLabelAlign(ha1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelAlign(ha2))));
					case 1:
						var va1 = cap.a;
						var va2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelBaseline(va1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelBaseline(va2))));
					case 2:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelColor(c1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelColor(c2))));
					case 3:
						var f1 = cap.a;
						var f2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFont(f1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFont(f2))));
					case 4:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontSize(s1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontSize(s2))));
					case 5:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontStyle(s1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontStyle(s2))));
					case 6:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontWeight(w1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelFontWeight(w2))));
					case 7:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelOffset(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelOffset(o2))));
					case 8:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelOpacity(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelOpacity(o2))));
					case 9:
						var p1 = cap.a;
						var p2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelPadding(p1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axLabelPadding(p2))));
					case 10:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickColor(c1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickColor(c2))));
					case 11:
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickDash(d1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickDash(d2))));
					case 12:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickDashOffset(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickDashOffset(o2))));
					case 13:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickOpacity(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickOpacity(o2))));
					case 19:
						var s1 = cap.a;
						var s2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickSize(s1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickSize(s2))));
					case 14:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickWidth(w1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axTickWidth(w2))));
					case 15:
						var c1 = cap.a;
						var c2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridColor(c1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridColor(c2))));
					case 16:
						var d1 = cap.a;
						var d2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridDash(d1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridDash(d2))));
					case 17:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridDashOffset(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridDashOffset(o2))));
					case 18:
						var o1 = cap.a;
						var o2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridOpacity(o1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridOpacity(o2))));
					default:
						var w1 = cap.a;
						var w2 = cap.b;
						return _Utils_Tuple2(
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridWidth(w1))),
							firstProp(
								$author$project$VegaLite$axisProperty(
									$author$project$VegaLite$axGridWidth(w2))));
				}
			}();
			var ifProp = _v2.a;
			var elseProp = _v2.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					ifProp.a,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'condition',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'test',
											$author$project$VegaLite$booleanOpSpec(predicate)),
											_Utils_Tuple2('value', ifProp.b)
										]))),
								_Utils_Tuple2('value', elseProp.b)
							])))
				]);
		case 15:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'format', s);
		case 16:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 17:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 18:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'formatType', s);
		case 72:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 73:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'gridColor', s);
		case 74:
			var ns = axisProp.a;
			return A2($author$project$VegaLite$numsExpr, 'gridDash', ns);
		case 75:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'gridDashOffset', n);
		case 76:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'gridOpacity', n);
		case 77:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'gridWidth', n);
		case 19:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'labels', b);
		case 20:
			var ha = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 22:
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 23:
			var mn = axisProp.a;
			return A2($author$project$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 21:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelAngle', n);
		case 24:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelColor', s);
		case 25:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelExpr', s);
		case 26:
			var mn = axisProp.a;
			if (!mn.$) {
				var n = mn.a;
				return (n === 1) ? _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$bool(true))
					]) : _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$float(n))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$bool(false))
					]);
			}
		case 27:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelFlushOffset', n);
		case 28:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFont', s);
		case 29:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelFontSize', n);
		case 30:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFontStyle', s);
		case 31:
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 33:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelLimit', n);
		case 32:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelLineHeight', n);
		case 34:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelOffset', n);
		case 35:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelOpacity', n);
		case 36:
			var strat = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$author$project$VegaLite$overlapStrategySpec(strat))
				]);
		case 37:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelPadding', n);
		case 38:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelSeparation', n);
		case 8:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'domain', b);
		case 9:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 10:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'domainColor', s);
		case 11:
			var ns = axisProp.a;
			return A2($author$project$VegaLite$numsExpr, 'domainDash', ns);
		case 12:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'domainDashOffset', n);
		case 13:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'domainOpacity', n);
		case 14:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'domainWidth', n);
		case 71:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'grid', b);
		case 2:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'maxExtent', n);
		case 3:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'minExtent', n);
		case 4:
			var side = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$author$project$VegaLite$sideSpec(side))
				]);
		case 5:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'offset', n);
		case 6:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'position', n);
		case 40:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'translate', n);
		case 39:
			var ss = axisProp.a;
			if (ss.b && (!ss.b.b)) {
				var s = ss.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						$elm$json$Json$Encode$string(s))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss))
					]);
			}
		case 7:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'zindex', n);
		case 51:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'ticks', b);
		case 41:
			var tb = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$author$project$VegaLite$tickBandSpec(tb))
				]);
		case 42:
			var c = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 43:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'tickColor', s);
		case 44:
			var tc = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$author$project$VegaLite$scaleNiceSpec(tc))
				]);
		case 45:
			var ns = axisProp.a;
			return A2($author$project$VegaLite$numsExpr, 'tickDash', ns);
		case 46:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickDashOffset', n);
		case 47:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'tickExtra', b);
		case 48:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickOffset', n);
		case 49:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickOpacity', n);
		case 50:
			var b = axisProp.a;
			return A2($author$project$VegaLite$booExpr, 'tickRound', b);
		case 78:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickMinStep', n);
		case 52:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickSize', n);
		case 53:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'tickWidth', n);
		case 54:
			var vals = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'values',
					$author$project$VegaLite$dataValuesSpecs(vals))
				]);
		case 55:
			var s = axisProp.a;
			if (!s.$) {
				var ttl = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'title',
						$author$project$VegaLite$multilineTextSpec(ttl))
					]);
			} else {
				return A2($author$project$VegaLite$strExpr, 'title', s);
			}
		case 56:
			var al = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$author$project$VegaLite$hAlignSpec(al))
				]);
		case 58:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleAngle', n);
		case 57:
			var an = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$author$project$VegaLite$anchorSpec(an))
				]);
		case 59:
			var va = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 60:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleColor', s);
		case 61:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFont', s);
		case 62:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleFontSize', n);
		case 63:
			var s = axisProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFontStyle', s);
		case 64:
			var fw = axisProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 65:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLimit', n);
		case 66:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLineHeight', n);
		case 67:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleOpacity', n);
		case 68:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titlePadding', n);
		case 69:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleX', n);
		default:
			var n = axisProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleY', n);
	}
};
var $author$project$VegaLite$imMethodLabel = function (method) {
	switch (method) {
		case 0:
			return 'value';
		case 1:
			return 'mean';
		case 2:
			return 'median';
		case 3:
			return 'max';
		default:
			return 'min';
	}
};
var $author$project$VegaLite$imputeProperty = function (ip) {
	switch (ip.$) {
		case 0:
			if (!ip.a.$) {
				if (!ip.b.$) {
					var n1 = ip.a.a;
					var n2 = ip.b.a;
					return _Utils_Tuple2(
						'frame',
						A2(
							$elm$json$Json$Encode$list,
							$elm$json$Json$Encode$int,
							_List_fromArray(
								[n1, n2])));
				} else {
					var n1 = ip.a.a;
					var _v2 = ip.b;
					return _Utils_Tuple2(
						'frame',
						$author$project$VegaLite$toList(
							_List_fromArray(
								[
									$elm$json$Json$Encode$int(n1),
									$elm$json$Json$Encode$null
								])));
				}
			} else {
				if (!ip.b.$) {
					var _v1 = ip.a;
					var n2 = ip.b.a;
					return _Utils_Tuple2(
						'frame',
						$author$project$VegaLite$toList(
							_List_fromArray(
								[
									$elm$json$Json$Encode$null,
									$elm$json$Json$Encode$int(n2)
								])));
				} else {
					var _v3 = ip.a;
					var _v4 = ip.b;
					return _Utils_Tuple2(
						'frame',
						$author$project$VegaLite$toList(
							_List_fromArray(
								[$elm$json$Json$Encode$null, $elm$json$Json$Encode$null])));
				}
			}
		case 1:
			var dVals = ip.a;
			return _Utils_Tuple2(
				'keyvals',
				$author$project$VegaLite$dataValuesSpecs(dVals));
		case 2:
			var start = ip.a;
			var stop = ip.b;
			var step = ip.c;
			return _Utils_Tuple2(
				'keyvals',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'start',
							$elm$json$Json$Encode$float(start)),
							_Utils_Tuple2(
							'stop',
							$elm$json$Json$Encode$float(stop)),
							_Utils_Tuple2(
							'step',
							$elm$json$Json$Encode$float(step))
						])));
		case 3:
			var method = ip.a;
			return _Utils_Tuple2(
				'method',
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$imMethodLabel(method)));
		case 5:
			var dVal = ip.a;
			return _Utils_Tuple2(
				'value',
				$author$project$VegaLite$dataValueSpec(dVal));
		default:
			var fields = ip.a;
			return _Utils_Tuple2(
				'groupby',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fields));
	}
};
var $author$project$VegaLite$stackOffsetSpec = function (sp) {
	switch (sp) {
		case 0:
			return $elm$json$Json$Encode$string('zero');
		case 1:
			return $elm$json$Json$Encode$string('normalize');
		case 2:
			return $elm$json$Json$Encode$string('center');
		default:
			return $elm$json$Json$Encode$null;
	}
};
var $author$project$VegaLite$stackOffsetProperty = function (offset) {
	return _Utils_Tuple2(
		'stack',
		$author$project$VegaLite$stackOffsetSpec(offset));
};
var $author$project$VegaLite$positionChannelProperty = function (pDef) {
	switch (pDef.$) {
		case 0:
			var s = pDef.a;
			return _Utils_Tuple2(
				'field',
				$elm$json$Json$Encode$string(s));
		case 1:
			var d = pDef.a;
			return _Utils_Tuple2(
				'datum',
				$author$project$VegaLite$dataValueSpec(d));
		case 6:
			var measure = pDef.a;
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$measurementLabel(measure)));
		case 7:
			var bps = pDef.a;
			return $author$project$VegaLite$bin(bps);
		case 8:
			return _Utils_Tuple2(
				'bin',
				$elm$json$Json$Encode$string('binned'));
		case 11:
			var op = pDef.a;
			return _Utils_Tuple2(
				'aggregate',
				$author$project$VegaLite$operationSpec(op));
		case 9:
			var tu = pDef.a;
			return _Utils_Tuple2(
				'timeUnit',
				$author$project$VegaLite$timeUnitSpec(tu));
		case 10:
			var t = pDef.a;
			return _Utils_Tuple2(
				'title',
				$author$project$VegaLite$multilineTextSpec(t));
		case 14:
			var sps = pDef.a;
			_v1$4:
			while (true) {
				if (!sps.b) {
					return _Utils_Tuple2('sort', $elm$json$Json$Encode$null);
				} else {
					if (!sps.b.b) {
						switch (sps.a.$) {
							case 0:
								var _v2 = sps.a;
								return _Utils_Tuple2(
									'sort',
									$elm$json$Json$Encode$string('ascending'));
							case 1:
								var _v3 = sps.a;
								return _Utils_Tuple2(
									'sort',
									$elm$json$Json$Encode$string('descending'));
							case 2:
								var dvs = sps.a.a;
								return _Utils_Tuple2(
									'sort',
									$author$project$VegaLite$dataValuesSpecs(dvs));
							default:
								break _v1$4;
						}
					} else {
						break _v1$4;
					}
				}
			}
			return _Utils_Tuple2(
				'sort',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$sortProperties, sps)));
		case 15:
			var x = pDef.a;
			return _Utils_Tuple2(
				'bandPosition',
				$elm$json$Json$Encode$float(x));
		case 12:
			var sps = pDef.a;
			return _Utils_eq(sps, _List_Nil) ? _Utils_Tuple2('scale', $elm$json$Json$Encode$null) : _Utils_Tuple2(
				'scale',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$scaleProperty, sps)));
		case 13:
			var aps = pDef.a;
			return _Utils_eq(aps, _List_Nil) ? _Utils_Tuple2('axis', $elm$json$Json$Encode$null) : _Utils_Tuple2(
				'axis',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisProperty, aps)));
		case 16:
			var so = pDef.a;
			return $author$project$VegaLite$stackOffsetProperty(so);
		case 5:
			var arr = pDef.a;
			return _Utils_Tuple2(
				'field',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'repeat',
							$elm$json$Json$Encode$string(
								$author$project$VegaLite$arrangementLabel(arr)))
						])));
		case 2:
			return _Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string('width'));
		case 3:
			return _Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$string('height'));
		case 4:
			var x = pDef.a;
			return _Utils_Tuple2(
				'value',
				$elm$json$Json$Encode$float(x));
		default:
			var ips = pDef.a;
			return _Utils_Tuple2(
				'impute',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$imputeProperty, ips)));
	}
};
var $author$project$VegaLite$positionLabel = function (pChannel) {
	switch (pChannel) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'theta';
		case 5:
			return 'theta2';
		case 6:
			return 'radius';
		case 7:
			return 'radius2';
		case 12:
			return 'xError';
		case 13:
			return 'yError';
		case 14:
			return 'xError2';
		case 15:
			return 'yError2';
		case 8:
			return 'longitude';
		case 9:
			return 'latitude';
		case 10:
			return 'longitude2';
		default:
			return 'latitude2';
	}
};
var $author$project$VegaLite$position = F2(
	function (pos, pDefs) {
		return $elm$core$List$cons(
			_Utils_Tuple2(
				$author$project$VegaLite$positionLabel(pos),
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$positionChannelProperty, pDefs))));
	});
var $author$project$VegaLite$Rect = 11;
var $author$project$VegaLite$VLMark = 14;
var $author$project$VegaLite$markLabel = function (m) {
	switch (m) {
		case 0:
			return 'arc';
		case 1:
			return 'area';
		case 2:
			return 'bar';
		case 3:
			return 'boxplot';
		case 6:
			return 'circle';
		case 4:
			return 'errorband';
		case 5:
			return 'errorbar';
		case 8:
			return 'image';
		case 9:
			return 'line';
		case 7:
			return 'geoshape';
		case 10:
			return 'point';
		case 11:
			return 'rect';
		case 12:
			return 'rule';
		case 13:
			return 'square';
		case 14:
			return 'text';
		case 15:
			return 'tick';
		default:
			return 'trail';
	}
};
var $author$project$VegaLite$TTNone = 2;
var $author$project$VegaLite$blendModeSpec = function (bm) {
	switch (bm.$) {
		case 0:
			return $elm$json$Json$Encode$null;
		case 1:
			return $elm$json$Json$Encode$string('multiply');
		case 2:
			return $elm$json$Json$Encode$string('screen');
		case 3:
			return $elm$json$Json$Encode$string('overlay');
		case 4:
			return $elm$json$Json$Encode$string('darken');
		case 5:
			return $elm$json$Json$Encode$string('lighten');
		case 6:
			return $elm$json$Json$Encode$string('color-dodge');
		case 7:
			return $elm$json$Json$Encode$string('color-burn');
		case 8:
			return $elm$json$Json$Encode$string('hard-light');
		case 9:
			return $elm$json$Json$Encode$string('soft-light');
		case 10:
			return $elm$json$Json$Encode$string('difference');
		case 11:
			return $elm$json$Json$Encode$string('exclusion');
		case 12:
			return $elm$json$Json$Encode$string('hue');
		case 13:
			return $elm$json$Json$Encode$string('saturation');
		case 14:
			return $elm$json$Json$Encode$string('color');
		case 15:
			return $elm$json$Json$Encode$string('luminosity');
		default:
			var s = bm.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$colorGradientLabel = function (gr) {
	if (!gr) {
		return 'linear';
	} else {
		return 'radial';
	}
};
var $author$project$VegaLite$cursorSpec = function (cur) {
	switch (cur.$) {
		case 0:
			return $elm$json$Json$Encode$string('auto');
		case 1:
			return $elm$json$Json$Encode$string('default');
		case 2:
			return $elm$json$Json$Encode$string('none');
		case 3:
			return $elm$json$Json$Encode$string('context-menu');
		case 4:
			return $elm$json$Json$Encode$string('help');
		case 5:
			return $elm$json$Json$Encode$string('pointer');
		case 6:
			return $elm$json$Json$Encode$string('progress');
		case 7:
			return $elm$json$Json$Encode$string('wait');
		case 8:
			return $elm$json$Json$Encode$string('cell');
		case 9:
			return $elm$json$Json$Encode$string('crosshair');
		case 10:
			return $elm$json$Json$Encode$string('text');
		case 11:
			return $elm$json$Json$Encode$string('vertical-text');
		case 12:
			return $elm$json$Json$Encode$string('alias');
		case 13:
			return $elm$json$Json$Encode$string('copy');
		case 14:
			return $elm$json$Json$Encode$string('move');
		case 15:
			return $elm$json$Json$Encode$string('no-drop');
		case 16:
			return $elm$json$Json$Encode$string('not-allowed');
		case 17:
			return $elm$json$Json$Encode$string('all-scroll');
		case 18:
			return $elm$json$Json$Encode$string('col-resize');
		case 19:
			return $elm$json$Json$Encode$string('row-resize');
		case 20:
			return $elm$json$Json$Encode$string('n-resize');
		case 21:
			return $elm$json$Json$Encode$string('e-resize');
		case 22:
			return $elm$json$Json$Encode$string('s-resize');
		case 23:
			return $elm$json$Json$Encode$string('w-resize');
		case 24:
			return $elm$json$Json$Encode$string('ne-resize');
		case 25:
			return $elm$json$Json$Encode$string('nw-resize');
		case 26:
			return $elm$json$Json$Encode$string('se-resize');
		case 27:
			return $elm$json$Json$Encode$string('sw-resize');
		case 28:
			return $elm$json$Json$Encode$string('ew-resize');
		case 29:
			return $elm$json$Json$Encode$string('ns-resize');
		case 30:
			return $elm$json$Json$Encode$string('nesw-resize');
		case 31:
			return $elm$json$Json$Encode$string('nwse-resize');
		case 32:
			return $elm$json$Json$Encode$string('zoom-in');
		case 33:
			return $elm$json$Json$Encode$string('zoom-out');
		case 34:
			return $elm$json$Json$Encode$string('grab');
		case 35:
			return $elm$json$Json$Encode$string('grabbing');
		default:
			var s = cur.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$extentSpec = function (ext) {
	switch (ext.$) {
		case 0:
			return $elm$json$Json$Encode$string('ci');
		case 1:
			return $elm$json$Json$Encode$string('stderr');
		case 2:
			return $elm$json$Json$Encode$string('stdev');
		case 3:
			return $elm$json$Json$Encode$string('iqr');
		case 4:
			return $elm$json$Json$Encode$string('min-max');
		default:
			var sc = ext.a;
			return $elm$json$Json$Encode$float(sc);
	}
};
var $author$project$VegaLite$stopSpec = function (_v0) {
	var x = _v0.a;
	var c = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'offset',
				$elm$json$Json$Encode$float(x)),
				_Utils_Tuple2(
				'color',
				$elm$json$Json$Encode$string(c))
			]));
};
var $author$project$VegaLite$gradientProperty = function (gp) {
	switch (gp.$) {
		case 0:
			var x = gp.a;
			return _Utils_Tuple2(
				'x1',
				$elm$json$Json$Encode$float(x));
		case 1:
			var x = gp.a;
			return _Utils_Tuple2(
				'y1',
				$elm$json$Json$Encode$float(x));
		case 2:
			var x = gp.a;
			return _Utils_Tuple2(
				'x2',
				$elm$json$Json$Encode$float(x));
		case 3:
			var x = gp.a;
			return _Utils_Tuple2(
				'y2',
				$elm$json$Json$Encode$float(x));
		case 4:
			var x = gp.a;
			return _Utils_Tuple2(
				'r1',
				$elm$json$Json$Encode$float(x));
		case 5:
			var x = gp.a;
			return _Utils_Tuple2(
				'r2',
				$elm$json$Json$Encode$float(x));
		default:
			var grs = gp.a;
			return _Utils_Tuple2(
				'stops',
				A2($elm$json$Json$Encode$list, $author$project$VegaLite$stopSpec, grs));
	}
};
var $author$project$VegaLite$markInterpolationSpec = function (interp) {
	switch (interp.$) {
		case 7:
			return $elm$json$Json$Encode$string('linear');
		case 8:
			return $elm$json$Json$Encode$string('linear-closed');
		case 12:
			return $elm$json$Json$Encode$string('step');
		case 11:
			return $elm$json$Json$Encode$string('step-before');
		case 10:
			return $elm$json$Json$Encode$string('step-after');
		case 0:
			return $elm$json$Json$Encode$string('basis');
		case 2:
			return $elm$json$Json$Encode$string('basis-open');
		case 1:
			return $elm$json$Json$Encode$string('basis-closed');
		case 4:
			return $elm$json$Json$Encode$string('cardinal');
		case 6:
			return $elm$json$Json$Encode$string('cardinal-open');
		case 5:
			return $elm$json$Json$Encode$string('cardinal-closed');
		case 3:
			return $elm$json$Json$Encode$string('bundle');
		case 9:
			return $elm$json$Json$Encode$string('monotone');
		default:
			var s = interp.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$strExprMultiline = F2(
	function (objName, s) {
		switch (s.$) {
			case 0:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$author$project$VegaLite$multilineTextSpec(x))
					]);
			case 1:
				return _List_fromArray(
					[
						_Utils_Tuple2(objName, $elm$json$Json$Encode$null)
					]);
			default:
				var x = s.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						objName,
						$elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'expr',
									$elm$json$Json$Encode$string(x))
								])))
					]);
		}
	});
var $author$project$VegaLite$strokeJoinSpec = function (jn) {
	switch (jn.$) {
		case 0:
			return $elm$json$Json$Encode$string('miter');
		case 1:
			return $elm$json$Json$Encode$string('round');
		case 2:
			return $elm$json$Json$Encode$string('bevel');
		default:
			var s = jn.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$textDirectionSpec = function (td) {
	switch (td.$) {
		case 0:
			return $elm$json$Json$Encode$string('ltr');
		case 1:
			return $elm$json$Json$Encode$string('rtl');
		default:
			var s = td.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$ttContentSpec = function (ttContent) {
	switch (ttContent) {
		case 0:
			return $elm$json$Json$Encode$string('encoding');
		case 1:
			return $elm$json$Json$Encode$string('data');
		default:
			return $elm$json$Json$Encode$string('null');
	}
};
var $author$project$VegaLite$lineMarkerSpec = function (pm) {
	if (!pm.$) {
		return $elm$json$Json$Encode$bool(false);
	} else {
		var mps = pm.a;
		return $elm$json$Json$Encode$object(
			A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps));
	}
};
var $author$project$VegaLite$markProperty = function (mProp) {
	switch (mProp.$) {
		case 2:
			var aps = mProp.a;
			if (!aps.b) {
				return _List_fromArray(
					[
						$author$project$VegaLite$ariaProperty(
						$author$project$VegaLite$ArAria(false))
					]);
			} else {
				return A2($elm$core$List$map, $author$project$VegaLite$ariaProperty, aps);
			}
		case 30:
			var b = mProp.a;
			return A2($author$project$VegaLite$booExpr, 'filled', b);
		case 6:
			var bm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'blend',
					$author$project$VegaLite$blendModeSpec(bm))
				]);
		case 9:
			var b = mProp.a;
			return A2($author$project$VegaLite$booExpr, 'clip', b);
		case 10:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('color', $elm$json$Json$Encode$null)
						]) : A2($author$project$VegaLite$strExpr, 'color', s);
				default:
					return A2($author$project$VegaLite$strExpr, 'color', s);
			}
		case 12:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadius', n);
		case 13:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadiusEnd', n);
		case 16:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadiusBottomLeft', n);
		case 17:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadiusBottomRight', n);
		case 14:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadiusTopLeft', n);
		case 15:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadiusTopRight', n);
		case 18:
			var cur = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$author$project$VegaLite$cursorSpec(cur))
				]);
		case 27:
			var ext = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'extent',
					$author$project$VegaLite$extentSpec(ext))
				]);
		case 19:
			var s = mProp.a;
			return A2($author$project$VegaLite$strExpr, 'href', s);
		case 49:
			var bl = mProp.a;
			if (!bl.$) {
				var b = bl.a;
				return b ? _List_fromArray(
					[
						_Utils_Tuple2(
						'invalid',
						$elm$json$Json$Encode$string('filter'))
					]) : _List_fromArray(
					[
						_Utils_Tuple2('invalid', $elm$json$Json$Encode$null)
					]);
			} else {
				return A2($author$project$VegaLite$booExpr, 'invalid', bl);
			}
		case 28:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('fill', $elm$json$Json$Encode$null)
						]) : A2($author$project$VegaLite$strExpr, 'fill', s);
				default:
					return A2($author$project$VegaLite$strExpr, 'fill', s);
			}
		case 29:
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fill',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$map, $author$project$VegaLite$gradientProperty, props))))
				]);
		case 11:
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'color',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$map, $author$project$VegaLite$gradientProperty, props))))
				]);
		case 55:
			var cGrad = mProp.a;
			var props = mProp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'stroke',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$colorGradientLabel(cGrad))),
							A2($elm$core$List$map, $author$project$VegaLite$gradientProperty, props))))
				]);
		case 54:
			var s = mProp.a;
			switch (s.$) {
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]);
				case 0:
					var clr = s.a;
					return ($elm$core$String$trim(clr) === '') ? _List_fromArray(
						[
							_Utils_Tuple2('stroke', $elm$json$Json$Encode$null)
						]) : A2($author$project$VegaLite$strExpr, 'stroke', s);
				default:
					return A2($author$project$VegaLite$strExpr, 'stroke', s);
			}
		case 56:
			var sc = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$author$project$VegaLite$strokeCapSpec(sc))
				]);
		case 59:
			var sj = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$author$project$VegaLite$strokeJoinSpec(sj))
				]);
		case 60:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'strokeMiterLimit', n);
		case 41:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'opacity', n);
		case 31:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'fillOpacity', n);
		case 61:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'strokeOpacity', n);
		case 62:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'strokeWidth', n);
		case 57:
			var ns = mProp.a;
			return A2($author$project$VegaLite$numsExpr, 'strokeDash', ns);
		case 58:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'strokeDashOffset', n);
		case 63:
			var styles = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styles))
				]);
		case 37:
			var interp = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interpolate',
					$author$project$VegaLite$markInterpolationSpec(interp))
				]);
		case 64:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'tension', n);
		case 45:
			var orient = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$markOrientationLabel(orient)))
				]);
		case 51:
			var sym = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'shape',
					$author$project$VegaLite$symbolSpec(sym))
				]);
		case 53:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'size', n);
		case 1:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'angle', n);
		case 0:
			var al = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'align',
					$author$project$VegaLite$hAlignSpec(al))
				]);
		case 4:
			var va = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 25:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'dx', n);
		case 26:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'dy', n);
		case 32:
			var s = mProp.a;
			return A2($author$project$VegaLite$strExpr, 'font', s);
		case 33:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'fontSize', n);
		case 34:
			var s = mProp.a;
			return A2($author$project$VegaLite$strExpr, 'fontStyle', s);
		case 35:
			var w = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$author$project$VegaLite$fontWeightSpec(w))
				]);
		case 48:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'radius', n);
		case 36:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'innerRadius', n);
		case 42:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'outerRadius', n);
		case 46:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'padAngle', n);
		case 65:
			var s = mProp.a;
			return A2($author$project$VegaLite$strExprMultiline, 'text', s);
		case 39:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'lineHeight', n);
		case 21:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'limit', n);
		case 22:
			var s = mProp.a;
			return A2($author$project$VegaLite$strExpr, 'ellipsis', s);
		case 23:
			var td = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'dir',
					$author$project$VegaLite$textDirectionSpec(td))
				]);
		case 66:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'theta', n);
		case 67:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'theta2', n);
		case 83:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'thetaOffset', n);
		case 84:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'theta2Offset', n);
		case 5:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'binSpacing', n);
		case 20:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'continuousBandSize', n);
		case 24:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'discreteBandSize', n);
		case 52:
			var b = mProp.a;
			return A2($author$project$VegaLite$booExpr, 'shortTimeLabels', b);
		case 3:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'bandSize', n);
		case 68:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'thickness', n);
		case 50:
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'rule',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'rule',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
					]);
			}
		case 7:
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'borders',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
				]);
		case 40:
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'median',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'median',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
					]);
			}
		case 8:
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'box',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'box',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
					]);
			}
		case 43:
			var props = mProp.a;
			if (!props.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'outliers',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'outliers',
						$elm$json$Json$Encode$object(
							A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
					]);
			}
		case 69:
			var props = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'ticks',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, props)))
				]);
		case 70:
			var ttContent = mProp.a;
			return (ttContent === 2) ? _List_fromArray(
				[
					_Utils_Tuple2('tooltip', $elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'tooltip',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'content',
								$author$project$VegaLite$ttContentSpec(ttContent))
							])))
				]);
		case 47:
			var pm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'point',
					$author$project$VegaLite$pointMarkerSpec(pm))
				]);
		case 38:
			var lm = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'line',
					$author$project$VegaLite$lineMarkerSpec(lm))
				]);
		case 71:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'width', n);
		case 72:
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'width',
					$elm$json$Json$Encode$object(
						A2($author$project$VegaLite$numExpr, 'band', n)))
				]);
		case 73:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'height', n);
		case 74:
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'height',
					$elm$json$Json$Encode$object(
						A2($author$project$VegaLite$numExpr, 'band', n)))
				]);
		case 75:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'x', n);
		case 76:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'y', n);
		case 77:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'x2', n);
		case 78:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'y2', n);
		case 44:
			var b = mProp.a;
			return A2($author$project$VegaLite$booExpr, 'order', b);
		case 79:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'xOffset', n);
		case 81:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'x2Offset', n);
		case 80:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'yOffset', n);
		case 82:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'y2Offset', n);
		case 85:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'radiusOffset', n);
		case 86:
			var n = mProp.a;
			return A2($author$project$VegaLite$numExpr, 'radius2Offset', n);
		default:
			var b = mProp.a;
			return A2($author$project$VegaLite$booExpr, 'aspect', b);
	}
};
var $author$project$VegaLite$pointMarkerSpec = function (pm) {
	switch (pm.$) {
		case 0:
			return $elm$json$Json$Encode$string('transparent');
		case 1:
			return $elm$json$Json$Encode$bool(false);
		default:
			var mps = pm.a;
			return _Utils_eq(mps, _List_Nil) ? $elm$json$Json$Encode$bool(true) : $elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps));
	}
};
var $author$project$VegaLite$mark = F2(
	function (m, mProps) {
		if (!mProps.b) {
			return _Utils_Tuple2(
				14,
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$markLabel(m)));
		} else {
			return _Utils_Tuple2(
				14,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string(
								$author$project$VegaLite$markLabel(m))),
						A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mProps))));
		}
	});
var $author$project$VegaLite$rect = $author$project$VegaLite$mark(11);
var $author$project$VegaLite$vlPropertyLabel = function (spec) {
	switch (spec) {
		case 0:
			return 'name';
		case 1:
			return 'params';
		case 2:
			return 'description';
		case 3:
			return 'title';
		case 4:
			return 'width';
		case 6:
			return 'width';
		case 5:
			return 'height';
		case 7:
			return 'height';
		case 9:
			return 'padding';
		case 8:
			return 'autosize';
		case 10:
			return 'background';
		case 11:
			return 'background';
		case 12:
			return 'data';
		case 13:
			return 'datasets';
		case 16:
			return 'projection';
		case 14:
			return 'mark';
		case 15:
			return 'transform';
		case 17:
			return 'encoding';
		case 31:
			return 'config';
		case 32:
			return 'selection';
		case 19:
			return 'concat';
		case 22:
			return 'columns';
		case 20:
			return 'hconcat';
		case 21:
			return 'vconcat';
		case 18:
			return 'layer';
		case 23:
			return 'repeat';
		case 24:
			return 'facet';
		case 27:
			return 'spacing';
		case 28:
			return 'align';
		case 29:
			return 'bounds';
		case 30:
			return 'center';
		case 25:
			return 'spec';
		case 26:
			return 'resolve';
		default:
			return 'view';
	}
};
var $author$project$VegaLite$toVegaLite = function (spec) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'$schema',
				$elm$json$Json$Encode$string('https://vega.github.io/schema/vega-lite/v5.json')),
			A2(
				$elm$core$List$map,
				function (_v0) {
					var s = _v0.a;
					var v = _v0.b;
					return _Utils_Tuple2(
						$author$project$VegaLite$vlPropertyLabel(s),
						v);
				},
				spec)));
};
var $author$project$GalleryTable$table1 = function () {
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$author$project$VegaLite$encoding,
				A2(
					$author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							$author$project$VegaLite$pName('Cylinders'),
							$author$project$VegaLite$pOrdinal
						]))),
			A2(
				$author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('Origin')
					]))),
		$author$project$VegaLite$color(
			_List_fromArray(
				[
					$author$project$VegaLite$mName('Horsepower'),
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opMean)
				])));
	var desc = $author$project$VegaLite$description('\'Table heatmap\' showing engine size/power for three countries.');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'cars.json', _List_Nil);
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				data,
				enc(_List_Nil),
				$author$project$VegaLite$rect(_List_Nil)
			]));
}();
var $author$project$VegaLite$AxFormat = function (a) {
	return {$: 15, a: a};
};
var $author$project$VegaLite$axFormat = function (s) {
	return $author$project$VegaLite$AxFormat(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$AxLabelAngle = function (a) {
	return {$: 21, a: a};
};
var $author$project$VegaLite$positiveAngle = function (a) {
	return (a < 0) ? (a + 360) : a;
};
var $author$project$VegaLite$axLabelAngle = function (n) {
	return $author$project$VegaLite$AxLabelAngle(
		$author$project$VegaLite$Num(
			$author$project$VegaLite$positiveAngle(n)));
};
var $author$project$VegaLite$AxTitle = function (a) {
	return {$: 55, a: a};
};
var $author$project$VegaLite$axTitle = function (s) {
	return $author$project$VegaLite$AxTitle(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$Boo = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$Domain = function (a) {
	return {$: 3, a: a};
};
var $author$project$VegaLite$axcoDomain = function (b) {
	return $author$project$VegaLite$Domain(
		$author$project$VegaLite$Boo(b));
};
var $author$project$VegaLite$AxBoth = 0;
var $author$project$VegaLite$Axis = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$VegaLite$coAxis = $author$project$VegaLite$Axis(0);
var $author$project$VegaLite$View = function (a) {
	return {$: 44, a: a};
};
var $author$project$VegaLite$coView = $author$project$VegaLite$View;
var $author$project$VegaLite$autosizeProperty = function (asCfg) {
	switch (asCfg) {
		case 5:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('pad'));
		case 1:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit'));
		case 2:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-x'));
		case 3:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('fit-y'));
		case 4:
			return _Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string('none'));
		case 7:
			return _Utils_Tuple2(
				'resize',
				$elm$json$Json$Encode$bool(true));
		case 0:
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('content'));
		default:
			return _Utils_Tuple2(
				'contains',
				$elm$json$Json$Encode$string('padding'));
	}
};
var $author$project$VegaLite$axisConfigProperty = function (axisCfg) {
	switch (axisCfg.$) {
		case 0:
			var aps = axisCfg.a;
			if (!aps.b) {
				return _List_fromArray(
					[
						$author$project$VegaLite$ariaProperty(
						$author$project$VegaLite$ArAria(false))
					]);
			} else {
				return A2($elm$core$List$map, $author$project$VegaLite$ariaProperty, aps);
			}
		case 2:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'disable', b);
		case 1:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'bandPosition', x);
		case 3:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'domain', b);
		case 4:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'domainCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 5:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'domainColor', s);
		case 6:
			var xs = axisCfg.a;
			return A2($author$project$VegaLite$numsExpr, 'domainDash', xs);
		case 7:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'domainDashOffset', x);
		case 8:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'domainOpacity', x);
		case 9:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'domainWidth', x);
		case 37:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxExtent', x);
		case 38:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minExtent', x);
		case 39:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'offset', x);
		case 10:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'grid', b);
		case 11:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 12:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'gridColor', s);
		case 13:
			var xs = axisCfg.a;
			return A2($author$project$VegaLite$numsExpr, 'gridDash', xs);
		case 14:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'gridDashOffset', x);
		case 15:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'gridOpacity', x);
		case 16:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'gridWidth', x);
		case 17:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'labels', b);
		case 18:
			var ha = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 19:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelAngle', x);
		case 20:
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 21:
			var mn = axisCfg.a;
			return A2($author$project$VegaLite$maybeNumExpr, 'labelBound', mn);
		case 24:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'labelColor', s);
		case 25:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'labelExpr', s);
		case 22:
			var mn = axisCfg.a;
			if (!mn.$) {
				var n = mn.a;
				return (!n) ? _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$bool(true))
					]) : _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$float(n))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'labelFlush',
						$elm$json$Json$Encode$bool(false))
					]);
			}
		case 23:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelFlushOffset', x);
		case 26:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'labelFont', s);
		case 28:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'labelFontStyle', s);
		case 27:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelFontSize', x);
		case 29:
			var fw = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 30:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelLimit', x);
		case 31:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelLineHeight', x);
		case 32:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelOffset', x);
		case 33:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelOpacity', x);
		case 34:
			var strat = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$author$project$VegaLite$overlapStrategySpec(strat))
				]);
		case 35:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelPadding', x);
		case 36:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'labelSeparation', x);
		case 40:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'ticks', b);
		case 41:
			var tb = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickBand',
					$author$project$VegaLite$tickBandSpec(tb))
				]);
		case 42:
			var c = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCap',
					$author$project$VegaLite$strokeCapSpec(c))
				]);
		case 43:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'tickColor', s);
		case 44:
			var tc = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'tickCount',
					$author$project$VegaLite$scaleNiceSpec(tc))
				]);
		case 45:
			var xs = axisCfg.a;
			return A2($author$project$VegaLite$numsExpr, 'tickDash', xs);
		case 46:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickDashOffset', x);
		case 47:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'tickExtra', b);
		case 48:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickOffset', x);
		case 49:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickOpacity', x);
		case 52:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickMinStep', x);
		case 50:
			var b = axisCfg.a;
			return A2($author$project$VegaLite$booExpr, 'tickRound', b);
		case 51:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickSize', x);
		case 53:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'tickWidth', x);
		case 54:
			var al = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$author$project$VegaLite$hAlignSpec(al))
				]);
		case 56:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleAngle', x);
		case 55:
			var an = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$author$project$VegaLite$anchorSpec(an))
				]);
		case 57:
			var va = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 58:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'titleColor', s);
		case 59:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'titleFont', s);
		case 61:
			var s = axisCfg.a;
			return A2($author$project$VegaLite$strExpr, 'titleFontStyle', s);
		case 62:
			var w = axisCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$author$project$VegaLite$fontWeightSpec(w))
				]);
		case 60:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleFontSize', x);
		case 63:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleLimit', x);
		case 64:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleLineHeight', x);
		case 65:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleOpacity', x);
		case 66:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titlePadding', x);
		case 67:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleX', x);
		case 68:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'titleY', x);
		default:
			var x = axisCfg.a;
			return A2($author$project$VegaLite$numExpr, 'translate', x);
	}
};
var $author$project$VegaLite$axisLabel = function (axChoice) {
	switch (axChoice) {
		case 1:
			return 'axisX';
		case 2:
			return 'axisY';
		default:
			return 'axis';
	}
};
var $author$project$VegaLite$concatConfigProperty = function (ccp) {
	if (!ccp.$) {
		var n = ccp.a;
		return _Utils_Tuple2(
			'columns',
			$elm$json$Json$Encode$int(n));
	} else {
		var x = ccp.a;
		return _Utils_Tuple2(
			'spacing',
			$elm$json$Json$Encode$float(x));
	}
};
var $author$project$VegaLite$facetConfigProperty = function (fcp) {
	if (!fcp.$) {
		var n = fcp.a;
		return _Utils_Tuple2(
			'columns',
			$elm$json$Json$Encode$int(n));
	} else {
		var x = fcp.a;
		return _Utils_Tuple2(
			'spacing',
			$elm$json$Json$Encode$float(x));
	}
};
var $author$project$VegaLite$fieldTitleLabel = function (ftp) {
	switch (ftp) {
		case 0:
			return 'verbal';
		case 1:
			return 'functional';
		default:
			return 'plain';
	}
};
var $author$project$VegaLite$headerProperty = function (hProp) {
	switch (hProp.$) {
		case 0:
			var fmt = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'format',
					$elm$json$Json$Encode$string(fmt))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 3:
			var formatter = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string(formatter))
				]);
		case 5:
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 6:
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAnchor',
					$author$project$VegaLite$anchorSpec(a))
				]);
		case 7:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelAngle', x);
		case 8:
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 9:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelColor', s);
		case 10:
			var s = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelExpr',
					$elm$json$Json$Encode$string(s))
				]);
		case 11:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFont', s);
		case 12:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelFontSize', x);
		case 13:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'labelFontStyle', s);
		case 14:
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 15:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelLimit', x);
		case 16:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelLineHeight', x);
		case 17:
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOrient',
					$author$project$VegaLite$sideSpec(orient))
				]);
		case 18:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'labelPadding', x);
		case 19:
			var b = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labels',
					$elm$json$Json$Encode$bool(b))
				]);
		case 20:
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$author$project$VegaLite$sideSpec(orient))
				]);
		case 4:
			var s = hProp.a;
			if (s === '') {
				return _List_fromArray(
					[
						_Utils_Tuple2('title', $elm$json$Json$Encode$null)
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'title',
						$author$project$VegaLite$multilineTextSpec(s))
					]);
			}
		case 22:
			var a = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$author$project$VegaLite$anchorSpec(a))
				]);
		case 21:
			var ha = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 23:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleAngle', x);
		case 24:
			var va = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 25:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleColor', s);
		case 26:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFont', s);
		case 29:
			var fw = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 27:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleFontSize', x);
		case 28:
			var s = hProp.a;
			return A2($author$project$VegaLite$strExpr, 'titleFontStyle', s);
		case 30:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLimit', x);
		case 31:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'titleLineHeight', x);
		case 32:
			var orient = hProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleOrient',
					$author$project$VegaLite$sideSpec(orient))
				]);
		default:
			var x = hProp.a;
			return A2($author$project$VegaLite$numExpr, 'titlePadding', x);
	}
};
var $author$project$VegaLite$legendConfigProperty = function (legendConfig) {
	switch (legendConfig.$) {
		case 0:
			var aps = legendConfig.a;
			if (!aps.b) {
				return _List_fromArray(
					[
						$author$project$VegaLite$ariaProperty(
						$author$project$VegaLite$ArAria(false))
					]);
			} else {
				return A2($elm$core$List$map, $author$project$VegaLite$ariaProperty, aps);
			}
		case 1:
			var b = legendConfig.a;
			return A2($author$project$VegaLite$booExpr, 'disable', b);
		case 2:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'clipHeight', x);
		case 3:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'columnPadding', x);
		case 35:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'rowPadding', x);
		case 4:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'columns', x);
		case 6:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadius', x);
		case 5:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'direction',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$markOrientationLabel(d)))
				]);
		case 7:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'fillColor', s);
		case 33:
			var orient = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$author$project$VegaLite$legendOrientSpec(orient))
				]);
		case 32:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'offset', x);
		case 37:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'strokeColor', s);
		case 38:
			var xs = legendConfig.a;
			return A2($author$project$VegaLite$numsExpr, 'strokeDash', xs);
		case 39:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'strokeWidth', x);
		case 34:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'padding', x);
		case 8:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gradientDirection',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$markOrientationLabel(d)))
				]);
		case 16:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientHorizontalMaxLength', x);
		case 17:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientHorizontalMinLength', x);
		case 18:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientVerticalMaxLength', x);
		case 19:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientVerticalMinLength', x);
		case 9:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientLabelLimit', x);
		case 11:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientLength', x);
		case 10:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientLabelOffset', x);
		case 12:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientOpacity', x);
		case 13:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'gradientStrokeColor', s);
		case 14:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientStrokeWidth', x);
		case 15:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'gradientThickness', x);
		case 20:
			var ga = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'gridAlign',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$compositionAlignmentLabel(ga)))
				]);
		case 21:
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 22:
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 23:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'labelColor', s);
		case 25:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'labelFont', s);
		case 26:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'labelFontSize', x);
		case 27:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'labelFontStyle', s);
		case 28:
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 29:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'labelLimit', x);
		case 30:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'labelOffset', x);
		case 31:
			var lo = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'labelOverlap',
					$author$project$VegaLite$overlapStrategySpec(lo))
				]);
		case 36:
			var b = legendConfig.a;
			return A2($author$project$VegaLite$booExpr, 'shortTimeLabels', b);
		case 44:
			var d = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolDirection',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$markOrientationLabel(d)))
				]);
		case 46:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolLimit', x);
		case 45:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'symbolFillColor', s);
		case 40:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'symbolBaseFillColor', s);
		case 52:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'symbolStrokeColor', s);
		case 41:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'symbolBaseStrokeColor', s);
		case 42:
			var xs = legendConfig.a;
			return A2($author$project$VegaLite$numsExpr, 'symbolDash', xs);
		case 43:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolDashOffset', x);
		case 47:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolOffset', x);
		case 48:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolOpacity', x);
		case 49:
			var s = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'symbolType',
					$author$project$VegaLite$symbolSpec(s))
				]);
		case 50:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolSize', x);
		case 51:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'symbolStrokeWidth', x);
		case 24:
			return _List_fromArray(
				[
					_Utils_Tuple2('title', $elm$json$Json$Encode$null)
				]);
		case 53:
			var ha = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAlign',
					$author$project$VegaLite$hAlignSpec(ha))
				]);
		case 55:
			var va = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleBaseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 54:
			var an = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleAnchor',
					$author$project$VegaLite$anchorSpec(an))
				]);
		case 56:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'titleColor', s);
		case 57:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'titleFont', s);
		case 58:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'titleFontSize', x);
		case 59:
			var s = legendConfig.a;
			return A2($author$project$VegaLite$strExpr, 'titleFontStyle', s);
		case 60:
			var fw = legendConfig.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'titleFontWeight',
					$author$project$VegaLite$fontWeightSpec(fw))
				]);
		case 61:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'titleLimit', x);
		case 62:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'titleLineHeight', x);
		case 63:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'titleOpacity', x);
		case 64:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'titlePadding', x);
		case 65:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'unselectedOpacity', x);
		case 66:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'legendX', x);
		default:
			var x = legendConfig.a;
			return A2($author$project$VegaLite$numExpr, 'legendY', x);
	}
};
var $author$project$VegaLite$paddingSpec = function (pad) {
	switch (pad.$) {
		case 0:
			var p = pad.a;
			return $elm$json$Json$Encode$float(p);
		case 1:
			var l = pad.a;
			var t = pad.b;
			var r = pad.c;
			var b = pad.d;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'left',
						$elm$json$Json$Encode$float(l)),
						_Utils_Tuple2(
						'top',
						$elm$json$Json$Encode$float(t)),
						_Utils_Tuple2(
						'right',
						$elm$json$Json$Encode$float(r)),
						_Utils_Tuple2(
						'bottom',
						$elm$json$Json$Encode$float(b))
					]));
		case 3:
			var l = pad.a;
			var t = pad.b;
			var r = pad.c;
			var b = pad.d;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string('{\'left\':' + (l + (',\'top\':' + (t + (',\'right\':' + (r + (',\'bottom\':' + (b + '}')))))))))
					]));
		default:
			var s = pad.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$VegaLite$numStr = function (n) {
	switch (n.$) {
		case 0:
			var x = n.a;
			return $elm$core$String$fromFloat(x);
		case 1:
			return 'null';
		default:
			var s = n.a;
			return s;
	}
};
var $author$project$VegaLite$projectionSpec = function (proj) {
	switch (proj.$) {
		case 0:
			return $elm$json$Json$Encode$string('albers');
		case 1:
			return $elm$json$Json$Encode$string('albersUsa');
		case 2:
			return $elm$json$Json$Encode$string('azimuthalEqualArea');
		case 3:
			return $elm$json$Json$Encode$string('azimuthalEquidistant');
		case 4:
			return $elm$json$Json$Encode$string('conicConformal');
		case 5:
			return $elm$json$Json$Encode$string('conicEqualarea');
		case 6:
			return $elm$json$Json$Encode$string('conicEquidistant');
		case 7:
			var projName = proj.a;
			return $elm$json$Json$Encode$string(projName);
		case 9:
			return $elm$json$Json$Encode$string('equalEarth');
		case 8:
			return $elm$json$Json$Encode$string('equirectangular');
		case 10:
			return $elm$json$Json$Encode$string('gnomonic');
		case 11:
			return $elm$json$Json$Encode$string('identity');
		case 12:
			return $elm$json$Json$Encode$string('mercator');
		case 13:
			return $elm$json$Json$Encode$string('naturalEarth1');
		case 14:
			return $elm$json$Json$Encode$string('orthographic');
		case 15:
			return $elm$json$Json$Encode$string('stereographic');
		case 16:
			return $elm$json$Json$Encode$string('transverseMercator');
		default:
			var s = proj.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$projectionProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var proj = pp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$author$project$VegaLite$projectionSpec(proj))
				]);
		case 1:
			var n = pp.a;
			switch (n.$) {
				case 0:
					var x = n.a;
					return (x > 0) ? A2($author$project$VegaLite$numExpr, 'clipAngle', n) : _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				case 1:
					return _List_fromArray(
						[
							_Utils_Tuple2('clipAngle', $elm$json$Json$Encode$null)
						]);
				default:
					return A2($author$project$VegaLite$numExpr, 'clipAngle', n);
			}
		case 2:
			var rClip = pp.a;
			switch (rClip.$) {
				case 0:
					return _List_fromArray(
						[
							_Utils_Tuple2('clipExtent', $elm$json$Json$Encode$null)
						]);
				case 1:
					var l = rClip.a;
					var t = rClip.b;
					var r = rClip.c;
					var b = rClip.d;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clipExtent',
							A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$list($elm$json$Json$Encode$float),
								_List_fromArray(
									[
										_List_fromArray(
										[l, t]),
										_List_fromArray(
										[r, b])
									])))
						]);
				default:
					var l = rClip.a;
					var t = rClip.b;
					var r = rClip.c;
					var b = rClip.d;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'clipExtent',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'expr',
										$elm$json$Json$Encode$string('[[' + (l + (',' + (t + ('],[' + (r + (',' + (b + ']]')))))))))
									])))
						]);
			}
		case 10:
			var b = pp.a;
			return A2($author$project$VegaLite$booExpr, 'reflectX', b);
		case 11:
			var b = pp.a;
			return A2($author$project$VegaLite$booExpr, 'reflectY', b);
		case 3:
			var lambda = pp.a;
			var phi = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'center',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($author$project$VegaLite$numStr(lambda) + (',' + ($author$project$VegaLite$numStr(phi) + ']')))))
							])))
				]);
		case 4:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'scale', x);
		case 5:
			var tx = pp.a;
			var ty = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'translate',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($author$project$VegaLite$numStr(tx) + (',' + ($author$project$VegaLite$numStr(ty) + ']')))))
							])))
				]);
		case 6:
			var lambda = pp.a;
			var phi = pp.b;
			var gamma = pp.c;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'rotate',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($author$project$VegaLite$numStr(lambda) + (',' + ($author$project$VegaLite$numStr(phi) + (',' + ($author$project$VegaLite$numStr(gamma) + ']')))))))
							])))
				]);
		case 9:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'pointRadius', x);
		case 7:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'precision', x);
		case 12:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'coefficient', x);
		case 13:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'distance', x);
		case 14:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'fraction', x);
		case 15:
			var n = pp.a;
			return A2($author$project$VegaLite$numExpr, 'lobes', n);
		case 16:
			var lat = pp.a;
			return A2($author$project$VegaLite$numExpr, 'parallel', lat);
		case 8:
			var lat1 = pp.a;
			var lat2 = pp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'parallels',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expr',
								$elm$json$Json$Encode$string(
									'[' + ($author$project$VegaLite$numStr(lat1) + (',' + ($author$project$VegaLite$numStr(lat2) + ']')))))
							])))
				]);
		case 17:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'radius', x);
		case 18:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'ratio', x);
		case 19:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'spacing', x);
		default:
			var x = pp.a;
			return A2($author$project$VegaLite$numExpr, 'tilt', x);
	}
};
var $author$project$VegaLite$rangeConfigProperty = function (rangeCfg) {
	switch (rangeCfg.$) {
		case 0:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'category',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($author$project$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 1:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'diverging',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($author$project$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 2:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'heatmap',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($author$project$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 3:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ordinal',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($author$project$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 4:
			var clrs = rangeCfg.a;
			return _Utils_Tuple2(
				'ramp',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2($author$project$VegaLite$schemeProperty, clrs, _List_Nil)
						])));
		case 5:
			var syms = rangeCfg.a;
			return _Utils_Tuple2(
				'symbol',
				A2($elm$json$Json$Encode$list, $author$project$VegaLite$symbolSpec, syms));
		default:
			var s = rangeCfg.a;
			return _Utils_Tuple2(
				'symbol',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'signal',
							$elm$json$Json$Encode$string(s))
						])));
	}
};
var $author$project$VegaLite$scaleConfigProperty = function (scaleCfg) {
	switch (scaleCfg.$) {
		case 0:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'bandPaddingInner', x);
		case 3:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'bandPaddingOuter', x);
		case 1:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'barBandPaddingInner', x);
		case 2:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'rectBandPaddingInner', x);
		case 5:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'continuousPadding', x);
		case 4:
			var b = scaleCfg.a;
			return A2($author$project$VegaLite$booExpr, 'clamp', b);
		case 6:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxBandSize', x);
		case 7:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minBandSize', x);
		case 8:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxFontSize', x);
		case 9:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minFontSize', x);
		case 10:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxOpacity', x);
		case 11:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minOpacity', x);
		case 12:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxSize', x);
		case 13:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minSize', x);
		case 14:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'maxStrokeWidth', x);
		case 15:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'minStrokeWidth', x);
		case 16:
			var x = scaleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'pointPadding', x);
		case 17:
			var b = scaleCfg.a;
			return A2($author$project$VegaLite$booExpr, 'round', b);
		case 18:
			var b = scaleCfg.a;
			return A2($author$project$VegaLite$booExpr, 'useUnaggregatedDomain', b);
		default:
			var b = scaleCfg.a;
			return A2($author$project$VegaLite$booExpr, 'xReverse', b);
	}
};
var $author$project$VegaLite$selectionLabel = function (seType) {
	switch (seType) {
		case 0:
			return 'point';
		case 1:
			return 'interval';
		case 2:
			return 'single';
		default:
			return 'multi';
	}
};
var $author$project$VegaLite$NullValue = {$: 5};
var $author$project$VegaLite$bindLegendProperty = function (blProp) {
	switch (blProp.$) {
		case 1:
			var ch = blProp.a;
			return _Utils_Tuple2(
				'encodings',
				A2(
					$elm$json$Json$Encode$list,
					$elm$json$Json$Encode$string,
					_List_fromArray(
						[
							$author$project$VegaLite$channelLabel(ch)
						])));
		case 0:
			var f = blProp.a;
			return _Utils_Tuple2(
				'fields',
				A2(
					$elm$json$Json$Encode$list,
					$elm$json$Json$Encode$string,
					_List_fromArray(
						[f])));
		default:
			var es = blProp.a;
			return _Utils_Tuple2(
				'bind',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'legend',
							$elm$json$Json$Encode$string(es))
						])));
	}
};
var $author$project$VegaLite$inputProperty = function (prop) {
	switch (prop.$) {
		case 5:
			var x = prop.a;
			return _Utils_Tuple2(
				'min',
				$elm$json$Json$Encode$float(x));
		case 6:
			var x = prop.a;
			return _Utils_Tuple2(
				'max',
				$elm$json$Json$Encode$float(x));
		case 8:
			var x = prop.a;
			return _Utils_Tuple2(
				'step',
				$elm$json$Json$Encode$float(x));
		case 0:
			var x = prop.a;
			return _Utils_Tuple2(
				'debounce',
				$elm$json$Json$Encode$float(x));
		case 7:
			var s = prop.a;
			return _Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(s));
		case 2:
			var opts = prop.a;
			return _Utils_Tuple2(
				'options',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, opts));
		case 3:
			var opts = prop.a;
			return _Utils_Tuple2(
				'options',
				A2($elm$json$Json$Encode$list, $author$project$VegaLite$dataValueSpec, opts));
		case 4:
			var opts = prop.a;
			return _Utils_Tuple2(
				'options',
				A2($elm$json$Json$Encode$list, $author$project$VegaLite$dataValuesSpecs, opts));
		case 9:
			var el = prop.a;
			return _Utils_Tuple2(
				'placeholder',
				$elm$json$Json$Encode$string(el));
		default:
			var el = prop.a;
			return _Utils_Tuple2(
				'element',
				$elm$json$Json$Encode$string(el));
	}
};
var $author$project$VegaLite$bindingProperty = function (bnd) {
	switch (bnd.$) {
		case 0:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('range')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 1:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('checkbox')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 2:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('radio')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 3:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('select')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 4:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('text')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 5:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('number')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 6:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('date')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 7:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('time')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 8:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('month')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 9:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('week')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 10:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('datetimelocal')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		case 11:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('tel')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
		default:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							$elm$json$Json$Encode$string('color')),
						A2($elm$core$List$map, $author$project$VegaLite$inputProperty, props))));
	}
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$VegaLite$selectionMarkProperty = function (markProp) {
	switch (markProp.$) {
		case 0:
			var colour = markProp.a;
			return _Utils_Tuple2(
				'fill',
				$elm$json$Json$Encode$string(colour));
		case 1:
			var x = markProp.a;
			return _Utils_Tuple2(
				'fillOpacity',
				$elm$json$Json$Encode$float(x));
		case 2:
			var colour = markProp.a;
			return _Utils_Tuple2(
				'stroke',
				$elm$json$Json$Encode$string(colour));
		case 3:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeOpacity',
				$elm$json$Json$Encode$float(x));
		case 4:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				$elm$json$Json$Encode$float(x));
		case 5:
			var xs = markProp.a;
			return _Utils_Tuple2(
				'strokeDash',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$float, xs));
		case 6:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeDashOffset',
				$elm$json$Json$Encode$float(x));
		default:
			var cur = markProp.a;
			return _Utils_Tuple2(
				'cursor',
				$author$project$VegaLite$cursorSpec(cur));
	}
};
var $author$project$VegaLite$selectionResolutionLabel = function (res) {
	switch (res) {
		case 0:
			return 'global';
		case 1:
			return 'union';
		default:
			return 'intersect';
	}
};
var $author$project$VegaLite$togglePredicateSpec = function (tp) {
	switch (tp.$) {
		case 0:
			return $elm$json$Json$Encode$bool(false);
		case 1:
			var ex = tp.a;
			return $elm$json$Json$Encode$string(ex);
		case 2:
			return $elm$json$Json$Encode$string('event.shiftKey');
		case 3:
			return $elm$json$Json$Encode$string('event.ctrlKey');
		default:
			return $elm$json$Json$Encode$string('event.altKey');
	}
};
var $author$project$VegaLite$selectionProperties = function (selProp) {
	switch (selProp.$) {
		case 7:
			var fNames = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fields',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, fNames))
				]);
		case 9:
			var iVals = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'init',
					$elm$json$Json$Encode$object(
						A2(
							$elm$core$List$map,
							$elm$core$Tuple$mapSecond($author$project$VegaLite$dataValueSpec),
							iVals)))
				]);
		case 10:
			var maybeX = selProp.a;
			var maybeY = selProp.b;
			var yExtent = _Utils_eq(
				maybeY,
				$elm$core$Maybe$Just(
					_Utils_Tuple2($author$project$VegaLite$NullValue, $author$project$VegaLite$NullValue))) ? $elm$core$Maybe$Nothing : maybeY;
			var xExtent = _Utils_eq(
				maybeX,
				$elm$core$Maybe$Just(
					_Utils_Tuple2($author$project$VegaLite$NullValue, $author$project$VegaLite$NullValue))) ? $elm$core$Maybe$Nothing : maybeX;
			var _v1 = _Utils_Tuple2(xExtent, yExtent);
			if (!_v1.a.$) {
				if (!_v1.b.$) {
					var _v2 = _v1.a.a;
					var xMin = _v2.a;
					var xMax = _v2.b;
					var _v3 = _v1.b.a;
					var yMin = _v3.a;
					var yMax = _v3.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'init',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'x',
										$author$project$VegaLite$toList(
											_List_fromArray(
												[
													$author$project$VegaLite$dataValueSpec(xMin),
													$author$project$VegaLite$dataValueSpec(xMax)
												]))),
										_Utils_Tuple2(
										'y',
										$author$project$VegaLite$toList(
											_List_fromArray(
												[
													$author$project$VegaLite$dataValueSpec(yMin),
													$author$project$VegaLite$dataValueSpec(yMax)
												])))
									])))
						]);
				} else {
					var _v4 = _v1.a.a;
					var xMin = _v4.a;
					var xMax = _v4.b;
					var _v5 = _v1.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'init',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'x',
										$author$project$VegaLite$toList(
											_List_fromArray(
												[
													$author$project$VegaLite$dataValueSpec(xMin),
													$author$project$VegaLite$dataValueSpec(xMax)
												])))
									])))
						]);
				}
			} else {
				if (!_v1.b.$) {
					var _v6 = _v1.a;
					var _v7 = _v1.b.a;
					var yMin = _v7.a;
					var yMax = _v7.b;
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'init',
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'y',
										$author$project$VegaLite$toList(
											_List_fromArray(
												[
													$author$project$VegaLite$dataValueSpec(yMin),
													$author$project$VegaLite$dataValueSpec(yMax)
												])))
									])))
						]);
				} else {
					var _v8 = _v1.a;
					var _v9 = _v1.b;
					return _List_fromArray(
						[
							_Utils_Tuple2('init', $elm$json$Json$Encode$null)
						]);
				}
			}
		case 8:
			var channels = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encodings',
					A2(
						$elm$json$Json$Encode$list,
						A2($elm$core$Basics$composeL, $elm$json$Json$Encode$string, $author$project$VegaLite$channelLabel),
						channels))
				]);
		case 3:
			var evStr = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'on',
					$elm$json$Json$Encode$string(evStr))
				]);
		case 4:
			var evStr = selProp.a;
			var _v10 = $elm$core$String$trim(evStr);
			if (_v10 === '') {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'clear',
						$elm$json$Json$Encode$bool(false))
					]);
			} else {
				var evStrTrimmed = _v10;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'clear',
						$elm$json$Json$Encode$string(evStrTrimmed))
					]);
			}
		case 0:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'empty',
					$elm$json$Json$Encode$string('none'))
				]);
		case 11:
			var res = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'resolve',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$selectionResolutionLabel(res)))
				]);
		case 12:
			var markProps = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mark',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $author$project$VegaLite$selectionMarkProperty, markProps)))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bind',
					$elm$json$Json$Encode$string('scales'))
				]);
		case 2:
			var blProps = selProp.a;
			var labelledSpecs = A2($elm$core$List$map, $author$project$VegaLite$bindLegendProperty, blProps);
			return A2(
				$elm$core$List$member,
				'bind',
				A2($elm$core$List$map, $elm$core$Tuple$first, labelledSpecs)) ? labelledSpecs : A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'bind',
					$elm$json$Json$Encode$string('legend')),
				labelledSpecs);
		case 13:
			var binds = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bind',
					$elm$json$Json$Encode$object(
						A2($elm$core$List$map, $author$project$VegaLite$bindingProperty, binds)))
				]);
		case 14:
			var b = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'nearest',
					$elm$json$Json$Encode$bool(b))
				]);
		case 15:
			var tp = selProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'toggle',
					$author$project$VegaLite$togglePredicateSpec(tp))
				]);
		case 5:
			var e = selProp.a;
			return (e === '') ? _List_fromArray(
				[
					_Utils_Tuple2(
					'translate',
					$elm$json$Json$Encode$bool(false))
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'translate',
					$elm$json$Json$Encode$string(e))
				]);
		default:
			var e = selProp.a;
			return (e === '') ? _List_fromArray(
				[
					_Utils_Tuple2(
					'zoom',
					$elm$json$Json$Encode$bool(false))
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'zoom',
					$elm$json$Json$Encode$string(e))
				]);
	}
};
var $author$project$VegaLite$tfSpec = function (tf) {
	switch (tf.$) {
		case 1:
			return $elm$json$Json$Encode$string('group');
		case 0:
			return $elm$json$Json$Encode$string('bounds');
		default:
			var s = tf.a;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'expr',
						$elm$json$Json$Encode$string(s))
					]));
	}
};
var $author$project$VegaLite$titleConfigProperty = function (titleCfg) {
	switch (titleCfg.$) {
		case 0:
			var an = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'anchor',
					$author$project$VegaLite$anchorSpec(an))
				]);
		case 1:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'angle', n);
		case 2:
			var va = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'baseline',
					$author$project$VegaLite$vAlignSpec(va))
				]);
		case 3:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'color', s);
		case 4:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'dx', n);
		case 5:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'dy', n);
		case 6:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'font', s);
		case 7:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'fontSize', n);
		case 8:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'fontStyle', s);
		case 10:
			var tf = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'frame',
					$author$project$VegaLite$tfSpec(tf))
				]);
		case 9:
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'fontWeight',
					$author$project$VegaLite$fontWeightSpec(w))
				]);
		case 12:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'limit', n);
		case 11:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'lineHeight', n);
		case 13:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'offset', n);
		case 14:
			var sd = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'orient',
					$author$project$VegaLite$sideSpec(sd))
				]);
		case 15:
			var ss = titleCfg.a;
			if (ss.b && (!ss.b.b)) {
				var s = ss.a;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						$elm$json$Json$Encode$string(s))
					]);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'style',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, ss))
					]);
			}
		case 16:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExprMultiline, 'subtitle', s);
		case 17:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'subtitleColor', s);
		case 18:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'subtitleFont', s);
		case 19:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'subtitleFontSize', n);
		case 20:
			var s = titleCfg.a;
			return A2($author$project$VegaLite$strExpr, 'subtitleFontStyle', s);
		case 21:
			var w = titleCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'subtitleFontWeight',
					$author$project$VegaLite$fontWeightSpec(w))
				]);
		case 22:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'subtitleLineHeight', n);
		case 23:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'subtitlePadding', n);
		default:
			var n = titleCfg.a;
			return A2($author$project$VegaLite$numExpr, 'zindex', n);
	}
};
var $author$project$VegaLite$viewBackgroundProperty = function (vb) {
	switch (vb.$) {
		case 0:
			var styles = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styles))
				]);
		case 1:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadius', n);
		case 2:
			var s = vb.a;
			return A2($author$project$VegaLite$strExpr, 'fill', s);
		case 3:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'fillOpacity', n);
		case 4:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'opacity', n);
		case 5:
			var s = vb.a;
			return A2($author$project$VegaLite$strExpr, 'stroke', s);
		case 6:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'strokeOpacity', n);
		case 8:
			var cap = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$author$project$VegaLite$strokeCapSpec(cap))
				]);
		case 11:
			var jn = vb.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$author$project$VegaLite$strokeJoinSpec(jn))
				]);
		case 7:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'strokeWidth', n);
		case 9:
			var ns = vb.a;
			return A2($author$project$VegaLite$numsExpr, 'strokeDash', ns);
		case 10:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'strokeDashOffset', n);
		default:
			var n = vb.a;
			return A2($author$project$VegaLite$numExpr, 'strokeMiterLimit', n);
	}
};
var $author$project$VegaLite$viewConfigProperties = function (viewCfg) {
	switch (viewCfg.$) {
		case 2:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'continuousWidth', x);
		case 3:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'continuousHeight', x);
		case 6:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'discreteWidth', x);
		case 7:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'discreteHeight', x);
		case 1:
			var b = viewCfg.a;
			return A2($author$project$VegaLite$booExpr, 'clip', b);
		case 4:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'cornerRadius', x);
		case 5:
			var cur = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'cursor',
					$author$project$VegaLite$cursorSpec(cur))
				]);
		case 8:
			var s = viewCfg.a;
			return A2($author$project$VegaLite$strExpr, 'fill', s);
		case 9:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'fillOpacity', x);
		case 10:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'opacity', x);
		case 11:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'step', x);
		case 12:
			var s = viewCfg.a;
			return A2($author$project$VegaLite$strExpr, 'stroke', s);
		case 13:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'strokeOpacity', x);
		case 15:
			var cap = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeCap',
					$author$project$VegaLite$strokeCapSpec(cap))
				]);
		case 18:
			var jn = viewCfg.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'strokeJoin',
					$author$project$VegaLite$strokeJoinSpec(jn))
				]);
		case 14:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'strokeWidth', x);
		case 16:
			var xs = viewCfg.a;
			return A2($author$project$VegaLite$numsExpr, 'strokeDash', xs);
		case 17:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'strokeDashOffset', x);
		case 19:
			var x = viewCfg.a;
			return A2($author$project$VegaLite$numExpr, 'strokeMiterLimit', x);
		default:
			var vbs = viewCfg.a;
			return A2($elm$core$List$concatMap, $author$project$VegaLite$viewBackgroundProperty, vbs);
	}
};
var $author$project$VegaLite$configProperty = function (configProp) {
	switch (configProp.$) {
		case 1:
			var b = configProp.a;
			return _Utils_Tuple2(
				'aria',
				$elm$json$Json$Encode$bool(b));
		case 2:
			var aus = configProp.a;
			return _Utils_Tuple2(
				'autosize',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$autosizeProperty, aus)));
		case 14:
			var bg = configProp.a;
			return _Utils_Tuple2(
				'background',
				$elm$json$Json$Encode$string(bg));
		case 18:
			var s = configProp.a;
			return _Utils_Tuple2(
				'countTitle',
				$elm$json$Json$Encode$string(s));
		case 20:
			var ftp = configProp.a;
			return _Utils_Tuple2(
				'fieldTitle',
				$elm$json$Json$Encode$string(
					$author$project$VegaLite$fieldTitleLabel(ftp)));
		case 29:
			var fmt = configProp.a;
			return _Utils_Tuple2(
				'numberFormat',
				$elm$json$Json$Encode$string(fmt));
		case 30:
			var pad = configProp.a;
			return _Utils_Tuple2(
				'padding',
				$author$project$VegaLite$paddingSpec(pad));
		case 42:
			var fmt = configProp.a;
			return _Utils_Tuple2(
				'timeFormat',
				$elm$json$Json$Encode$string(fmt));
		case 3:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType),
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 5:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisLeft',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 6:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisRight',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 7:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisTop',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 8:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisBottom',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 9:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType) + 'Band',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 10:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType) + 'Discrete',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 11:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType) + 'Point',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 12:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType) + 'Quantitative',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 13:
			var axType = configProp.a;
			var acs = configProp.b;
			return _Utils_Tuple2(
				$author$project$VegaLite$axisLabel(axType) + 'Temporal',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$axisConfigProperty, acs)));
		case 23:
			var lcs = configProp.a;
			return _Utils_Tuple2(
				'legend',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$legendConfigProperty, lcs)));
		case 21:
			var fnt = configProp.a;
			return _Utils_Tuple2(
				'font',
				$elm$json$Json$Encode$string(fnt));
		case 27:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'mark',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 32:
			var pps = configProp.a;
			return _Utils_Tuple2(
				'projection',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$projectionProperty, pps)));
		case 0:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'area',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 15:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'bar',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 16:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'circle',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 25:
			var fps = configProp.a;
			return _Utils_Tuple2(
				'facet',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$facetConfigProperty, fps)));
		case 17:
			var cps = configProp.a;
			return _Utils_Tuple2(
				'concat',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$concatConfigProperty, cps)));
		case 19:
			var b = configProp.a;
			return _Utils_Tuple2(
				'customFormatTypes',
				$elm$json$Json$Encode$bool(b));
		case 22:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'geoshape',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 26:
			var hps = configProp.a;
			return _Utils_Tuple2(
				'header',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$headerProperty, hps)));
		case 24:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'line',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 31:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'point',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 34:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'rect',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 35:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'rule',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 38:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'square',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 39:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'text',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 40:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'tick',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
		case 41:
			var tcs = configProp.a;
			return _Utils_Tuple2(
				'title',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$titleConfigProperty, tcs)));
		case 28:
			var styles = configProp.a;
			return _Utils_Tuple2(
				'style',
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var sName = _v1.a;
							var mps = _v1.b;
							return _Utils_Tuple2(
								sName,
								$elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
						},
						styles)));
		case 4:
			var styles = configProp.a;
			return _Utils_Tuple2(
				'style',
				$elm$json$Json$Encode$object(
					A2(
						$elm$core$List$map,
						function (_v2) {
							var sName = _v2.a;
							var mps = _v2.b;
							return _Utils_Tuple2(
								sName,
								$elm$json$Json$Encode$object(
									A2($elm$core$List$concatMap, $author$project$VegaLite$axisProperty, mps)));
						},
						styles)));
		case 36:
			var scs = configProp.a;
			return _Utils_Tuple2(
				'scale',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$scaleConfigProperty, scs)));
		case 33:
			var rcs = configProp.a;
			return _Utils_Tuple2(
				'range',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, $author$project$VegaLite$rangeConfigProperty, rcs)));
		case 37:
			var selConfig = configProp.a;
			var selProp = function (_v3) {
				var sel = _v3.a;
				var sps = _v3.b;
				return _Utils_Tuple2(
					$author$project$VegaLite$selectionLabel(sel),
					$elm$json$Json$Encode$object(
						A2($elm$core$List$concatMap, $author$project$VegaLite$selectionProperties, sps)));
			};
			return _Utils_Tuple2(
				'selection',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$map, selProp, selConfig)));
		case 44:
			var vcs = configProp.a;
			return _Utils_Tuple2(
				'view',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$viewConfigProperties, vcs)));
		default:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'trail',
				$elm$json$Json$Encode$object(
					A2($elm$core$List$concatMap, $author$project$VegaLite$markProperty, mps)));
	}
};
var $author$project$VegaLite$configuration = function (cfg) {
	return $elm$core$List$cons(
		$author$project$VegaLite$configProperty(cfg));
};
var $author$project$VegaLite$VLConfig = 31;
var $author$project$VegaLite$configure = function (configs) {
	return _Utils_Tuple2(
		31,
		$elm$json$Json$Encode$object(configs));
};
var $author$project$VegaLite$Date = {$: 26};
var $author$project$VegaLite$date = $author$project$VegaLite$Date;
var $author$project$VegaLite$MTitle = function (a) {
	return {$: 13, a: a};
};
var $author$project$VegaLite$mTitle = $author$project$VegaLite$MTitle;
var $author$project$VegaLite$Month = {$: 16};
var $author$project$VegaLite$month = $author$project$VegaLite$Month;
var $author$project$VegaLite$Max = {$: 6};
var $author$project$VegaLite$opMax = $author$project$VegaLite$Max;
var $author$project$VegaLite$PAxis = function (a) {
	return {$: 13, a: a};
};
var $author$project$VegaLite$pAxis = $author$project$VegaLite$PAxis;
var $author$project$VegaLite$PTimeUnit = function (a) {
	return {$: 9, a: a};
};
var $author$project$VegaLite$pTimeUnit = $author$project$VegaLite$PTimeUnit;
var $author$project$VegaLite$PTitle = function (a) {
	return {$: 10, a: a};
};
var $author$project$VegaLite$pTitle = $author$project$VegaLite$PTitle;
var $author$project$VegaLite$VLTitle = 3;
var $author$project$VegaLite$title = F2(
	function (txt, tps) {
		return _Utils_Tuple2(
			3,
			$elm$json$Json$Encode$object(
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'text',
						$author$project$VegaLite$multilineTextSpec(txt)),
					A2($elm$core$List$concatMap, $author$project$VegaLite$titleConfigProperty, tps))));
	});
var $author$project$VegaLite$VStep = function (a) {
	return {$: 11, a: a};
};
var $author$project$VegaLite$vicoStep = function (n) {
	return $author$project$VegaLite$VStep(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$VStrokeWidth = function (a) {
	return {$: 14, a: a};
};
var $author$project$VegaLite$vicoStrokeWidth = function (n) {
	return $author$project$VegaLite$VStrokeWidth(
		$author$project$VegaLite$Num(n));
};
var $author$project$GalleryTable$table2 = function () {
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$author$project$VegaLite$encoding,
				A2(
					$author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							$author$project$VegaLite$pName('date'),
							$author$project$VegaLite$pOrdinal,
							$author$project$VegaLite$pTimeUnit($author$project$VegaLite$date),
							$author$project$VegaLite$pAxis(
							_List_fromArray(
								[
									$author$project$VegaLite$axTitle('Day'),
									$author$project$VegaLite$axLabelAngle(0),
									$author$project$VegaLite$axFormat('%e')
								]))
						]))),
			A2(
				$author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('date'),
						$author$project$VegaLite$pOrdinal,
						$author$project$VegaLite$pTimeUnit($author$project$VegaLite$month),
						$author$project$VegaLite$pTitle('Month')
					]))),
		$author$project$VegaLite$color(
			_List_fromArray(
				[
					$author$project$VegaLite$mName('temp_max'),
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opMax),
					$author$project$VegaLite$mTitle('')
				])));
	var desc = $author$project$VegaLite$description('Annual temperature \'heatmap\'');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'seattle-weather.csv', _List_Nil);
	var cfg = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$configure,
			$author$project$VegaLite$configuration(
				$author$project$VegaLite$coView(
					_List_fromArray(
						[
							$author$project$VegaLite$vicoStrokeWidth(0),
							$author$project$VegaLite$vicoStep(13)
						])))),
		$author$project$VegaLite$configuration(
			$author$project$VegaLite$coAxis(
				_List_fromArray(
					[
						$author$project$VegaLite$axcoDomain(false)
					]))));
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				A2($author$project$VegaLite$title, 'Daily Max Temperatures (C) in Seattle, WA', _List_Nil),
				cfg(_List_Nil),
				data,
				enc(_List_Nil),
				$author$project$VegaLite$rect(_List_Nil)
			]));
}();
var $author$project$VegaLite$And = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$VegaLite$and = F2(
	function (op1, op2) {
		return A2($author$project$VegaLite$And, op1, op2);
	});
var $author$project$VegaLite$MaxBins = function (a) {
	return {$: 5, a: a};
};
var $author$project$VegaLite$biMaxBins = $author$project$VegaLite$MaxBins;
var $author$project$VegaLite$Range = function (a) {
	return {$: 33, a: a};
};
var $author$project$VegaLite$coRange = $author$project$VegaLite$Range;
var $author$project$VegaLite$FCompose = function (a) {
	return {$: 6, a: a};
};
var $author$project$VegaLite$fiCompose = $author$project$VegaLite$FCompose;
var $author$project$VegaLite$FilterOp = function (a) {
	return {$: 1, a: a};
};
var $author$project$VegaLite$fiOp = $author$project$VegaLite$FilterOp;
var $author$project$VegaLite$FValid = function (a) {
	return {$: 11, a: a};
};
var $author$project$VegaLite$fiValid = $author$project$VegaLite$FValid;
var $author$project$VegaLite$filter = function (f) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'filter',
			$author$project$VegaLite$filterSpec(f)));
};
var $author$project$VegaLite$VLHeight = 5;
var $author$project$VegaLite$height = function (h) {
	return _Utils_Tuple2(
		5,
		$elm$json$Json$Encode$float(h));
};
var $author$project$VegaLite$Count = {$: 4};
var $author$project$VegaLite$opCount = $author$project$VegaLite$Count;
var $author$project$VegaLite$PBin = function (a) {
	return {$: 7, a: a};
};
var $author$project$VegaLite$pBin = $author$project$VegaLite$PBin;
var $author$project$VegaLite$RHeatmap = function (a) {
	return {$: 2, a: a};
};
var $author$project$VegaLite$Strs = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$racoHeatmap = function (s) {
	return $author$project$VegaLite$RHeatmap(
		$author$project$VegaLite$Strs(
			_List_fromArray(
				[s])));
};
var $author$project$VegaLite$VLTransform = 15;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$VegaLite$transform = function (transforms) {
	var assemble = function (_v1) {
		var trName = _v1.a;
		var val = _v1.b;
		if (trName === 'multiSpecs') {
			return val;
		} else {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(trName, val)
					]));
		}
	};
	return $elm$core$List$isEmpty(transforms) ? _Utils_Tuple2(15, $elm$json$Json$Encode$null) : _Utils_Tuple2(
		15,
		A2($elm$json$Json$Encode$list, assemble, transforms));
};
var $author$project$VegaLite$NoStr = {$: 1};
var $author$project$VegaLite$VStroke = function (a) {
	return {$: 12, a: a};
};
var $author$project$VegaLite$vicoStroke = function (ms) {
	if (!ms.$) {
		var s = ms.a;
		return $author$project$VegaLite$VStroke(
			$author$project$VegaLite$Str(s));
	} else {
		return $author$project$VegaLite$VStroke($author$project$VegaLite$NoStr);
	}
};
var $author$project$VegaLite$VLWidth = 4;
var $author$project$VegaLite$width = function (w) {
	return _Utils_Tuple2(
		4,
		$elm$json$Json$Encode$float(w));
};
var $author$project$GalleryTable$table3 = function () {
	var trans = A2(
		$elm$core$Basics$composeL,
		$author$project$VegaLite$transform,
		$author$project$VegaLite$filter(
			$author$project$VegaLite$fiCompose(
				A2(
					$author$project$VegaLite$and,
					$author$project$VegaLite$fiOp(
						$author$project$VegaLite$fiValid('IMDB Rating')),
					$author$project$VegaLite$fiOp(
						$author$project$VegaLite$fiValid('Rotten Tomatoes Rating'))))));
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$author$project$VegaLite$encoding,
				A2(
					$author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							$author$project$VegaLite$pName('IMDB Rating'),
							$author$project$VegaLite$pBin(
							_List_fromArray(
								[
									$author$project$VegaLite$biMaxBins(60)
								]))
						]))),
			A2(
				$author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('Rotten Tomatoes Rating'),
						$author$project$VegaLite$pBin(
						_List_fromArray(
							[
								$author$project$VegaLite$biMaxBins(40)
							]))
					]))),
		$author$project$VegaLite$color(
			_List_fromArray(
				[
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opCount)
				])));
	var desc = $author$project$VegaLite$description('\'Binned heatmap\' comparing movie ratings.');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'movies.json', _List_Nil);
	var cfg = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$configure,
			$author$project$VegaLite$configuration(
				$author$project$VegaLite$coRange(
					_List_fromArray(
						[
							$author$project$VegaLite$racoHeatmap('greenblue')
						])))),
		$author$project$VegaLite$configuration(
			$author$project$VegaLite$coView(
				_List_fromArray(
					[
						$author$project$VegaLite$vicoStroke($elm$core$Maybe$Nothing)
					]))));
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				cfg(_List_Nil),
				$author$project$VegaLite$width(300),
				$author$project$VegaLite$height(200),
				data,
				trans(_List_Nil),
				enc(_List_Nil),
				$author$project$VegaLite$rect(_List_Nil)
			]));
}();
var $author$project$VegaLite$Circle = 6;
var $author$project$VegaLite$circle = $author$project$VegaLite$mark(6);
var $author$project$VegaLite$Day = {$: 27};
var $author$project$VegaLite$day = $author$project$VegaLite$Day;
var $author$project$VegaLite$Hours = {$: 32};
var $author$project$VegaLite$hours = $author$project$VegaLite$Hours;
var $author$project$VegaLite$Sum = {$: 17};
var $author$project$VegaLite$opSum = $author$project$VegaLite$Sum;
var $author$project$VegaLite$size = function (markProps) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'size',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, markProps))));
};
var $author$project$GalleryTable$table4 = function () {
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$author$project$VegaLite$encoding,
				A2(
					$author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							$author$project$VegaLite$pName('time'),
							$author$project$VegaLite$pOrdinal,
							$author$project$VegaLite$pTimeUnit($author$project$VegaLite$hours)
						]))),
			A2(
				$author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('time'),
						$author$project$VegaLite$pOrdinal,
						$author$project$VegaLite$pTimeUnit($author$project$VegaLite$day)
					]))),
		$author$project$VegaLite$size(
			_List_fromArray(
				[
					$author$project$VegaLite$mName('count'),
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opSum)
				])));
	var desc = $author$project$VegaLite$description('Table bubble plot in the style of a Github punched card.');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'github.csv', _List_Nil);
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				data,
				enc(_List_Nil),
				$author$project$VegaLite$circle(_List_Nil)
			]));
}();
var $author$project$VegaLite$asSpec = function (specs) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var s = _v0.a;
				var v = _v0.b;
				return _Utils_Tuple2(
					$author$project$VegaLite$vlPropertyLabel(s),
					v);
			},
			specs));
};
var $author$project$VegaLite$Scale = function (a) {
	return {$: 36, a: a};
};
var $author$project$VegaLite$coScale = $author$project$VegaLite$Scale;
var $author$project$VegaLite$TextStyle = function (a) {
	return {$: 39, a: a};
};
var $author$project$VegaLite$coText = $author$project$VegaLite$TextStyle;
var $author$project$VegaLite$VLLayer = 18;
var $author$project$VegaLite$layer = function (specs) {
	return _Utils_Tuple2(
		18,
		$author$project$VegaLite$toList(specs));
};
var $author$project$VegaLite$MString = function (a) {
	return {$: 18, a: a};
};
var $author$project$VegaLite$mStr = $author$project$VegaLite$MString;
var $author$project$VegaLite$MBaseline = function (a) {
	return {$: 4, a: a};
};
var $author$project$VegaLite$maBaseline = $author$project$VegaLite$MBaseline;
var $author$project$VegaLite$SCBandPaddingInner = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$sacoBandPaddingInner = function (n) {
	return $author$project$VegaLite$SCBandPaddingInner(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$SCBandPaddingOuter = function (a) {
	return {$: 3, a: a};
};
var $author$project$VegaLite$sacoBandPaddingOuter = function (n) {
	return $author$project$VegaLite$SCBandPaddingOuter(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$TAggregate = function (a) {
	return {$: 5, a: a};
};
var $author$project$VegaLite$tAggregate = $author$project$VegaLite$TAggregate;
var $author$project$VegaLite$TName = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$tName = $author$project$VegaLite$TName;
var $author$project$VegaLite$textChannelProperties = function (tDef) {
	switch (tDef.$) {
		case 0:
			var s = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$string(s))
				]);
		case 1:
			var arr = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								$elm$json$Json$Encode$string(
									$author$project$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 2:
			var measure = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(
						$author$project$VegaLite$measurementLabel(measure)))
				]);
		case 3:
			var bps = tDef.a;
			return _List_fromArray(
				[
					$author$project$VegaLite$bin(bps)
				]);
		case 4:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					$elm$json$Json$Encode$string('binned'))
				]);
		case 5:
			var op = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					$author$project$VegaLite$operationSpec(op))
				]);
		case 6:
			var tu = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					$author$project$VegaLite$timeUnitSpec(tu))
				]);
		case 7:
			var t = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					$author$project$VegaLite$multilineTextSpec(t))
				]);
		case 10:
			var fmt = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'format',
					$elm$json$Json$Encode$string(fmt))
				]);
		case 11:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('number'))
				]);
		case 12:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string('time'))
				]);
		case 13:
			var formatter = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'formatType',
					$elm$json$Json$Encode$string(formatter))
				]);
		case 8:
			var predicate = tDef.a;
			var ifClause = tDef.b;
			var elseClause = tDef.c;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					$elm$json$Json$Encode$object(
						_Utils_ap(
							$author$project$VegaLite$predicateProperties(predicate),
							A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, ifClause)))),
				A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, elseClause));
		case 9:
			var ifClauses = tDef.a;
			var elseClause = tDef.b;
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2(
						$elm$json$Json$Encode$list,
						function (_v1) {
							var predicate = _v1.a;
							var ifClause = _v1.b;
							return $elm$json$Json$Encode$object(
								_Utils_ap(
									$author$project$VegaLite$predicateProperties(predicate),
									A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, ifClause)));
						},
						ifClauses)),
				A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, elseClause));
		case 16:
			var isSelection = tDef.a;
			var tests = tDef.b;
			var elseClause = tDef.c;
			var testClause = function (_v2) {
				var predicate = _v2.a;
				var ifClause = _v2.b;
				return isSelection ? $elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'selection',
							$author$project$VegaLite$booleanOpSpec(predicate)),
						A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, ifClause))) : $elm$json$Json$Encode$object(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'test',
							$author$project$VegaLite$booleanOpSpec(predicate)),
						A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, ifClause)));
			};
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2($elm$json$Json$Encode$list, testClause, tests)),
				A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, elseClause));
		case 14:
			var s = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					$author$project$VegaLite$multilineTextSpec(s))
				]);
		default:
			var d = tDef.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'datum',
					$author$project$VegaLite$dataValueSpec(d))
				]);
	}
};
var $author$project$VegaLite$text = function (tDefs) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'text',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $author$project$VegaLite$textChannelProperties, tDefs))));
};
var $author$project$VegaLite$Text = 14;
var $author$project$VegaLite$textMark = $author$project$VegaLite$mark(14);
var $author$project$VegaLite$VAlignMiddle = {$: 2};
var $author$project$VegaLite$vaMiddle = $author$project$VegaLite$VAlignMiddle;
var $author$project$GalleryTable$table5 = function () {
	var encText = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$encoding,
			$author$project$VegaLite$color(
				_List_fromArray(
					[
						$author$project$VegaLite$mStr('white')
					]))),
		$author$project$VegaLite$text(
			_List_fromArray(
				[
					$author$project$VegaLite$tName('*'),
					$author$project$VegaLite$tAggregate($author$project$VegaLite$opCount)
				])));
	var specText = $author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				encText(_List_Nil),
				$author$project$VegaLite$textMark(_List_Nil)
			]));
	var encRect = A2(
		$elm$core$Basics$composeL,
		$author$project$VegaLite$encoding,
		$author$project$VegaLite$color(
			_List_fromArray(
				[
					$author$project$VegaLite$mName('*'),
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opCount)
				])));
	var specRect = $author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				encRect(_List_Nil),
				$author$project$VegaLite$rect(_List_Nil)
			]));
	var encPosition = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$encoding,
			A2(
				$author$project$VegaLite$position,
				0,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('Cylinders'),
						$author$project$VegaLite$pOrdinal
					]))),
		A2(
			$author$project$VegaLite$position,
			1,
			_List_fromArray(
				[
					$author$project$VegaLite$pName('Origin'),
					$author$project$VegaLite$pOrdinal
				])));
	var desc = $author$project$VegaLite$description('Layering text over \'heatmap\'.');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'cars.json', _List_Nil);
	var cfg = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$configure,
			$author$project$VegaLite$configuration(
				$author$project$VegaLite$coScale(
					_List_fromArray(
						[
							$author$project$VegaLite$sacoBandPaddingInner(0),
							$author$project$VegaLite$sacoBandPaddingOuter(0)
						])))),
		$author$project$VegaLite$configuration(
			$author$project$VegaLite$coText(
				_List_fromArray(
					[
						$author$project$VegaLite$maBaseline($author$project$VegaLite$vaMiddle)
					]))));
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				cfg(_List_Nil),
				data,
				encPosition(_List_Nil),
				$author$project$VegaLite$layer(
				_List_fromArray(
					[specRect, specText]))
			]));
}();
var $author$project$VegaLite$Jan = 0;
var $author$project$VegaLite$AxDataCondition = F2(
	function (a, b) {
		return {$: 79, a: a, b: b};
	});
var $author$project$VegaLite$axDataCondition = $author$project$VegaLite$AxDataCondition;
var $author$project$VegaLite$AxLabelOverlap = function (a) {
	return {$: 36, a: a};
};
var $author$project$VegaLite$axLabelOverlap = $author$project$VegaLite$AxLabelOverlap;
var $author$project$VegaLite$CAxLabelColor = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$VegaLite$cAxLabelColor = $author$project$VegaLite$CAxLabelColor;
var $author$project$VegaLite$CAxTickColor = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $author$project$VegaLite$cAxTickColor = $author$project$VegaLite$CAxTickColor;
var $author$project$VegaLite$DateTime = function (a) {
	return {$: 1, a: a};
};
var $author$project$VegaLite$dt = $author$project$VegaLite$DateTime;
var $author$project$VegaLite$DTDate = function (a) {
	return {$: 4, a: a};
};
var $author$project$VegaLite$dtDate = $author$project$VegaLite$DTDate;
var $author$project$VegaLite$DTMonth = function (a) {
	return {$: 2, a: a};
};
var $author$project$VegaLite$dtMonth = $author$project$VegaLite$DTMonth;
var $author$project$VegaLite$FEqual = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$VegaLite$fiEqual = $author$project$VegaLite$FEqual;
var $author$project$VegaLite$FExpr = function (a) {
	return {$: 5, a: a};
};
var $author$project$VegaLite$fiExpr = $author$project$VegaLite$FExpr;
var $author$project$VegaLite$FilterOpTrans = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$VegaLite$fiOpTrans = $author$project$VegaLite$FilterOpTrans;
var $author$project$VegaLite$MTimeUnit = function (a) {
	return {$: 12, a: a};
};
var $author$project$VegaLite$mTimeUnit = $author$project$VegaLite$MTimeUnit;
var $author$project$VegaLite$MonthDate = {$: 17};
var $author$project$VegaLite$monthDate = $author$project$VegaLite$MonthDate;
var $author$project$VegaLite$ONone = {$: 0};
var $author$project$VegaLite$osNone = $author$project$VegaLite$ONone;
var $author$project$VegaLite$YearMonthDate = {$: 4};
var $author$project$VegaLite$yearMonthDate = $author$project$VegaLite$YearMonthDate;
var $author$project$GalleryTable$table6 = function () {
	var trans = A2(
		$elm$core$Basics$composeL,
		$author$project$VegaLite$transform,
		$author$project$VegaLite$filter(
			$author$project$VegaLite$fiExpr('datum.symbol !== \'GOOG\'')));
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$author$project$VegaLite$encoding,
				A2(
					$author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							$author$project$VegaLite$pName('date'),
							$author$project$VegaLite$pOrdinal,
							$author$project$VegaLite$pTimeUnit($author$project$VegaLite$yearMonthDate),
							$author$project$VegaLite$pTitle('Time'),
							$author$project$VegaLite$pAxis(
							_List_fromArray(
								[
									$author$project$VegaLite$axFormat('%Y'),
									$author$project$VegaLite$axLabelAngle(0),
									$author$project$VegaLite$axLabelOverlap($author$project$VegaLite$osNone),
									A2(
									$author$project$VegaLite$axDataCondition,
									A2(
										$author$project$VegaLite$fiOpTrans,
										$author$project$VegaLite$mTimeUnit($author$project$VegaLite$monthDate),
										A2(
											$author$project$VegaLite$fiEqual,
											'value',
											$author$project$VegaLite$dt(
												_List_fromArray(
													[
														$author$project$VegaLite$dtMonth(0),
														$author$project$VegaLite$dtDate(1)
													])))),
									A2($author$project$VegaLite$cAxLabelColor, 'black', '')),
									A2(
									$author$project$VegaLite$axDataCondition,
									A2(
										$author$project$VegaLite$fiOpTrans,
										$author$project$VegaLite$mTimeUnit($author$project$VegaLite$monthDate),
										A2(
											$author$project$VegaLite$fiEqual,
											'value',
											$author$project$VegaLite$dt(
												_List_fromArray(
													[
														$author$project$VegaLite$dtMonth(0),
														$author$project$VegaLite$dtDate(1)
													])))),
									A2($author$project$VegaLite$cAxTickColor, 'black', ''))
								]))
						]))),
			A2(
				$author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						$author$project$VegaLite$pName('symbol'),
						$author$project$VegaLite$pTitle('')
					]))),
		$author$project$VegaLite$color(
			_List_fromArray(
				[
					$author$project$VegaLite$mAggregate($author$project$VegaLite$opSum),
					$author$project$VegaLite$mName('price'),
					$author$project$VegaLite$mTitle('Price')
				])));
	var desc = $author$project$VegaLite$description('Lasagna Plot (Dense Time-Series Heatmap).');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'stocks.csv', _List_Nil);
	var cfg = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$author$project$VegaLite$configure,
			$author$project$VegaLite$configuration(
				$author$project$VegaLite$coScale(
					_List_fromArray(
						[
							$author$project$VegaLite$sacoBandPaddingInner(0),
							$author$project$VegaLite$sacoBandPaddingOuter(0)
						])))),
		$author$project$VegaLite$configuration(
			$author$project$VegaLite$coText(
				_List_fromArray(
					[
						$author$project$VegaLite$maBaseline($author$project$VegaLite$vaMiddle)
					]))));
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				$author$project$VegaLite$width(300),
				$author$project$VegaLite$height(100),
				cfg(_List_Nil),
				data,
				trans(_List_Nil),
				enc(_List_Nil),
				$author$project$VegaLite$rect(_List_Nil)
			]));
}();
var $author$project$VegaLite$Latitude = 9;
var $author$project$VegaLite$Longitude = 8;
var $author$project$VegaLite$angle = function (markProps) {
	return $elm$core$List$cons(
		_Utils_Tuple2(
			'angle',
			$elm$json$Json$Encode$object(
				A2($elm$core$List$concatMap, $author$project$VegaLite$markChannelProperties, markProps))));
};
var $author$project$VegaLite$DNumbers = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$doNums = function (ns) {
	return $author$project$VegaLite$DNumbers(
		$author$project$VegaLite$Nums(ns));
};
var $author$project$VegaLite$EqualEarth = {$: 9};
var $author$project$VegaLite$equalEarth = $author$project$VegaLite$EqualEarth;
var $author$project$VegaLite$Geoshape = 7;
var $author$project$VegaLite$geoshape = $author$project$VegaLite$mark(7);
var $author$project$GalleryTable$giCentrePath = 'https://gicentre.github.io/data/';
var $author$project$VegaLite$MLegend = function (a) {
	return {$: 15, a: a};
};
var $author$project$VegaLite$mLegend = $author$project$VegaLite$MLegend;
var $author$project$VegaLite$MmType = function (a) {
	return {$: 6, a: a};
};
var $author$project$VegaLite$Quantitative = 2;
var $author$project$VegaLite$mQuant = $author$project$VegaLite$MmType(2);
var $author$project$VegaLite$MScale = function (a) {
	return {$: 7, a: a};
};
var $author$project$VegaLite$mScale = $author$project$VegaLite$MScale;
var $author$project$VegaLite$MFilled = function (a) {
	return {$: 30, a: a};
};
var $author$project$VegaLite$maFilled = function (b) {
	return $author$project$VegaLite$MFilled(
		$author$project$VegaLite$Boo(b));
};
var $author$project$VegaLite$MShape = function (a) {
	return {$: 51, a: a};
};
var $author$project$VegaLite$maShape = $author$project$VegaLite$MShape;
var $author$project$VegaLite$MStroke = function (a) {
	return {$: 54, a: a};
};
var $author$project$VegaLite$maStroke = function (s) {
	return $author$project$VegaLite$MStroke(
		$author$project$VegaLite$Str(s));
};
var $author$project$VegaLite$MStrokeWidth = function (a) {
	return {$: 62, a: a};
};
var $author$project$VegaLite$maStrokeWidth = function (n) {
	return $author$project$VegaLite$MStrokeWidth(
		$author$project$VegaLite$Num(n));
};
var $author$project$VegaLite$Point = 10;
var $author$project$VegaLite$point = $author$project$VegaLite$mark(10);
var $author$project$VegaLite$PrType = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$prType = $author$project$VegaLite$PrType;
var $author$project$VegaLite$VLProjection = 16;
var $author$project$VegaLite$projection = function (pProps) {
	return _Utils_Tuple2(
		16,
		$elm$json$Json$Encode$object(
			A2($elm$core$List$concatMap, $author$project$VegaLite$projectionProperty, pProps)));
};
var $author$project$VegaLite$RNumbers = function (a) {
	return {$: 0, a: a};
};
var $author$project$VegaLite$raNums = function (ns) {
	return $author$project$VegaLite$RNumbers(
		$author$project$VegaLite$Nums(ns));
};
var $author$project$VegaLite$SDomain = function (a) {
	return {$: 1, a: a};
};
var $author$project$VegaLite$scDomain = $author$project$VegaLite$SDomain;
var $author$project$VegaLite$SRange = function (a) {
	return {$: 3, a: a};
};
var $author$project$VegaLite$scRange = $author$project$VegaLite$SRange;
var $author$project$VegaLite$SScheme = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$VegaLite$scScheme = function (s) {
	return $author$project$VegaLite$SScheme(
		$author$project$VegaLite$Strs(
			_List_fromArray(
				[s])));
};
var $author$project$VegaLite$SymWedge = {$: 11};
var $author$project$VegaLite$symWedge = $author$project$VegaLite$SymWedge;
var $author$project$VegaLite$TopojsonFeature = function (a) {
	return {$: 5, a: a};
};
var $author$project$VegaLite$topojsonFeature = $author$project$VegaLite$TopojsonFeature;
var $author$project$VegaLite$VFill = function (a) {
	return {$: 8, a: a};
};
var $author$project$VegaLite$vicoFill = function (ms) {
	if (!ms.$) {
		var s = ms.a;
		return $author$project$VegaLite$VFill(
			$author$project$VegaLite$Str(s));
	} else {
		return $author$project$VegaLite$VFill($author$project$VegaLite$NoStr);
	}
};
var $author$project$GalleryTable$table7 = function () {
	var proj = $author$project$VegaLite$projection(
		_List_fromArray(
			[
				$author$project$VegaLite$prType($author$project$VegaLite$equalEarth)
			]));
	var geoData = A2(
		$author$project$VegaLite$dataFromUrl,
		$author$project$GalleryTable$giCentrePath + 'europe/nwEuropeLand.json',
		_List_fromArray(
			[
				$author$project$VegaLite$topojsonFeature('ne_10m_land')
			]));
	var geoSpec = $author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				geoData,
				$author$project$VegaLite$geoshape(
				_List_fromArray(
					[
						$author$project$VegaLite$maStroke('white'),
						$author$project$VegaLite$maStrokeWidth(0.4),
						$author$project$VegaLite$maFilled(false)
					]))
			]));
	var enc = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						$author$project$VegaLite$encoding,
						A2(
							$author$project$VegaLite$position,
							8,
							_List_fromArray(
								[
									$author$project$VegaLite$pName('longitude')
								]))),
					A2(
						$author$project$VegaLite$position,
						9,
						_List_fromArray(
							[
								$author$project$VegaLite$pName('latitude')
							]))),
				$author$project$VegaLite$color(
					_List_fromArray(
						[
							$author$project$VegaLite$mName('dir'),
							$author$project$VegaLite$mQuant,
							$author$project$VegaLite$mLegend(_List_Nil),
							$author$project$VegaLite$mScale(
							_List_fromArray(
								[
									$author$project$VegaLite$scDomain(
									$author$project$VegaLite$doNums(
										_List_fromArray(
											[0, 360]))),
									A2($author$project$VegaLite$scScheme, 'rainbow', _List_Nil)
								]))
						]))),
			$author$project$VegaLite$angle(
				_List_fromArray(
					[
						$author$project$VegaLite$mName('dir'),
						$author$project$VegaLite$mQuant,
						$author$project$VegaLite$mScale(
						_List_fromArray(
							[
								$author$project$VegaLite$scDomain(
								$author$project$VegaLite$doNums(
									_List_fromArray(
										[0, 360]))),
								$author$project$VegaLite$scRange(
								$author$project$VegaLite$raNums(
									_List_fromArray(
										[180, 540])))
							]))
					]))),
		$author$project$VegaLite$size(
			_List_fromArray(
				[
					$author$project$VegaLite$mName('speed'),
					$author$project$VegaLite$mQuant
				])));
	var desc = $author$project$VegaLite$description('Vector array map showing wind speed and direction.');
	var data = A2($author$project$VegaLite$dataFromUrl, $author$project$GalleryTable$path + 'windvectors.csv', _List_Nil);
	var windSpec = $author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				data,
				enc(_List_Nil),
				$author$project$VegaLite$point(
				_List_fromArray(
					[
						$author$project$VegaLite$maShape($author$project$VegaLite$symWedge)
					]))
			]));
	var cfg = A2(
		$elm$core$Basics$composeL,
		$author$project$VegaLite$configure,
		$author$project$VegaLite$configuration(
			$author$project$VegaLite$coView(
				_List_fromArray(
					[
						$author$project$VegaLite$vicoStep(10),
						$author$project$VegaLite$vicoFill(
						$elm$core$Maybe$Just('black'))
					]))));
	return $author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				desc,
				cfg(_List_Nil),
				$author$project$VegaLite$width(600),
				$author$project$VegaLite$height(560),
				proj,
				$author$project$VegaLite$layer(
				_List_fromArray(
					[geoSpec, windSpec]))
			]));
}();
var $author$project$GalleryTable$mySpecs = $author$project$VegaLite$combineSpecs(
	_List_fromArray(
		[
			_Utils_Tuple2('table1', $author$project$GalleryTable$table1),
			_Utils_Tuple2('table2', $author$project$GalleryTable$table2),
			_Utils_Tuple2('table3', $author$project$GalleryTable$table3),
			_Utils_Tuple2('table4', $author$project$GalleryTable$table4),
			_Utils_Tuple2('table5', $author$project$GalleryTable$table5),
			_Utils_Tuple2('table6', $author$project$GalleryTable$table6),
			_Utils_Tuple2('table7', $author$project$GalleryTable$table7)
		]));
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$GalleryTable$main = $elm$core$Platform$worker(
	{
		as: $elm$core$Basics$always(
			_Utils_Tuple2(
				$author$project$GalleryTable$mySpecs,
				$author$project$GalleryTable$elmToJS($author$project$GalleryTable$mySpecs))),
		ay: $elm$core$Basics$always($elm$core$Platform$Sub$none),
		aA: F2(
			function (_v0, model) {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'GalleryTable':{'init':$author$project$GalleryTable$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));