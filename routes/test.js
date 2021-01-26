dict1= {"1":"helo","2":"srtvgR"}
dict2={}

Object.keys(dict1).forEach((key)=>{
    dict2[dict1[key]]= {"weight":0,"clicks":0,"conversion":0}
})
console.log(dict2)
for([key, val] of Object.entries(dict1)) {
    dict2[val]={"weight":0,"clicks":0,"conversion":0}
  }
console.log(dict2)
Object.entries(dict1).forEach(([key, value]) => {
    dict2[val]={"weight":0,"clicks":0,"conversion":0}
});