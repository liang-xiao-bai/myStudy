function throttle(func,delayed){
    let timer = null
    return function(){
        if(timer) return
        func()
        timer = setTimeout(() => {
            timer = null
        }, delayed);
    }
}
