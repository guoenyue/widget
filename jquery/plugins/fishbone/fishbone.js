(function($) {
  var fishBone = (function() {
    // 方法的构造函数
    function fishBone(el, options) {
      // 深拷贝
      this.settings = $.extend(true, $.fn.fishBone.defaults, options || {});
      this.el = el;
      this.init();
    }
    // 方法的原型方法
    fishBone.prototype = {
      // 这里是插件的初始化
      init: function() {
        this.initSettings(this.settings);
      },
      // 这里将是该插件的其他方法
      // 处理this.settings.data和this.settings.color
      initSettings: function(o) {
        this.fishData = [];
        var colors = o.colors,
            clen = o.colors.length;
        o.data.map((item, index) => {
          return this.fishData.push({
            title: item.title,
            content: item.content,
            position: index % 2 === 0 ? 'top' : 'bottom',
            color: colors[index % clen]
          });
        })

        return this.drawFishBone(this.fishData);
      },
      drawFishBone: function(a) {
        var top = $('<div class="fish-data"></div>'),
            bottom = $('<div class="fish-data bottom"></div>'),
            tfrag = $(document.createDocumentFragment()),
            bfrag = $(document.createDocumentFragment()),
            tul = $('<ul class="fish-items"></ul>'),
            bul = $('<ul class="fish-items"></ul>')
            tli = null;
            bli = null;

        for(var i = 0; i < a.length; i++) {
          if(a[i].position === 'top') {
            tli = $('<li class="item"></li>');
            tli.html('<em></em><h3 class="item-title">' + a[i].title + '</h3><p class="item-content">' + a[i].content + '</p>');
            tli.css('border-color', a[i].color);
            tli.find('em').css('background-color', a[i].color);
            tfrag.append(tli);
          }
          else {
            bli = $('<li class="item"></li>');
            bli.html('<em></em><h3 class="item-title">' + a[i].title + '</h3><p class="item-content">' + a[i].content + '</p>');
            bli.css('border-color', a[i].color);
            bli.find('em').css('background-color', a[i].color);
            bfrag.append(bli);
          }
        }
        tul.append(tfrag);
        bul.append(bfrag);
        top.append(tul);
        bottom.append(bul);
        this.el.append(top, $('<div class="fish-line"></div>'), bottom);
        this.el.addClass('js-fishbone');

        return this.reasonably();
      },
      reasonably: function() {
        var perWidth = ($('.js-fishbone').parent().width() - 20 * this.settings.row) / this.settings.row;
        $('.js-fishbone .item').css('width', perWidth);
        $('.js-fishbone .fish-items').css('width', Math.ceil(this.fishData.length / 2) * (perWidth + 20));
        $('.js-fishbone .fish-line').css('width', Math.ceil(this.fishData.length / 2) * (perWidth + 20) + (this.settings.mode === 'cross' ? perWidth / 2 : 0));
        if(this.settings.mode === 'cross') {
          $('.js-fishbone .fish-data.bottom').css('margin-left', perWidth / 2 + 10);
        }
      }
    }
    // 最后必要的return fishBone,否则无法调用构造函数
    return fishBone;
  })();

  $.fn.fishBone = function(options) {
    return this.each(function() {
      var _this = $(this),
          instance = _this.data('fishBone');
      // 判断是否实例化
      if(!instance) {
        _this.data('fishBone', (instance = new fishBone(_this, options)));
      }
      // 根据传入的数据类型，调用实例里的方法
      if($.type(options) === 'string') return instance[options]();
    });
  };
  // 默认值
  // 配置项说明：
  /**
   * [defaults description]
   * @type {Array}  data
   * @type {Array}  colors
   * @type {Number} row   3
   * @type {String} mode (align, cross)
   **/
  $.fn.fishBone.defaults = {
    data: [
      { title: '2014/02', content: 'Launch of oBike in Singapore' },
      { title: '2014/02/04', content: 'Launch of oBike in Singapore' },
      { title: '2014/02/05', content: 'Launch of oBike in Singapore' },
      { title: '2014/02/06', content: 'Launch of oBike in Singapore' },
      { title: '2014/03', content: 'Launch of oBike in Singapore' },
      { title: '2014/02/03', content: 'Launch of oBike in Singapore' },
      { title: '2014/03/05', content: 'Launch of oBike in Singapore' },
      { title: '2014/03/06', content: 'Launch of oBike in Singapore' },
    ],
    colors: ['#F44336', '#9C27B0', '#2196F3', '#4CAF50'],
    row: 3,
    mode: 'cross'
  };
  // 添加一个自动调用的方法，在需要调用的标签里面添加括号里面的内容
  $(function() {
    $('#fishbone').fishBone();
  });
})(jQuery);
