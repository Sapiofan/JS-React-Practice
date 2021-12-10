function findSumIfExist(arr, num){
    const indexes = [];
    for(let i = 0; i < arr.length-1; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i]+arr[j] === num){
                indexes.push(i);
                indexes.push(j);
                return indexes;
            }
        }
    }
    return indexes;
}

const array = [10, 5, 6, 12, 7];
const num = 12;
const indexes = findSumIfExist(array, num);
console.log(indexes);