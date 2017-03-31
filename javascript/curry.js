function curry(fn, argLen, currArgs){
    return function(){
        var args = [].slice.call(arguments);
        console.log(args, currArgs);
        // 首次调用时未提供最后一个参数
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }
        // 递归出口
        if (args.length == argLen) {
             return fn.apply(this, args);
         }
         else {
              return curry(fn, argLen, args);
          }
      }
 }

function sum(a, b, c, d) {
    return a + b + c + d;
}

var sum4 = curry(sum, 4);
