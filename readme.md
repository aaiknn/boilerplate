# welcome to the boilerplate
The scope of this package is to provide a very basic outline for front-end development.

## Start coding right away
- Get node.js if you don't have it yet.

cd into the root directory and run these commands:
- `npm install`,
- `npm run fresh-start`.

You can start doing your magic in the freshly created `src` folder.
`fresh-start` will also spawn a node server that listens to `http://localhost:3000`.

***CAREFUL!*** **`fresh-start` will wipe everything it finds in the `src` folder, so don't run it after you've started working unless you really want to let go of all of your progress.**

### Things that you may want to do now:
- `git init`.
- `npm run watch` will watch the `src` directory for changes and compile your sass assets.
- `npm run server` will start a node server where you can check out your work over `http://localhost:3000`.

If you need some extra folders or files to build into the boilerplate, or generate default files with other options (like folder and file names, use of ES6 or strict mode), it usually suffices to update `buildConfig.js` to suit your needs.

## Skip coding and see what happens
- Get node.js if you don't have it yet.

cd into the root directory and run these commands:
- `npm install`,
- `npm run build`.

Then you can look at the bare minimum boilerplate output when navigating to `YOUR_DIRECTORY/public/index.html`, though while the `/public` folder doesn't live on a server, CORS policy will block js execution.