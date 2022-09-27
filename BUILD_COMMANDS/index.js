



let target = ["FirstUnique","add","add","showFirstUnique"]


let input =[[[1]],[1],[1],[]]
let varname = "firstUnique";
isClass = true;


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