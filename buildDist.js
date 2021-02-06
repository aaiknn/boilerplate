const fs = require('fs');
const { srcPath, publicPath } = require('./buildConfig');

const wipePublicDirectory = () => {
    console.log(`Cleaning ${publicPath} folder...`);
    fs.rmdir(publicPath, { recursive: true }, async (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`Directory ${publicPath} doesn't exist. Continuing...`);
            } else {
                throw err;
            }
        }
        console.log(`${publicPath} cleaned.`);
        createPublicDirectory(publicPath);
    });
}

const createPublicDirectory = (path = publicPath) => {
    fs.mkdir(path, (err) => {
        if (err) throw err;
        console.log(`Created ${path} directory.`);
        createSubDirectories(path);
    });
}

const createSubDirectories = (path) => {
    fs.mkdir(path + '/js', (err) => {
        if (err) throw err;
        console.log(`Created ${path}/js directory.`);
        copyFiles();
    });
}

const copyFiles = () => {
    fs.readdir(srcPath, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const allSources = /^(.(.*\.css$|.*\.html|.*\.js))*$/;
            if ( file.name.match(allSources) ) {
                fs.readFile(srcPath + '/' + file.name, 'utf-8', (err, data) => {
                    if (err) throw err;
                    fs.writeFile(publicPath + '/' + file.name, data, (err) => {
                        if (err) throw err;
                        console.log(`Copied ${file.name} from ${srcPath} into ${publicPath}.`);
                    });
                });
            }
        });
        fs.readdir(srcPath + '/js', {withFileTypes: true}, (err, files) => {
            if (err) throw err;
            files.forEach((file) => {
                const jsSources = /^(..*\.js)*$/;
                if ( file.name.match(jsSources) ) {
                    fs.readFile(srcPath + '/js/' + file.name, 'utf-8', (err, data) => {
                        if (err) throw err;
                        fs.writeFile(publicPath + '/js/' + file.name, data, (err) => {
                            if (err) throw err;
                            console.log(`Copied ${file.name} from ${srcPath}/js into ${publicPath}/js.`);
                        });
                    });
                }
            });
        });
    });
}

(async function(){
    wipePublicDirectory();
})();