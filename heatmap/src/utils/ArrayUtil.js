export function unique(array) {
    let n = [];//临时数组
    for(let i = 0; i < array.length; i++){
        if(n.indexOf(array[i]) == -1)
            n.push(array[i]);
    }
    return n;
}
// 连续不重复
export function uniObj(array) {
    let n = [];
    let pos = 0;
    let tmp = {month: -1, pos: 0};
    // 翻转初始数组，处理后去掉第一个位置的月份
    array = array.reverse();
    array.forEach(function(item) {
        if(item.month != tmp.month) {
            if(tmp.month != -1) {
                n[pos] = tmp;
                pos++;
            }
            tmp = item;
        }
        else {
            tmp.pos = tmp.pos > item.pos ? tmp.pos : item.pos;
        }
    });
    // 翻转数组返回
    return n.reverse();
}
