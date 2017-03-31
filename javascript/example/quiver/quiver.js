/**
 * 将el转化为相对定位的元素，使之左右颤动
 * @param {el}          元素对象或元素id
 * @param {onComplete}  以el为参数的函数，将在动画结束时调用
 * @param {distance}    颤动距离
 * @param {time}        持续时间
 **/
function quiver(el, onComplete, distance, time) {
    // 句柄参数
    if(typeof el === 'string')
        el = document.getElementById(el);
    // 设定默认持续时间
    if(!time)
        time = 500;
    // 设定默认颤动距离
    if(!distance)
        distance = 5;
    // 保存el的初始样式
    var originElStyle = el.style.cssText;
    // 使el相对定位
    el.style.position = 'relative';
    // 获取动画开始的时间
    var start = (new Date()).getTime();
    // 动画开始
    animate();

    /**
     * 根据时间更新el的位置
     * 动画完成时恢复el的初始状态，
     * 否则，更新el的位置，并重新运行
     **/
     function animate() {
         // 获取当前时间
         var now = (new Date()).getTime();
         // 计算已消耗用时
         var pastTime = now - start;
         // 用时与持续时间的比例
         var scale = pastTime / time;
         // 通过scale判断动画是否完成
         if(scale < 1) {
             // 计算el的位置
             var x = distance * Math.sin(scale * 4 * Math.PI);
             el.style.left = x + 'px';
             // 在25毫秒后或持续时间结束时尝试再次运行该函数，目的是产生每秒40帧的动画
             setTimeout(animate, Math.min(25, time - pastTime));
         }
         else {
             // 动画完成，恢复初始样式
             el.style.cssText = originElStyle;
             // 调用完成后的回调函数
             if(onComplete)
                onComplete(el);
         }
     }
}
