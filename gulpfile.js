// import * as fs from 'fs'
// import * as gulp from 'gulp'
// import compilets from './ext/Compile'

// let DEBUG = false;
// let environment = (process.env.ENVIRONMENT!==void 0)?process.env.ENVIRONMENT:"local";
// var versionNumber = "1.5.2.2"+((DEBUG)?Math.random().toString():'');

// console.log(`Building for '${environment}' environment...`);

// function plugin(name: string) {
//     let cached: any;
//     return function() {
//         if (cached) return cached;
//         cached = require(name);
//         return cached;
//     }
// }

// const plugins = {
//     concat: plugin('gulp-concat'),
//     rename: plugin('gulp-rename'),
//     replace: plugin('gulp-replace'),
//     merge: plugin('merge2'),
//     clean: plugin('gulp-clean'),
//     insert: plugin('gulp-insert'),
//     sass: plugin('gulp-sass'),
//     uglify: plugin('gulp-uglify'),
//     tar: plugin('gulp-tar'),
//     gzip: plugin('gulp-gzip'),
//     typedoc: plugin('gulp-typedoc'),
// };

// let sourcesPath = './sources';
// let destDir = './'+'build'+'/online';
// let tmpDir = './tmp';

// function buildViewResources(){
//     let projectPath = `${sourcesPath}/View`;
//         let src = gulp.src([
//         projectPath + '/*', 
//         '!'+projectPath + 'tsconfig.json',]).pipe(gulp.dest(destDir))
        
//         let minify = !DEBUG;

//         let providedCss = [sourcesPath + '/provided/css/*'];
//         let css = gulp.src([sourcesPath + '/css/*','!'+sourcesPath + '/css/Init.css'])
//         .pipe(plugins.sass()({ outputStyle: minify ? 'compressed' : void 0 }).on('error', plugins.sass().logError))
//         .pipe(plugins.concat()('styles.css'))
//         .pipe(gulp.dest(destDir + '/css'));

//         let cssMin = gulp.src(providedCss)
//         .pipe(plugins.concat()('provided.css'))
//         .pipe(plugins.sass()({ outputStyle: minify ? 'compressed' : void 0 }).on('error', plugins.sass().logError))
//         .pipe(gulp.dest(destDir + '/css'));

//         let providedJs = [sourcesPath + '/provided/js/*'];
        
//         let jsMin = gulp.src(providedJs)
//         .pipe(plugins.concat()("provided.js"))
//         .pipe(plugins.uglify()())
//         .pipe(gulp.dest(destDir + '/js'));

//         let js = gulp.src([sourcesPath + '/js/*'])
//         .pipe(plugins.concat()("scripts.js"))
//         .pipe(plugins.uglify()())
//         .pipe(gulp.dest(destDir + '/js'));

//         let fonts = gulp.src([sourcesPath +'/fonts/*'])
//         .pipe(gulp.dest(destDir + '/fonts'));

//         let images = gulp.src([sourcesPath + '/images/*'])
//         .pipe(gulp.dest(destDir + '/images'));

//         let imagesFront = gulp.src([sourcesPath + '/images/front/*'])
//         .pipe(gulp.dest(destDir + '/images/front'));

//         let templates = gulp.src([sourcesPath + '/templates/*'])
//         .pipe(gulp.dest(destDir + '/templates'));

//         let bootstrapStandalone = gulp.src([sourcesPath + '/css/bootstrap.min.css'])
//         .pipe(gulp.dest(destDir + '/css'));

//         return plugins.merge()([src, cssMin, css, jsMin, js, fonts, images, imagesFront, templates, bootstrapStandalone]);
// }

// function buildInitResources(){
//     let projectPath = `${sourcesPath}/Init`;
//         let src = gulp.src([
//         projectPath + '/*', 
//         '!'+projectPath + 'tsconfig.json']).pipe(gulp.dest(destDir))

//         let providedJs = [
//             /*sourcesPath + '/provided/src/LiteMol-plugin.js'*/
//             sourcesPath + '/provided/src/react.js',
//             sourcesPath + '/provided/src/react-with-addons.js',
//             sourcesPath + '/provided/src/react-dom.js',
//             sourcesPath + '/provided/src/react-dom-server.js'
//         ];

