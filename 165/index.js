/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    let v1Subversions = version1.split('.');
    let v2Subversions = version2.split('.');
    let len = Math.max(v1Subversions.length, v2Subversions.length);

    for (let i = 0; i < len; i++) {
        let subV1 = getVersionValue(v1Subversions, i);
        let subV2 = getVersionValue(v2Subversions, i);
        if (subV1 < subV2) {
            return -1;
        }
        if (subV1 > subV2) {
            return 1;
        }

    }
    return 0;

};


function getVersionValue(version, i) {
    return i < version.length ? parseInt(version[i]) : 0;
}

console.log(compareVersion("1.0", "1.0.0"))