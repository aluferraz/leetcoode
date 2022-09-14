

let target = ["TicTacToe","move","move","move","move","move","move","move"]
let input = [[3],[0,0,1],[0,2,2],[2,2,1],[1,1,2],[2,0,1],[1,0,2],[2,1,1]]
let varname = "ticTacToe";
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