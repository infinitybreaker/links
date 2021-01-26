var obj = {key1: "value1", key2: "value2"};
var pair = {key3: "value3"};

obj = {...obj, ...pair};

console.log(JSON.stringify(obj))
//https://www.codegrepper.com/search.php?answer_removed=1&q=javascript%20foreach%20dictionary