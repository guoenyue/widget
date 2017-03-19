### JavaScript的面向对象
---
原文地址：http://www.alloyteam.com/2015/06/javascript-shu-ju-jie-gou-he-suan-fa-jian-shu-qian-yan/

JavaScript是一种对象的语言，但是又不是一种真正意义上的面向对象的语言，因为没有class(类)的语法。

- 创建对象

    创建对象就是把属性和方法封装成一个对象，或者从原型中实例化一个对象。

    1. 原始模式
    
    ```
    // 实例声明
    var dog1 = {};
    // 添加name属性
    dog1.name = '二哈';
    // 添加classify属性
    dog1.classify = '哈士奇';

    // 声明另一个实例
    var dog2 = {};
    dog2.name = 'yoyo';
    dog2.classify = '柯基犬';
    ```
    缺点：  
        - 创建多个示例时繁琐
        - 看不出实例与原型之间的关系
    
    改进：
    
    ```
    function Dog(name, classify) {
        return {
            name: name,
            classify: classify
        };
    }

    // 实例化
    var dog1 = Dog('二哈', '哈士奇');
    var dog2 = Dog('yoyo', '柯基犬');
    ```
    解决了代码重复问题，但是dog1和dog2并没有内在联系，不是来自同一个原型对象。

    2. 构造函数模式
    
    构造函数是内部使用this的函数，通过new就能生成对象实例，并且this变量会绑定在实例对象上。

    ```
    function Dog(name, classify) {
        this.name = name;
        this.classify = classify;
    }

    // 实例化
    var dog1 = new Dog('二哈', '哈士奇');
    var dog2 = new Dog('yoyo', '柯基犬');
    ```
    虽然解决了原始模式的缺点，但有时候会存在浪费内存的问题。
    
    ```
    function Dog(name, classify) {
        this.name = name;
        this.classify = classify;
        // 公共属性type
        this.bark = '犬科';
        // 公共方法dark
        this.bark = function() {
            // do something
        }
    }

    // 实例化
    var dog1 = new Dog('二哈', '哈士奇');
    var dog2 = new Dog('yoyo', '柯基犬');
    dog1.bark();
    dog2.bark();
    ```
    对于每个实例而言，type属性和bark方法都是一样的，但是每次创建新的实例，都要为其分配新的内存空间，这样会降低性能，浪费空间，缺乏效率。

    3. Prototype模式
    
    每个构造函数都有一个prototype属性指向另一个对象，这个对象的所有属性和方法，都会被构造函数的实例继承。利用这一点，把那些不变的属性和方法，定义在prototype对象上。

    ```
    function Dog(name, classify) {
        this.name = name;
        this.classify = classify;
    }
    Dog.prototype.type = '犬科';
    Dog.prototype.bark = function() {
        // do something
    }
    // 实例化
    var dog1 = new Dog('二哈', '哈士奇');
    var dog2 = new Dog('yoyo', '柯基犬');
    dog1.bark();
    dog2.bark();
    ```
    这里所有的实例对象的type属性和bark方法，都指向prototype对象，且都是同一个内存地址。

