




let target = ["SORTracker", "add", "add", "add", "add", "get", "get", "get", "get"]
let input = [[], ['"happy"', 100000], ['"thanks"', 100000], ['"giving"', 99999], ['"everyone"', 11111], [], [], [], []]
let varname = "sortTracker";
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