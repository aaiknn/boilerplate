const options = {
    baseHtmlFileName:       'index',
    htmlCharset:            'utf-8',
    htmlLang:               'en',
    htmlTitle:              '',
    baseCssFileName:        'main',
    baseSassFileName:       'main',
    baseSassPartialName:    'base',
    baseJsFileName:         'main',
    useEs6Imports:          true,
    useStrictJs:            true,
    createGitIgnore:        true
}

const publicPath = 'public';
const srcPath = 'src';

const dirPaths = {
    srcRootFiles:   {
                        html: [`${options.baseHtmlFileName}.html`],
                        js: [`${options.baseJsFileName}.js`],
                        sass: [`${options.baseSassFileName}.scss`]
                    },
    srcDirs:        {
                        js: [{
                            dir: '/js',
                            files: []
                        }],
                        sass: [{
                            dir: '/sass',
                            files: [
                                '_base.scss'
                            ]
                        }]
                    },
    srcSubDirs:     {
                        js: [],
                        sass: [{
                            dir: '/config',
                            files: [
                                '_colors.scss',
                                '_sizes.scss'
                            ]
                        }]
                    }
}

module.exports = { options, publicPath, srcPath, dirPaths };