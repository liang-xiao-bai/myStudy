// 实现lodash柯理化函数

function add(a,b,c){
    return a + b + c
}

function curry(fuc){
    return function curryAfter(...arg){
        if(arg.length < fuc.length){
            return function () {
                return curryAfter(...arg,...arguments)
            }
        }
        return fuc(...arg)
    }
}

console.log(curry(add)(1)(2,3))