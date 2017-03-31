/**
 * @param {dstNum}     目标和值
 * @param {srcStr}     源字符串
 **/
function toSum(dstNum, srcStr, nFind = 0, result = '') {
    if(srcStr.length <= 0) return nFind;
    var curLen = dstNum.toString().length;
    for(var i = curLen; i > 0; i--) {
        if(dstNum - parseInt(srcStr.slice(0, i)) >= parseInt(srcStr.slice(i, srcStr.length).slice(0, 1))) {
            dstNum -= parseInt(srcStr.slice(0, i));
            result += srcStr.slice(0, i) + '+';
            srcStr = srcStr.slice(i, srcStr.length);
            if(dstNum == parseInt(srcStr)) {
                result += srcStr;
                nFind += 1;
            }
            else if(dstNum < parseInt(srcStr)) {
                return toSum(dstNum, srcStr, nFind, result);
            }
            else {
                result = false;
            }
        }
    }
    return result;
}

console.log(toSum(2017, '109876543219876543210'));
console.log(toSum(10, '1234'));
console.log(toSum(256, '9876543210'));
