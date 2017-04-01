/**
 * H5 clock
 * Author: umiyo
 * Date: 2017/03/31
 * Layout：
 *      round1/hour/minute/second
 *      hour-hand
 *      minute-hand
 *      second-hand
 *      round2
 *      round3
 **/
 window.onload = function() {
     var clock = document.getElementById('h5clock');
     mecClock(clock);

     function mecClock(container) {
         //检测是否支持html5 不支持则return
         if(typeof requestAnimationFrame !=='function') {
             return;
         }
         // 定位div
         var center = document.createElement('div');
         center.className = 'center';
         container.appendChild(center);
         // 数字
         var dynamic = document.createElement('div');
         dynamic.className = 'dynamic';
         center.appendChild(dynamic);
         // 中心环
         var round1 = document.createElement('div');
         round1.className = 'expand round circle1';
         center.appendChild(round1);
         // 时针
         var hourElement   = document.createElement('div');
         hourElement.className = 'anchor hour';
         center.appendChild(hourElement);
         var thinHand = document.createElement('div');
         var fatHand = document.createElement('div');
         thinHand.className = 'element thin-hand';
         fatHand.className = 'element fat-hand';
         hourElement.appendChild(thinHand);
         hourElement.appendChild(fatHand);
         // 分针
         var minuteElement   = document.createElement('div');
         minuteElement.className = 'anchor minute';
         center.appendChild(minuteElement);
         var thinHand = document.createElement('div');
         var fatHand = document.createElement('div');
         thinHand.className = 'element thin-hand';
         fatHand.className = 'element fat-hand minute-hand';
         minuteElement.appendChild(thinHand);
         minuteElement.appendChild(fatHand);
         // 秒针
         var secondElement   = document.createElement('div');
         secondElement.className = 'anchor second';
         center.appendChild(secondElement);
         var secondHand = document.createElement('div');
         secondHand.className = 'element second-hand';
         secondElement.appendChild(secondHand);
         // 中心环
         var round2 = document.createElement('div');
         var round3 = document.createElement('div');
         round2.className = 'expand round circle2';
         round3.className = 'expand round circle3';
         center.appendChild(round2);
         center.appendChild(round3);
         // 绘制分线或数字
         var minute = function(n) {
             return n % 5 == 0 ? minuteText(n) : minuteLine(n);
         }
         // 绘制分数字
         var minuteText = function(n) {
             var element = document.createElement('div');
             element.className = 'minute-text';
             element.innerHTML = (n < 10 ? '0' : '') + n;
             position(element, n / 60, 124);
             dynamic.appendChild(element);
         }
         // 绘制分线
         var minuteLine = function(n) {
             var anchor = document.createElement('div');
             anchor.className = 'anchor';
             var element = document.createElement('div');
             element.className = 'element minute-line';
             rotate(anchor, n);
             anchor.appendChild(element);
             dynamic.appendChild(anchor);
         }
         // 绘制时
         var hour = function(n) {
             var element = document.createElement('div');
             element.className = 'hour-text hour-' + n;
             element.innerHTML = n;
             position(element, n / 12, 96);
             dynamic.appendChild(element);
         }
         // 确定位置
         var position = function(element, phase, r) {
             var theta = phase * 2 * Math.PI;
             element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px';
             element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px';
         }
         // 旋转
         var rotate = function(element, second) {
             element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
         }
         // 计算时间，处理动画
         var isSetTimer = false;
         var _timer     = new Date();
         var bTimer     = _timer.getTime();
         // 本地时间，可以转换用服务器时间
         var _info = { timer: new Date().getTime() };
         var animate = function() {
             var now  = new Date();
             //处理Date对象
             if(!isSetTimer && _info.timer) {
                 isSetTimer = true;
                 now.setTime(_info.timer);
             }else if(_info.timer) {
                 var nowTimer = _info.timer + now.getTime() - bTimer;
                 now.setTime(nowTimer);
             }
             var time = now.getHours() * 3600 +
                        now.getMinutes() * 60 +
                        now.getSeconds() * 1 +
                        now.getMilliseconds() / 1000;
             rotate(secondElement, time);
             rotate(minuteElement, time / 60);
             rotate(hourElement, time / 60 / 12);
             requestAnimationFrame(animate);
         };
         for (var i = 1; i <= 60; i ++) minute(i);
         for (var i = 1; i <= 12; i ++) hour(i);
         animate();
     }
 };
