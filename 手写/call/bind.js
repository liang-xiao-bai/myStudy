
Function.prototype.newbind = function(...args){
    let func = this
    let that = args[0]
    args.shift()
    return function(){
        func.newcall(that,...args)
    }
}

Function.prototype.newcall = function(...args){
    let func = this
    let that = args[0]
    args.shift()

    if(!that){
        func(...args)
    }else{
        that.__proto__.fn = func
        that.fn(...args)
        delete that.__proto__.fn
    }
}

