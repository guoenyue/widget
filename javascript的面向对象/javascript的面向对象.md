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
