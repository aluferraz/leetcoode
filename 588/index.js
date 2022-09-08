/*
FileSystem() Initializes the object of the system.
List<String> ls(String path)
If path is a file path, returns a list that only contains this file's name.
If path is a directory path, returns the list of file and directory names in this directory.
The answer should in lexicographic order.
void mkdir(String path) Makes a new directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
void addContentToFile(String filePath, String content)
If filePath does not exist, creates that file containing given content.
If filePath already exists, appends the given content to original content.
String readContentFromFile(String filePath) Returns the content in the file at filePath.
*/
var FileSystem = function () {
    // Trie-like object
    this.dirMap = {
        '/': {}
    };
    this.fileMap = {
        '/': {}
    };
    this.fileContents = new Map();
    this.sortedKeysMap = new Map();
    this.sortedKeysMap.set("/", []);
};

/** 
 * @param {string} path
 * @return {string[]}
 */
FileSystem.prototype.ls = function (path) {
    //debugger;
    if (this.fileContents.has(path)) {
        let dirPath = path.split('/');
        const fileName = dirPath.pop();
        return [fileName];
    }
    return this.sortedKeysMap.get(path)
};

/** 
 * @param {string} path
 * @return {void}
 */
FileSystem.prototype.mkdir = function (path) {
    //debugger;
    if (this.sortedKeysMap.has(path)) return;//Dir exists, ignoring
    let pathAsArray = path.split('/');
    let current = this.dirMap;
    //They are always absolute, so the first entry in the array is always ''
    let currentParentPath = [];
    for (let i = 0; i < (pathAsArray.length); i++) {
        if (pathAsArray[i] === '') pathAsArray[i] = '/';
        if (!(pathAsArray[i] in current)) { //This path doesn't exist
            current[pathAsArray[i]] = {};
            this.updateSortedKeys(currentParentPath.length > 1 ? currentParentPath.join('/') : '/', pathAsArray[i]);
        }
        current = current[pathAsArray[i]];
        currentParentPath.push(pathAsArray[i] === '/' ? '' : pathAsArray[i]);
    }
    //Create the last entry in the map 
    const fullPath = currentParentPath.length > 1 ? currentParentPath.join('/') : '/';
    if (!this.sortedKeysMap.has(fullPath)) this.updateSortedKeys(fullPath, null);

};

FileSystem.prototype.updateSortedKeys = function (path, newKey = null) {
    //debugger;

    let existingKeys = [];
    if (this.sortedKeysMap.has(path)) {
        existingKeys = this.sortedKeysMap.get(path);
    }
    if (newKey !== null) {
        existingKeys.push(newKey);
        existingKeys.sort(); //Lexographically order;
    }
    this.sortedKeysMap.set(path, existingKeys)
}

/** 
 * @param {string} filePath 
 * @param {string} content
 * @return {void}
 */
FileSystem.prototype.addContentToFile = function (filePath, content) {
   // debugger;

    if (this.fileContents.has(filePath)) {
        let newContent = this.fileContents.get(filePath) + content;
        this.fileContents.set(filePath, newContent);
    } else {
        let pathAsArray = filePath.split('/');
        let dirPathAsArray = filePath.split('/');
        dirPathAsArray.pop();
        let dirPath = dirPathAsArray.join('/');
        if (dirPath === "") {
            dirPath = '/';
        }
        this.mkdir(dirPath);
        let current = this.fileMap;
        let currentParentPath = [];

        for (let i = 0; i < pathAsArray.length; i++) {
            if (pathAsArray[i] === '') pathAsArray[i] = '/';
            if (!(pathAsArray[i] in current)) {
                current[pathAsArray[i]] = {};

            }
            current = current[pathAsArray[i]];
            currentParentPath.push(pathAsArray[i] === '/' ? '' : pathAsArray[i]);
        }
        const filename = pathAsArray.pop();
        this.updateSortedKeys(dirPath, filename);
        this.fileContents.set(filePath, content);
    }
};

/** 
 * @param {string} filePath
 * @return {string}
 */
FileSystem.prototype.readContentFromFile = function (filePath) {
    //debugger;

    return this.fileContents.get(filePath);

};

/** 
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */

fileSystem = new FileSystem();
fileSystem.ls("/")
fileSystem.ls("/")
fileSystem.ls("/")
fileSystem.ls("/")
fileSystem.ls("/")
fileSystem.addContentToFile("/bne", "kvo")
fileSystem.readContentFromFile("/bne")
fileSystem.readContentFromFile("/bne")
fileSystem.ls("/")



