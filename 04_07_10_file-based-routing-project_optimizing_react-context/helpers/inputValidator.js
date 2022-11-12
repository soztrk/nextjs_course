export default {
    email(value){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(value)
    },
    required(value){
        return !/^\s+$|^$/gi.test(value)
    }
}