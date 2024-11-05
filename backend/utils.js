function errorCheck(a=[]){
    if(a.length){
        for(let input of a){
            if(!input)return false;
            if(!input.length)return false;
        }
    }return true;
}


module.exports={errorCheck}