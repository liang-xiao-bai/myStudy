
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function promiseFirst(executor) {
    let that = this
    this.status = 'pending'
    this.value = null 
    this.reason = null 

    this.onSuccessCallback = []
    this.onRejectCallback = []
    // 改变状态并且记录值
    function resolve(value) {
        if(that.status === 'pending'){
            that.status = 'success'
            that.value = value
            that.onSuccessCallback.forEach(item=>{
                item(value)
            })
        }
    }
    // 改变状态并记录值
    function reject(value) {
        if(that.status === 'pending'){
            that.status = 'reject'
            that.reason = value
            that.onRejectCallback.forEach(item=>{
                item(value)
            })
        }
    }
    // 回调函数需要传递两个函数作为参数
    executor(resolve,reject)
}
promiseFirst.prototype.then = function (onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
    let promiseNext
    if(this.status === 'pending'){
        return promiseNext = new promiseFirst((resolve,reject)=>{
            this.onSuccessCallback.push(value=>{
                try{
                    let result = onFulfilled(value)
                    getResolveValue(promiseNext,result,resolve,reject)
                }catch(error){
                    reject(error)
                }
            })
            this.onRejectCallback.push(reason=>{
                try{
                    let result = onRejected(reason)
                    getResolveValue(promiseNext,result,resolve,reject)
                }catch(error){
                    reject(error)
                }
            })
        })
        // 遇到异步调用，把函数先暂存到一个数组中，异步调用结束再执行该函数
    }
    if(this.status === 'success'){
        return promiseNext = new promiseFirst((resolve,reject)=>{
            setTimeout(()=>{
                try{
                    let result = onFulfilled(this.value)
                    getResolveValue(promiseNext,result,resolve,reject)
                }catch(error){
                    reject(error)
                }
            })
        })
    }
    if(this.status === 'reject'){
        return  promiseNext = new promiseFirst((resolv,reject)=>{
            setTimeout(()=>{
                try{
                    let result = onRejected(this.reason)
                    getResolveValue(promiseNext,result,resolve,reject)
                }catch(error){
                    reject(error)
                }
            })
        })
    }
}

function getResolveValue(promisNext,raw,resolve,reject) {
    if(raw === promiseNext) return reject(new TypeError('不可返回同一个promise对象'))
    let mark
    if((typeof raw === 'object' && raw != null) || (typeof raw === 'function')){
        try{
            let then = raw.then
            if(typeof then === 'function'){
                then.call(raw,function(next){
                    if(mark) return
                    mark  = true
                    getResolveValue(promiseNext,next,resolve,reject)
                },
                function(err){
                    if(mark) return
                    mark = true
                    reject(err)
                })
            }else{
                resolve(raw)
            }
        }catch(error){
            if(mark) return
            reject(error)
        }
    }else{
        resolve(raw)
    }
}