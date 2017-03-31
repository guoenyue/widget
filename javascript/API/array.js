/**
 * JavaScript对象——Array
 * Array属性：
 *      constructor
 *      length
 *      prototype
 * Array对象方法
 *      concat():   连接两个或更多的数组，并返回结果
 *      join():     通过指定的分隔符进行分隔，将数组所有元素放入一个字符串
 *      pop():      删除并返回删除的最后一个元素
 *      push():     向数组末尾添加元素，并返回数组最新长度
 *      reverse():  数组翻转
 *      shift():    删除并返回删除的第一个元素
 *      slice():    从已有数组返回选定元素，arg1是起始位置，arg2是结束位置，返回数组[start, end)，不改变元素组。
 *      sort();     对数组进行排序，参数为可选的设置排序方式的函数
 *      splice();   删除元素，并添加新元素。arg1删除元素位置，arg2删除元素个数，arg3插入的新元素，在数组末尾添加。
 *      toSource(); 返回该对象的源代码，Array派生，只Firefox的Gecko核心的浏览器支持
 *      toString(); 将数组转换成字符串,不改变原数组
 *      toLocalString();    将数组转换为本地数组，并返回结果，不改变原数组
 *      unshift();  在数组前面向数组中添加元素，返回新的数组长度
 *      valueOf();  返回数组对象的原始值
 **/
var a = [1, 2, 3];
a.concat([4, 5], [6, 7]);   // [1, 2, 3, 4, 5, 6, 7]
a.join('');     // "123"
a.join(',');    // "1, 2, 3"
a.pop();    // 3,执行后的数组为[1,2]
a.push(4, 5, 6);  // [1, 2, 4, 5, 6]
a.reverse();    // [6, 5, 4, 2, 1]
a.shift();  // [5, 4, 2, 1]
a.slice(2, 3);  // [2]
a.sort();   // [1, 2, 4, 5]
a.splice(1, 2); // [2, 4]
a // [1, 5]
a.splice(1, 1, 6);  // [5]
a // [1, 6]
a.toString();   // "1, 6"
a.toLocalString();  // "1, 6"
a.unshift(3, 4, 5); // 5
a   // [3, 4, 5, 1, 6]
a.valueOf();    // [3, 4, 5, 1, 6]

/** unique **/
Array.prototype.unique = function() {
    var tmp = [];
    for(var i = 0, len = this.length; i < len; i++) {
        if(tmp.indexOf(this[i]) === -1) {
            tmp.push(this[i]);
        }
    }
    return tmp;
};
/** indexOf **/
Array.prototype.indexOf = function(tag) {
    for(var i = 0, len = this.length; i < len;  i++) {
        if(this[i] === tag) {
            return i;
        }
    }
    return -1;
}
