const fs = require('fs');
const { publicPath, srcPath, dirPaths, options } = require('./buildConfig.js');

let baseHtmlFileCode = `<!DOCTYPE html>`;
baseHtmlFileCode += `\n<html lang="${options.htmlLang}">`;
baseHtmlFileCode += `\n\t<head>`;
baseHtmlFileCode += `\n\t\t<meta charset="${options.htmlCharset}">`;
baseHtmlFileCode += `\n\t\t<title>${options.htmlTitle}</title>`;
baseHtmlFileCode += `\n\t\t<link rel="stylesheet" href="./${options.baseCssFileName}.css">`;
baseHtmlFileCode += `\n\t</head>`;
baseHtmlFileCode += `\n\t<body>`;
baseHtmlFileCode += `\n\t\t<h1 style="position: fixed; top: 50%; left: 50%; transform:translate(-50%, -50%); margin-top: -1rem; font-size: 4rem; font-family: sans-serif; color: #333;">Welcome to the boilerplate!</h1>`;
baseHtmlFileCode += `\n\t\t<script${(options.useEs6Imports) ? ' type="module"' : ''} src="./${options.baseJsFileName}.js"></script>`;
baseHtmlFileCode += `\n\t</body>`;
baseHtmlFileCode += `\n</html>`;

let baseSassPartialCode = `* {`;
baseSassPartialCode += `\n\tbox-sizing: border-box;`;
baseSassPartialCode += `\n}`;
baseSassPartialCode += `\n\nhtml {`;
baseSassPartialCode += `\n\tfont-size: 62.5%;`;
baseSassPartialCode += `\n}`;

let baseSassFileCode = `@import '../node_modules/include-media/dist/include-media';`;
let sassSrcFolders = dirPaths.srcDirs.sass;
sassSrcFolders.forEach(sassSrcDir => {
    let dirName = sassSrcDir.dir;
    let dirFiles = sassSrcDir.files;
    let sassSubFolders = dirPaths.srcSubDirs.sass;
    sassSubFolders.forEach(sassSubDir => {
        let subDirName =  sassSubDir.dir;
        let subDirFiles = sassSubDir.files;
        subDirFiles.forEach(sassFile => {
            sassFile = sassFile.substring(1, sassFile.length - 5);
            baseSassFileCode += `\n@import './${srcPath + dirName + subDirName}/${sassFile}';`;
        })
    });
    baseSassFileCode += '\n';
    dirFiles.forEach(sassFile => {
        sassFile = sassFile.substring(1, sassFile.length - 5);
        baseSassFileCode += `\n@import './${srcPath + dirName}/${sassFile}';`;
    })
});

let baseJsFileCode = `${(options.useStrictJs) ? "'use strict';\n\n" : ""}`;
baseJsFileCode += `(function(){`;
baseJsFileCode += `\n\n})();`;

let gitIgnoreCode = `node_modules`;
gitIgnoreCode += `\n/${publicPath}`;

const fileCode = {
    baseHtmlFileCode: baseHtmlFileCode,
    baseSassFileCode: baseSassFileCode,
    baseSassPartialCode: baseSassPartialCode,
    baseJsFileCode: baseJsFileCode
}


const buildClean = (path = srcPath) => {
    console.log(`Wiping root folder ${path}...`);
    fs.rmdir(path, { recursive: true }, (error) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log(`Directory ${path} doesn't exist. Continuing...`);
            } else {
                throw error;
            }
        }
        console.log(`Wiped root folder ${path}.`);
        createDirectory(path);
    });
}

const createDirectory = (path) => {
    fs.mkdir(path, (error) => {
        if (error) throw error;
        console.log(`Created root folder ${path}.`)
        for (let prop in dirPaths.srcRootFiles) {
            let fileData = () => {
                let key = `base` + prop.charAt(0).toUpperCase() + prop.slice(1) + `FileCode`;
                return fileCode[key];
            }
            fs.writeFile(path + '/' + dirPaths.srcRootFiles[prop], fileData(), (error) => {
                if (error) throw error;
                console.log(`Wrote ${dirPaths.srcRootFiles[prop]} to ${path}.`);
            });
        }
        createSubDirectories(path);
    });
}

const createSubDirectories = (path) => {
    for ( let _cat in dirPaths.srcDirs ) {
        for ( let srcDir of dirPaths.srcDirs[_cat] ) { 
            let subDirPath = path + srcDir.dir;
            fs.mkdir(subDirPath, (error) => {
                if (error) throw error;
                console.log(`Created ${subDirPath} folder.`);
    
                if ( _cat in dirPaths.srcSubDirs ) {
                    if ( dirPaths.srcSubDirs[_cat].length === 0 ) {
                        return;
                    }
                    for (let srcSubDir of dirPaths.srcSubDirs[_cat]) {
                        let subPath = subDirPath + srcSubDir.dir;
                        let fileNames = srcSubDir.files;
                        createPartialDirectory(subPath, fileNames);
                    }
                }

                if ( srcDir.files.length < 1) {
                    return;
                }
                writeFiles(subDirPath, srcDir.files)
            });
        }
    }
}

const writeFiles = (path, fileNames) => {
    for ( let fileName of fileNames ) {
        let fileData = ( fileName === '_base.scss' ) ? baseSassPartialCode : '';
        fs.writeFile(path + '/' + fileName, fileData, (error) => {
            if (error) throw error;
            console.log(`Created ${fileName} file in ${path}.`);
        });
    }
}

const createPartialDirectory = (path, fileNames) => {
    fs.mkdir(path, (error) => {
        if (error) throw error;
        console.log(`Created ${path} folder.`);
        writeFiles(path, fileNames);
        finishBuild();
    });
}

const finishBuild = () => {
    if ( options.createGitIgnore ) {
        fs.writeFile('.gitignore', gitIgnoreCode, (error) => {
            if (error) throw error;
            console.log(`Created .gitignore at root path.`);
        });
    }
}

(function(){
    buildClean(srcPath);
})();
