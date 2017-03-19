// 深拷贝
function deepCopy(obj) {
    var buffer; // 先声明一个buffer，但不初始化，根据obj类型动态创建
    if(obj instanceof Array) {
        buffer = [];    // 创建一个空数组
        var i = obj.length;
        while(i--) {
            buffer[i] = deepCopy(obj[i]);
        }
        return buffer;
    }
    else if(obj instanceof Object) {
        buffer = {};    // 创建一个空对象
        // 为这个对象添加新的属性
        for(var k in obj) {
            buffer[k] = deepCopy(obj[k]);
        }
        return buffer;
    }
    else {
        return obj;
    }
}

// jQuery中的extend函数
