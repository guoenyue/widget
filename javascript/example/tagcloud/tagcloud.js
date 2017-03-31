// 模块，命名空间
;(function() {
    // 获取所有的标签元素
    var tagEls = "querySelectorAll" in document ? document.querySelectorAll('.tag') : getElementsByClassName('tag'),
        // 获取标签云元素
        tagArea = "querySelectorAll" in document ? document.querySelector('.tag-cloud') : getElementsByClassName('tag-cloud')[0],
        // 保存所有的标签实例
        tags = [],
        // 旋转中心(圆心)坐标及半径
        cirX = tagArea.offsetWidth / 2,
        cirY = tagArea.offsetHeight / 2,
        RADIUS = 120,
        FALLLENGTH = 180,
        angleX = Math.PI / FALLLENGTH,
        angleY = Math.PI / FALLLENGTH,
        EVENTX = tagArea.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
        EVENTY = tagArea.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
    // init
    function init() {
        for(var i = 0; i < tagEls.length; i++) {
            // 设置种子
            var range = (2 * (i + 1) - 1) / tagEls.length - 1;
            // 通过设置的种子获取角度范围
            var angle = 2 * Math.acos(range);
            // 设置随机种子
            var rand = angle * Math.sqrt(tagEls.length * Math.PI);
            // 通过角度设置当前元素的坐标
            var x = RADIUS * Math.cos(angle) * Math.cos(rand);
            var y = RADIUS * Math.sin(angle) * Math.sin(rand);
            var z = RADIUS * Math.cos(angle);
            // 实例化
            var tag = new TagCloud(tagEls[i], x, y, z);
            // 设置字体颜色
            tagEls[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
            tags.push(tag);
            // 调用move，运转
            tag.move();
        }
    }

    // 通过className获取元素
    function getElementsByClassName(className) {
        // 浏览器支持getElementsByClassName，直接返回getElementsByClassName
        if(document.getElementsByClassName) {
            return document.getElementsByClassName(className);
        }
        // 获取所有元素
        var els = document.getElementsByTagName("*");
        // 结果集
        var result = [];
        // 筛选
        for(var i = 0; i < els.length; i++) {
            if(className == els[i].className) {
                result.push(els[i]);
            }
        }
        return result;
    }
    Array.prototype.forEach = function(callback){
    	for(var i=0;i<this.length;i++){
    		callback.call(this[i]);
    	}
    }
    // 动画
    function animate() {
        // 设置定时器执行动画
        setInterval(function() {
            // 旋转
            rotateX();
            rotateY();
            tags.forEach(function() {
                // 执行每个实例的move
                this.move();
            });
        }, 20);
    }
    // 监听鼠标事件
    if("addEventListener" in window){
    	tagArea.addEventListener("mousemove" , function(event){
    		var x = event.clientX - EVENTX - cirX;
    		var y = event.clientY - EVENTY - cirY;
    		angleY = x * 0.0001;
    		angleX = y * 0.0001;
    	});
    }
    else {
    	tagArea.attachEvent("onmousemove" , function(event){
    		var x = event.clientX - EVENTX - cirX;
    		var y = event.clientY - EVENTY - cirY;
    		angleY = x * 0.0001;
    		angleX = y * 0.0001;
    	});
    }
    function rotateX() {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        tags.forEach(function() {
            this.y = this.y * cos - this.z * sin;
            this.z = this.z * cos + this.y * sin;
        });
    }
    function rotateY() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        tags.forEach(function() {
            this.x = this.x * cos - this.z * sin;
            this.z = this.z * cos + this.x * sin;
        });
    }
    // 构造函数
    function TagCloud(el, x, y, z) {
        this.el = el;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    TagCloud.prototype = {
        // constructor: TagCloud,
        move: function() {
            var scale = FALLLENGTH / (FALLLENGTH - this.z);
            var alpha = (this.z + RADIUS) / RADIUS / 2;
            // x
            this.el.style.left = cirX + this.x - this.el.offsetWidth/2 + "px";
            // y
            this.el.style.top = cirY + this.y - this.el.offsetHeight/2 + "px";
            // z
            this.el.style.zIndex = parseInt(scale * 100);
            // opacity
            this.el.style.filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";  // IE
            this.el.style.opacity = alpha + 0.5;    // 其他
            // font size
            this.el.fontSize = 14 * scale + "px";
        }
    }
    init();
    animate();
})();
