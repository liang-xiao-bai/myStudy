class Vue{
    constructor(options){
        // 1、通过属性保存选项的数据
        this.$options = options
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this.$data = options.data
        // 2、把data中的成员转换成getter和setter，注入到vue实例中
        this._proxyData(this.$data)
        // 3、调用observer对象对data进行数据劫持（也就是遍历data中所有成员，把他们变成响应式数据），监听数据的变化；
        // 数据劫持的时候给每个属性创建一个dep对象用于管理依赖，getter的时候收集依赖，setter的时候通知依赖
        new Observer(this.$data)
        // 4、调用compiler对象，解析指令差值表达式，初次渲染页面
        new Compiler(this)
    }
    _proxyData(data){
       Object.keys(data).forEach(key=>{
           Object.defineProperty(this,key,{
               enumerable:true,
               configurable:true,
               get(){
                   return data[key]
               },
               set(newVlue){
                    //data[key]为 get
                    //data[key]===newVlue 为 get
                    //data[key] = newVlue 为 get 和 set
                    if(data[key]===newVlue){
                        return
                    }
                    data[key] = newVlue
               }
           })
       })
    }
}