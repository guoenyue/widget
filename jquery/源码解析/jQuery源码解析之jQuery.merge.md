# jQuery源码解析——jQuery.merge

源码：
```
jQuery.merge = function(first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;

    while(j < len) {
        first[i++] = second[j++];
    }

    // support: IE < 9
    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
    if(len != len) {
        while(second[j] !== undefined) {
            first[i++] = second[j++];
        }
    }

    first.length = i;

    return first;
}
```

1. var len = +second.length;

    看到这里的+second.length前的+有疑问，为什么要+？ 看到网上的回答基本都是把后面的内容转成number类型，真的只是这样么？那后面的while和support: IE < 9下的内容该如何解释呢？

    首先，先看一下merge方法：该方法用于合并两个数组的元素到第一个数组中，改变第一个原数组。第一个参数可以是数组或类数组对象，即必须含有整型(或可以转换成整型)属性length；第二个参数可以是数组、类数组对象或任何含有连续整型属性的对象。

    先举一个例子，然后尝试获取下b.length和+b.length：
    
    ```
    var b = {0: 1, 1: 2, };
    b.length;    // undefined
    +b.length;   // NaN
    ```
    b.length的结果为undefined，而+b.length的结果为NaN。这样也就不难解释下面的的注释：在IE < 9中，会把nodeList等类数组对象的length转为NaN。同样，也就明白了后面代码是如何执行的了。

2. 通过上面可以发现，其实这里是暗含一个条件判断的，即：

    ```
    var j = 0;
    j < NaN;    // false

    // len不为NaN时执行
    while(j < len) {
        ...
    }

    // len为NaN时执行
    if(len != len) {
        ...
    }
    ```
    这里还暗含了一个知识点：在JavaScript中，非数字值和任何值都不相等，包括自身，也就是无法通过x == NaN来判断x是否为NaN，而应该是否x != x来判断，当且仅当x为NaN时，x ！= x的值才为true。