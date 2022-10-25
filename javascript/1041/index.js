/**
 * @param {string} instructions
 * @return {boolean}
 */
 const DIRECTIONS_MAP = {
    U:{ //UP
        L: "L",
        R: "R"
    },
    D:{//DOWN
        L: "R",
        R: "L"
    },
    L:{//LEFT
        L: "D",
        R: "U"
    },
    R:{//RIGHT
        L: "U",
        R: "D"
    },
    
}
const DIRECTIONS_MOVEMENTS_MAP = {
    //Y,X
    U:[1,0],
    D:[-1,0],
    L:[-1,0],
    R:[1,0],
}


var isRobotBounded = function(instructions) {
    let currentDirectionSlow = 'U';
    let currentDirectionFast = 'U';
    let currentPosSlow = [0,0];
    let currentPosFast = [0,0];
    let slowCursor = 0;
    let fastCursor = 0;
    for(let i = 0; i < 4; i++){
        while(slowCursor < instructions.length){
            const instructionSlow = instructions[slowCursor];
            const movementSlow = moveRobot(currentPosSlow,instructionSlow, currentDirectionSlow);
            currentPosSlow = movementSlow[0];
            currentDirectionSlow = movementSlow[1];
            //Move faster the second pointer
            for(let j = 0; j < 2; j++){
                const instructionFast = instructions[fastCursor];
                const movementFast = moveRobot(currentPosFast,instructionFast, currentDirectionFast);
                currentPosFast = movementFast[0];
                currentDirectionFast = movementFast[1];
                fastCursor = (fastCursor + 1) % instructions.length
            }
            slowCursor++;
            if (
                currentPosFast[0] === currentPosSlow[0] &&
                currentPosFast[1] === currentPosSlow[1] && 
                currentDirectionSlow === currentDirectionFast &&
                (fastCursor % instructions.length) === ( slowCursor % instructions.length ) //Round trip
               ){
                return true;
            }
        }
        slowCursor = 0;
        fastCursor = 0;
    }
    return false;
};


function moveRobot(position, instruction, currentDirection){
    let newPosition = position;
    let newDirection  = currentDirection;
    let movement = [0,0];
    switch(instruction) {
        case "G": 
            movement = DIRECTIONS_MOVEMENTS_MAP[currentDirection];
            newPosition[0] += movement[0];
            newPosition[1] += movement[1];
            break;
        default:
            newDirection = DIRECTIONS_MAP[currentDirection][instruction];
    }
    return [newPosition,newDirection];
}
