/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

//T: O(V+E) / S: O(Max(N,P)) 
var findOrder = function (numCourses, prerequisites) {
    //debugger;
    if (numCourses === 0) return 0;
    let preReqMap = buildPreReqMap(prerequisites);
    let coursesFinished = new Set(); //Set remember the order of the i

    //Transverse courses using DFS
    for (let i = 0; i < numCourses; i++) {
        dfs(i, preReqMap, coursesFinished, new Set());
    }
    return coursesFinished.size === numCourses ? Array.from(coursesFinished.keys()) : [];

};
//T:O(V+E) / S: (V+E)
function dfs(currentCourse, preReqMap, coursesFinished, callstack) {
    if (!preReqMap.has(currentCourse)) {
        coursesFinished.add(currentCourse);
        return;
    }
    if (callstack.has(currentCourse)) return; //Dependency loop prevention
    if (coursesFinished.has(currentCourse)) return;

    callstack.add(currentCourse);
    const preReqSet = preReqMap.get(currentCourse);
    for (let preReq of preReqSet) {
        dfs(preReq, preReqMap, coursesFinished, callstack);
        if (!coursesFinished.has(preReq)) return; // We cant finish the prereqs
    }
    coursesFinished.add(currentCourse);

}

function buildPreReqMap(prerequisites) {
    let map = new Map();

    for (let i = 0; i < prerequisites.length; i++) {
        const currentCourse = prerequisites[i][0];
        const preReq = prerequisites[i][1];
        if (!map.has(currentCourse)) {
            map.set(currentCourse, new Set());
        }
        let currentDependencies = map.get(currentCourse);
        currentDependencies.add(preReq); //Directed graph so 0->1 !== 0<-1
        map.set(currentCourse, currentDependencies)
    }
    return map;

}

//findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])