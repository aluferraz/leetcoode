var firstUniqChar = function (s) {
    const charMap = new Map(); // max to 26
    for (let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        let total = 0;
        let idx = i;
        if (charMap.has(currentChar)) {
            const currentInfo = charMap.get(currentChar);
            total = currentInfo.total;
            idx = currentInfo.idx;
        }
        total++;
        charMap.set(currentChar, { total, idx });
    }
    for (let currentInfo of charMap) {
        if (currentInfo[1].total === 1) return currentInfo[1].idx;
    }
    return -1;
};