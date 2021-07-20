function deepClone(obj){
    if(typeof obj !== 'object' || obj === null) return obj

    let newObj =  obj instanceof Array ? [] : {}

    // Object.prototype.test = 'test'
    for(let key in obj){
        console.log(key)
        // 保证key不是原型的属性
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key])
        }
    }
    return newObj
}