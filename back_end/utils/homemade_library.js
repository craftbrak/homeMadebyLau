
exports.ObjectExistNoNullField = obje =>{
    result = true
    nonTrueKeys = []
    for (key in obje) {
        if (!obje[key] || obje[key] ===null){
            result=false
            nonTrueKeys.push(key)
        }
    }
    return result
}
