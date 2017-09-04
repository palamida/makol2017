// Include gulp
var gulp = require('gulp');
//  // Define base folders
// var src = 'src/';
// var dest = 'js/';
// Include plugins
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

// // svgSprite Paths configuration
var basePaths = {
    src: 'dev/',
    dest: '../build/',
};
var paths = {
    images: {
        // src: basePaths.src + 'images/sprites/',
        // dest: basePaths.dest + 'sprites2/'
    },
    sprite: {
        src: basePaths.src + 'ikone/*.svg',
        // svg: 'sprite.svg',
        // css: 'sass/src/_sprite.scss'
    },
    templates: {
        // src: 'sass/tpl/'
    }
};




// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//       .pipe(plugins.concat('main.js'))
//         .pipe(plugins.rename({suffix: '.min'}))
//         .pipe(plugins.uglify())
//         .pipe(gulp.dest(dest + 'js'));
// });

// gulp.task('js', function() {
// 	var jsFiles = ['dev/js/*'];
//
// 	return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
// 		.pipe(plugins.filter('*.js'))
// 		.pipe(plugins.concat('script-marko.js'))
// 		// .pipe(plugins.uglify())
// 		.pipe(gulp.dest('js'));
//
// });

gulp.task('js', function() {
    // return gulp.src(plugins.mainBowerFiles().concat('dev/js/**/*.js'))   // s vendor skriptama
    return gulp.src(plugins.mainBowerFiles().concat('dev/js/*.js'))
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('script.js'))
        // .pipe(plugins.uglify())
        // gdje snima finalni js?
        .pipe(gulp.dest(basePaths.dest + '/js'));
});


// Compile CSS from Sass files
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        // .pipe(plugins.rename({suffix: '.min'}))
        // .pipe(plugins.rubySass({style: 'compressed'}))
        // .pipe(gulp.dest(dest + 'css'));
        .pipe(plugins.sourcemaps.write({ includeContent: false }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('css', function() {
    return gulp.src(['bower_components/normalize-css/normalize.css', 'dev/css/*.css'])
        .pipe(plugins.sourcemaps.write({ includeContent: false }))
        .pipe(plugins.sourcemaps.init({ loadMaps: true }))
        .pipe(plugins.concat('style.css'))
        // .pipe(plugins.filter('*.css'))
        // .pipe(plugins.order([
        // 	'normalize.css',
        // 	'*'
        // ]))
        // .pipe(plugins.concat('main.css'))
        // // .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(basePaths.dest + '/css'));
});




// Basic svgSprite configuration example

// {
//     dest            : <String>,             // Main output directory
//     log             : <String|Logger>,      // Logging verbosity or custom logger
//     shape           : <Object>,             // SVG shape configuration
//     svg             : <Object>,             // Common SVG options
//     variables       : <Object>,             // Custom templating variables
//     mode            : <Object>              // Output mode configurations
// }


config = {
    variables: {
        mapname: "icons"
    },
    shape: {
        spacing: {
            padding: 5
        }
    },
    mode: {
        css: { // Activate the «css» mode
            dest: "./",
            sprite: "../" + basePaths.dest + '/images/sprite', // Sprite path and name
            bust: false,
            render: {
                // scss     : true  // Activate CSS output (with default options)
                scss: {
                    dest: "_sprite.scss",
                    template: "dev/tpl/sprite-template.scss"
                }
            }
        }
    }
};

gulp.task('svgSprite', function() {
    gulp.src(paths.sprite.src)
        .pipe(plugins.svgSprite(config))
        .pipe(gulp.dest('./sass'));
});
//
// gulp.task('svgSprite', function () {
// 	return gulp.src(paths.sprite.src)
// 		.pipe(plugins.svgSprite({
// 			shape: {
// 				spacing: {
// 					padding: 5
// 				}
// 			},
// 			mode: {
// 				css: {
// 					dest: "./",
// 					layout: "diagonal",
// 					sprite: paths.sprite.svg,
// 					bust: false,
// 					render: {
// 						scss: {
// 							dest: "scss/_sprite.scss",
// 							template: "scss/tpl/sprite-template.scss"
// 						}
// 					}
// 				}
// 			},
// 			variables: {
// 				mapname: "icons"
// 			}
// 		}))
// 		.pipe(gulp.dest('sprites2'));
// });
//
// gulp.task('pngSprite', ['svgSprite'], function() {
// 	return gulp.src(basePaths.dest + paths.sprite.svg)
// 		.pipe(plugins.svg2png())
// 		.pipe(plugins.size({
// 			showFiles: true
// 		}))
// 		.pipe(gulp.dest(paths.images.dest));
// });
//
// gulp.task('sprite', ['pngSprite']);
//


//
gulp.task('default', function() {
    gulp.watch(["dev/ikone/*"], ['svgSprite'], ['sass'])
    gulp.watch(["sass/**/*.scss"], ['sass'])
    gulp.watch(["dev/css/*.css"], ['css'])
    gulp.watch(["dev/js/*.*"], ['js'])
});