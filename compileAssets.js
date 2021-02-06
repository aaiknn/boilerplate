const sass = require('dart-sass');
const fs = require('fs');
const { srcPath, options } = require('./buildConfig.js');

const sassOptions = {
    inputFile: `${srcPath}/${options.baseSassFileName}.scss`,
    outputFile: `${srcPath}/${options.baseCssFileName}.css`,
    sourceMapFile: `${srcPath}/${options.baseCssFileName}.map`
}

let result;

if ( process.env.ENV === 'dist' ) {
    result = sass.renderSync({
        file: sassOptions.inputFile,
        outputStyle: "compressed"
    })
} else {
    result = sass.renderSync({
        file: sassOptions.inputFile
    })
}

const css = result.css.toString();

fs.writeFile(sassOptions.outputFile, css, function(error) {
    if(error) {
        return console.log(error);
    }
    console.log(`CSS file was saved to ${sassOptions.outputFile}.`);
});