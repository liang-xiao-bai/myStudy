class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        if(!data || typeof data !== 'object'){
            return
        }
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }
    // 使用val是为了防止data[key]循环调用
    defineReactive(data,key,val){
        let that = this
        // 给每个属性创建dep对象，负责收集依赖，并发送通知
        let dep = new Dep()
        //如果val是对象，把val内部的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                console.log(val,'getgetgetget')
                return val
            },
            set(newValue){
                console.log(newValue,'setsetsetset')
                if(val === newValue){
                    return
                }
                val = newValue
                that.walk(newValue)
            }
        })
    }
}