//         let minify = !DEBUG;
        
//         let css = gulp.src([
//             sourcesPath + '/css/Init.css',
//             sourcesPath + '/css/AlertMessages.css'
//         ])
//         .pipe(plugins.sass()({ outputStyle: minify ? 'compressed' : void 0 }).on('error', plugins.sass().logError))

//         .pipe(plugins.concat()('init-styles.css'))
//         .pipe(gulp.dest(destDir + '/css'));

//         return plugins.merge()([src]);
// }

// function copyHtmlFiles(){
//     let projectPath = `${sourcesPath}/html`;
//         let files = gulp.src([projectPath +'/*'])
//         .pipe(gulp.dest(destDir));

//         return plugins.merge()([files]);
// }

// function WebVersions() {
//     return gulp.src(['./build/online/**/*.html'])
//         .pipe(plugins.replace()(/<!UI-VERSION!>/g, function (s) {
//             return versionNumber;
//         })) 
//         .pipe(gulp.dest('./build/online'));
// }

// gulp.task('Clean', ['Clean-Tmp'], function () {
//     console.log("Cleaning build folder...");
//     return gulp
//         .src([
//             './build/*'
//         ], { read: false })
//         .pipe(plugins.clean()());
// });

// gulp.task('Clean-Tmp', [], function () {
//         console.log("Cleaning tmp folder...");
//         return gulp
//             .src([
//                 './tmp'
//             ], { read: false })
//             .pipe(plugins.clean()());
// });

// gulp.task('Copy-Config', ['Clean'], function(){
//     let configFiles = gulp.src([`${sourcesPath}/config/${environment}.ts`])
//         .pipe(plugins.concat()("config.ts"))
//         .pipe(gulp.dest(tmpDir));

//         return plugins.merge()([configFiles]);
// });
// gulp.task('MoleOnlineWebUI-View-Core', ['Copy-Config'], function() { 
//     return compilets({ project: `${sourcesPath}/src/View/tsconfig.json`, out: `${destDir}/MoleOnlineWebUI-Core-View.js` });
// });
// gulp.task('MoleOnlineWebUI-Init-Core', ['Copy-Config'], function() { 
//     return compilets({ project: `${sourcesPath}/src/Init/tsconfig.json`, out: `${destDir}/MoleOnlineWebUI-Core-Init.js` });
// });
// gulp.task('MoleOnlineWebUI-View-Resources', ['MoleOnlineWebUI-View-Core'], buildViewResources);
// gulp.task('MoleOnlineWebUI-Init-Resources', ['MoleOnlineWebUI-Init-Core'], buildInitResources);
// gulp.task('MoleOnlineWebUI-Copy-Html-Files', ['Clean'], copyHtmlFiles);

// gulp.task('MoleOnlineWebUI-Set-Version', ['MoleOnlineWebUI-Copy-Html-Files'], WebVersions);

// gulp.task('default', [
//     'Clean',
//     'MoleOnlineWebUI-View-Resources',
//     'MoleOnlineWebUI-Init-Resources',
//     //'MoleOnlineWebUI-Copy-Html-Files'
//     'MoleOnlineWebUI-Set-Version'
// ], function () {
//     console.log('Done');
// });

const gulp = require('gulp');
const concat = require('gulp-concat');
const beautify = require('gulp-beautify');
const sass = require('gulp-sass')(require('sass'));

const paths = {
    scss: {
        src: './sources/css/*.scss', // Your SCSS source files
        dest: './sources/css'            // Output folder for compiled CSS
    }
};

function compileSass() {
    return gulp.src(paths.scss.src)   // Source of SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(gulp.dest(paths.scss.dest));       // Output compiled CSS to destination
}

function watchSass() {
    gulp.watch(paths.scss.src, compileSass);
}

gulp.task('default', gulp.series(compileSass, watchSass));

exports.compileSass = compileSass;
exports.watchSass = watchSass;

