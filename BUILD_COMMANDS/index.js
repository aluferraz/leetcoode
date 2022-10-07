



let target = ["TimeMap", "set", "set", "set", "set", "get", "get", "get", "get", "get", "get", "set", "get", "get", "get", "set", "set", "set", "set", "get", "get"]
let input = [[], ["ctondw", "ztpearaw", 1], ["vrobykydll", "hwliiq", 2], ["gszaw", "ztpearaw", 3], ["ctondw", "gszaw", 4], ["gszaw", 5], ["ctondw", 6], ["ctondw", 7], ["gszaw", 8], ["vrobykydll", 9], ["ctondw", 10], ["vrobykydll", "kcvcjzzwx", 11], ["vrobykydll", 12], ["ctondw", 13], ["vrobykydll", 14], ["ztpearaw", "zondoubtib", 15], ["kcvcjzzwx", "hwliiq", 16], ["wtgbfvg", "vrobykydll", 17], ["hwliiq", "gzsiivks", 18], ["kcvcjzzwx", 19], ["ztpearaw", 20]]
let varname = "timeMap";
isClass = true;
input = input.map((row) => {
    return row.map((el) => {
        return isNaN(el) ? `"${el}"` : el;
    })
})

let commands = [];
if (isClass) {
    commands.push(`let ${varname} = new ${target[0]}(${input[0].join('')});`)
}

for (let i = isClass ? 1 : 0; i < target.length; i++) {
    let currentCommand = varname + "." + target[i] + "(" + input[i].join(',') + ')';
    currentCommand = `console.log((${currentCommand}));`;
    commands.push(currentCommand);
}
console.log(commands.join("\n"))