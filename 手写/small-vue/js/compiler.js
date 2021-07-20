class Compiler{
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    compile(el){
        let chilNodes = [...el.childNodes]
        chilNodes.forEach(node=>{
            // 处理文本节点
            if(this.isTextNode(node)){
                this.compilerText(node)
                // 处理元素节点
            }else if(this.isElementNode(node)){
                this.compileElement(node)
            }
            // 判断是否还有子节点，如果有，递归调用compile
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }
    compileElement(node){
        [...node.attributes].forEach(attr=>{
            let attrName = attr.name
            if(this.isDirective(attrName)){
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node,key,attrName)
            }
        })
    }
    update(node,key,attrName){
        let updateFn = this[attrName+'Updater']
        updateFn && updateFn.call(this,node,this.vm[key])
    }
    textUpdater(node,value){
        node.textContent = value
    }
    modelUpdater(node,value){
        node.value = value
    }
    compilerText(node){
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key])
        }
    }
    // 判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}