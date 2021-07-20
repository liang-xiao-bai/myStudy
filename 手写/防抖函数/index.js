function debounce(func,delayed){
    let timer = null 
    return function(){
        clearTimeout(timer)
        timer = setTimeout(function(){
            func()
        },delayed)
    }
}