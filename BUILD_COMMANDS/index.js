



let target = ["MyCalendarThree","book","book","book","book","book","book","book","book","book","book"]

let input = [[],[24,40],[43,50],[27,43],[5,21],[30,40],[14,29],[3,19],[3,14],[25,39],[6,19]]
let varname = "myCalendarThree";
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