gulp.task("merge-js", function() {
    return gulp.src([
        "./sources/js/jquery-3.7.1.js",
        "./sources/js/jquery-ui.js",
        // "./sources/provided/js/02-jquery-ui.js",
        "./sources/js/jspdf.min.js",
        // "./sources/js/jsloader.js",
        "./sources/js/canvas2svg.js",
        "./sources/js/datagrid.js",
        "./sources/js/html2canvas.js",
        "./sources/js/Palette.js",
        "./sources/js/svg2pdf.js",
        "./sources/js/tabsConfig.js",
        "./sources/js/utf8.js",
        // "./sources/provided/js/00-fetch.min.js",
        // "./sources/provided/js/03-bootstrap.min.js",
        "./sources/js/bootstrap.min.js",
        // "./sources/provided/js/04-LiteMol-core.js",
        // "./sources/provided/js/05-LiteMol-plugin.js",
        // "./sources/provided/js/06-pako.min.js",
    ])
    .pipe(concat("scripts.js"))
    .pipe(beautify({             // Beautify the output
        indent_size: 2,          // Set indentation size
        space_in_empty_paren: true,  // Add space inside empty parentheses
        preserve_newlines: true,     // Preserve existing line breaks
    }))
    .pipe(gulp.dest("./sources/js"))
})

gulp.task('merge-css', function() {
    return gulp.src([
        "./sources/css/bootstrap.min_5.3.3.css",
        "./sources/css/AglomeredParameters.css",
        "./sources/css/AlertMessages.css",
        "./sources/css/annotate.css",
        // "./sources/css/bootstrap.min.css",
        "./sources/css/ChannelParameters.css",
        "./sources/css/CofactorPickBox.css",
        "./sources/css/Components.css",
        "./sources/css/Controls.css",
        "./sources/css/CSAPickBox.css",
        "./sources/css/datagrid.css",
        "./sources/css/DownloadReport.css",
        "./sources/css/FromLiteMol.css",
        "./sources/css/Help.css",
        // "./sources/css/Init.css",
        "./sources/css/jquery-ui.css",
        "./sources/css/LayerVizualizerStyles.css",
        "./sources/css/lining-residues.css",
        "./sources/css/LoadingScreen.css",
        "./sources/css/pdbid.css",
        "./sources/css/PDFReportGenerator.css",
        "./sources/css/QuickHelp.css",
        "./sources/css/SequenceViewer.css",
        "./sources/css/style.css",
        "./sources/css/tabs.css",
        "./sources/css/tooltips.css",
        "./sources/css/MoleSequenceViewer.css",
        "./sources/css/MolstarSlider.css",
    ])
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./sources/css"))
})

gulp.task('merge-css-init', function() {
    return gulp.src([
        // "./sources/css/frontend/bootstrap.min.css",
        "./sources/css/init/bootstrap.min.css",
        // "./sources/css/frontend/cssloader.css",
        // "./sources/css/frontend/init-styles.css",
        // "./sources/css/frontend/LiteMol-plugin.css",
        // "./sources/css/frontend/styles-init.css",
        // "./sources/css/frontend/provided.css",
        "./sources/css/frontend/styles.css",
        // "./sources/css/frontend/cssloader.css~",
        // "./sources/css/frontend/print.front.css",
    ])
    .pipe(concat("init-styles.css"))
    .pipe(gulp.dest("./sources/css"))
})

gulp.task('merge-js-init', function() {
    return gulp.src([
        "./sources/js/jquery-3.7.1.js",
        "./sources/js/jquery-ui.js",
        "./sources/js/bootstrap.min.js",
        "./sources/js/canvas2svg.js",
        "./sources/js/datagrid.js",
        "./sources/js/html2canvas.js",
        "./sources/js/Palette.js",
        "./sources/js/svg2pdf.js",
        "./sources/js/tabsConfig.js",
        "./sources/js/utf8.js",
        "./sources/js/jspdf.min.js",
    ])
    .pipe(concat("init-scripts.js"))
    .pipe(beautify({
        indent_size: 2,
        space_in_empty_paren: true,
        preserve_newlines: true,
    }))
    .pipe(gulp.dest("./sources/js"))
})
