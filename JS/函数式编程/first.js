// let arr1 = [1,2,3,4,5,6]
// let arr2 = arr1.reverse()
// console.log(arr2,'66666')


// 实现ladash从右往左调用函数
const reverse = function(arr){
    return arr.reverse()
}
const first = function(arr){
    return arr[0]
}
const upper = function(arr){
    return arr.toUpperCase()
}

function flowRight(...arg){
    return function (value){
        return arg.reverse().reduce((pre,fuc)=>{
                    return fuc(pre)
                },value)
    }
}
let fn1 = flowRight(upper,first,reverse)
    console.log(fn1(['ni','hao','ma']))