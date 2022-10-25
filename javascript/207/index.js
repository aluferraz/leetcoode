/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const DONE = 1;
const UNDONE = 0;
const CHECKING = -1
var canFinish = function (numCourses, prerequisites) {
    let prereqMap = {}
    for (let i = 0; i < prerequisites.length; i++) {
        let [course, prereq] = prerequisites[i];
        let reqArray = (prereqMap[course] || []);
        reqArray.push(prereq);
        prereqMap[course] = reqArray;
    }
    let coursesDone = Array(numCourses).fill(UNDONE);
    for (let i = 0; i < numCourses; i++) {
        let course = i;
        if (!takeCourse(course, prereqMap, coursesDone)) {
            return false;
        }
    }
    return true;
};

function takeCourse(course, prereqMap, coursesDone) {
    if (coursesDone[course] === DONE) {
        return true; //Done
    }
    if (!(course in prereqMap)) {
        //No prereq, mark as done
        coursesDone[course] = DONE;
        return true;
    }
    if (coursesDone[course] === CHECKING) return false // Invalid dependency
    coursesDone[course] = CHECKING;
    let preReqs = prereqMap[course];
    for (let i = 0; i < preReqs.length; i++) {
        let dependency = preReqs[i];
        if (!takeCourse(dependency, prereqMap, coursesDone)) {
            return false;
        }
    }
    coursesDone[course] = DONE;
    return true;
}

console.log(canFinish(2, [[0, 1]]));