



let target = ["WordFilter", "f"]
let input = [[["abbba", "abba"]], ["ab", "ba"]]
let varname = "wordFilter";
isClass = true;
input = input.map((row) => {
    return row.map((el) => {
        return isNaN(el) && !Array.isArray(el) ? `"${el}"` : el;
    })
})

let commands = [];
if (isClass) {
    commands.push(`let ${varname} = new ${target[0]}(${Array.isArray(input[0]) ? JSON.stringify(input[0][0]) : input[0].join(',')});`)
}

for (let i = isClass ? 1 : 0; i < target.length; i++) {
    let currentCommand = varname + "." + target[i] + "(" + input[i].join(',') + ')';
    currentCommand = `console.log((${currentCommand}));`;
    commands.push(currentCommand);
}
console.log(commands.join("\n"))