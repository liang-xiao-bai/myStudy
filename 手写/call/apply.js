
Function.prototype.newapply = function(...args){
    let func = this
    let that = args[0]
    args.shift()
    args = args.flat(Infinity)
    if(!that){
        func(...args)
    }else{
        that.__proto__.fn = func
        that.fn(...args)
        delete that.__proto__.fn
        console.log(that)
    }
}