- 继承
    
    两个构造函数Animal和Dog,实现Dog对Animal的继承。

    ```
    function Animal() {
        this.feeling = 'happy';
    }

    function Dog(name, classify) {
        this.name = name;
        this.classify = classify;
    }
    ```
    1. 原型链继承

    ```
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog;
    
    var dog1 = new Dog('二哈', '哈士奇');
    console.log(dog1.feeling);
    ```
    原型链继承存在的问题：
        - 当被继承对象中包含引用类型的属性时，该属性会被所有实例对象共享。
        - 不能在不影响所有实例对象的情况下，向父级构造函数传递参数。 

    2. 构造函数继承
    
    ```
    function Dog(name, classify) {
        Animal.apply(this, arguments);
        this.name = name;
        this.classify = classify;
    }
    
    var dog = new Dog('二哈', '哈士奇');
    console.log(dog1.feeling);
    ```
    这是种十分简单的方法，使用apply或call方法改变构造函数作用域，将父函数的构造函数绑定到子对象上。虽然解决了子对象向父对象传递参数的目的，但是借助构造函数，方法都在构造函数中定义，函数也就失去了可复用性。

    3. 构造函数和原型链组合继承

    利用构造函数实现对实例属性的继承，使用原型链完成对原型属性和方法的继承，避免了原型链和构造函数的缺陷。
    
    ```
    function Animal(name) {
        this.name = name;
        this.colors = ['red', 'green', 'blue'];
    }
    Animal.prototype.sayName = function() {
        print(this.name);
    };
    function Dog(name, age) {
        // 继承属性
        Animal.call(this, name);
        this.age = age;
    }
    // 继承方法
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog;
    Dog.prototype.sayAge = function() {
        print(this.age);
    }
 
    var dog1 = new Dog('二狗', 1);
    dog1.colors.push('black');
    print(dog1.colors); // red,green,blue,black
    dog1.sayName(); // 二狗
    dog1.sayAge(); // 1
 
    var dog2 = new Dog('二牛', 2);
    print(dog2.colors); // red,green,blue
    dog2.sayName(); // 二牛
    dog2.sayAge(); // 2
    ```
    4. YUI式继承
    
    由原型链继承延伸而来，避免了实例对象的prototype指向同一个对象的缺点(Dog.prototype包含一内部指针指向Animal.prototype，同时Dog的所有实例也都包含一内部指针指向Dog.prototype，那么任何对Dog实例上继承自Animal的属性或方法放修改，都会反映到Dog.prototype）。让Dog跳过Animal，直接继承Animal.prototype，这样省去执行和创建Animal实例，提高了效率。同时利用一个空对象作为媒介，空对象几乎不占用内存。

    ```
    function Animal() {}
    Animal.prototype.feeling = 'happy';

    function extend(Child, Parent) {
        var F = function(){};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
    }

    extend(Dog, Animal);

    var dog1 = new Dog('二哈', '哈士奇');
    console.log(dog1.feeling);
    ```
    5. 拷贝继承(浅拷贝和深拷贝)
    把父对象的属性和方法，全部拷贝给子对象，也能实现继承。
        - 浅拷贝
        
        ```
        function Animal() {}
        Animal.prototype.feeling = 'happy';

        function extend(Child, Parent) {
            var p = Parent.prototype;
            var c = Child.prototype;
            for(var i in p) {
                c[i] = p[i];
            }
        }

        extend(Dog, Animal);

        var dog = new Dog('二哈', '哈士奇');
        console.log(dog1.feeling);
        ```
    存在的问题：如果父对象的属性等于数组或另一个对象，实际上，子对象获得的只是一个内存地址，而不是真正的拷贝，因此存在父对象被篡改的可能。

        ```
        Animal.prototype.colors = ['red', 'green', 'blue'];
        Dog.colors.push('black');
    
        console.log(Dog.colors);    // red,green,blue,black
        console.log(Animal.colors);    // red,green,blue,black
        // jQuery早起实现继承的方式
        ```
        - 深拷贝
        
        ```
        function Animal() {}
        Animal.prototype.feeling = 'happy';

        function deepCopy(Child, Parent) {
            var p = Parent.prototype;
            var c = Child.prototype;
            for(var i in p) {
                if(typeof p[i] === 'object') {
                    c[i] = (p[i].constructor === Array ? [] : {})；
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
        }

        deepCopy(Dog, Animal);

        var dog = new Dog('二哈', '哈士奇');
        console.log(dog1.feeling);
        ```

        深拷贝能够实现真正意义上的数组和对象的拷贝。这时，在子对象上修改属性(引用类型)，就不会影响到父元素了。这也是目前jQuery使用的继承方式。


### apply、call、bind的区别
---
在js中，这三者都是用来改变函数的this对象的指向的。
- 相似点
    1. 都是用来改变函数的this对象的指向
    2. 第一个参数都是this要指向的对象
    3. 都可以利用后续参数传参
- 不同点
    1. apply和call都是对函数的直接调用，而bind方法返回的仍是一个函数，因此后面还需要()来进行调用才可以。
    2. call后面的参数与方法中的参数是一一对应的，而apply的第二个参数是一个数组，数组中的元素是和方法中一一对应，由于bind返回的仍然是一个函数，所以我们可以在调用的时候再进行传参。

示例说明：

```
var xw = {
    name : "小王",
    gender : "男",
    age : 24,
    say : function() {
        alert(this.name + " , " + this.gender + " ,今年" + this.age);                                
    },
    tell: function(sch, gra) {
        alert(this.name + " , " + this.sch+ " ,今年" + this.gra); 
    }
}
var xh = {
    name : "小红",
    gender : "女",
    age : 18
}
xw.say();
// 用xw的say方法显示xh的数据
1. call
    xw.say.call(xh);
2. apply
    xw.say.apply(xh);
3. bind
    xw.say.bind(xh)();

// 用xw的tell方法显示xh的数据
1. call
    xw.tell.call(xh, 'a'， 'b');
2. apply
    xw.tell.apply(xh, ['a', 'b']);
3. bind
    xw.tell.bind(xh)('a', 'b');
```
