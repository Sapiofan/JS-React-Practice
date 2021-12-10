function transform(str){
    const array = str.split('');
    let counter = 0;

    for(let i = 0; i < array.length; i++){
        if(array[i] == array[i].toUpperCase())
        {
            counter++;
        }
    }
    if(counter > array.length/2){
        return str.toUpperCase();
    }
    else{
        return str.toLowerCase();
    }
}

const str = "Code"; 
console.log(transform(str));