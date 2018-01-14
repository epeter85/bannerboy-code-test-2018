var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    count = require('gulp-count'),
    sass = require('gulp-sass'),
    pathExists = require('path-exists'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    newer = require('gulp-newer'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    tingpng = require('gulp-tinypng'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    base64 = require('gulp-base64'),
    spritesmith = require('gulp.spritesmith'),
    size = require('gulp-size'),
    zip = require('gulp-zip');

var scriptsPath = 'src/creatives';
var creativesArray = [];
var sizesArray = [];

var currentCreative
var sourceDirectory
var outputDirectory
var productionDirectory

currentCreative = process.env.CURRENT_CREATIVE || 'v1';
//currentCreative = process.env.CURRENT_CREATIVE || 'global';

currentSize = process.env.CURRENT_SIZE || '300x250';
//currentSize = process.env.CURRENT_SIZE || '728x90';
//currentSize = process.env.CURRENT_SIZE || '300x600';

sourceDirectory = 'src/creatives/' + currentCreative + '/' + currentSize;
outputDirectory = 'dev/' + currentCreative + '/' + currentSize + '/';
productionFolder = currentCreative + '_' + currentSize;
productionDirectory = 'prod/' + productionFolder;

console.log('currentCreative = ' + currentCreative );
console.log('sourceDirectory = ' + sourceDirectory );
console.log('outputDirectory = ' + outputDirectory );
console.log('productionDirectory = ' + productionDirectory );

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('connect', function() {

    if (currentCreative != 'global') {
      connect.server({
        root: outputDirectory,
        livereload: true
      });
    }
});

//for global only
gulp.task('getCreatives', function() {

    if (currentCreative === 'global') {

        //get # of creatives & sizes
        var creatives = getFolders(scriptsPath);

        for (var i = 0; i < creatives.length; i++) {

            creativesArray.push(creatives[i]);
        }

        var getSizes = getFolders(scriptsPath + '/' + creativesArray[0]);

        for (var s = 0; s < getSizes.length; s++) {
            sizesArray.push(getSizes[s]);
        }
    }
});

gulp.task('images', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'src/creatives/' + creativesArray[i] + '/' + sizesArray[s];
                var ignoreSprites = '!' + currentPath + '/assets/*-assets/sprite';
                var base64Files = currentPath + '/assets/*-assets/base64';

                //copy photoshop generated assets over to build
                gulp.src([currentPath + '/assets/*-assets/*', ignoreSprites])
                    .pipe(rename({dirname: ''}))
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]))

                //copy templates over to build
                gulp.src(currentPath + '/assets/*-assets/template/*')
                    .pipe(rename({dirname: ''}))
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s] + '/template'))

               //copy images over to build
                gulp.src(currentPath + '/images/*')
                    .pipe(rename({dirname: ''}))
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]))
            }
        }
    }else{

        var ignoreSprites = '!' + sourceDirectory + '/assets/*-assets/sprite';
        //var base64Files = sourceDirectory + '/assets/*-assets/base64';

        //copy photoshop generated assets over to build
        gulp.src([sourceDirectory + '/assets/*-assets/*', ignoreSprites])
            .pipe(rename({dirname: ''}))
            .pipe( newer(outputDirectory))
            .pipe(gulp.dest(outputDirectory))
           // .pipe(connect.reload());
           // .pipe( notify( { message: 'Images task complete.' } ) );


        //copy templates over to build
        gulp.src(sourceDirectory + '/assets/*-assets/template/*')
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(outputDirectory + '/template'))

        //copy images over to build
        gulp.src(sourceDirectory + '/images/*')
            .pipe(rename({dirname: ''}))
            .pipe(newer(outputDirectory))
            .pipe(gulp.dest(outputDirectory))

    }
});

gulp.task('sprite', function () {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

              var currentPath = 'src/creatives/' + creativesArray[i] + '/' + sizesArray[s];

              // Generate our spritesheet
              var spriteData = gulp.src(currentPath + '/assets/*-assets/sprite/*.png').pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                cssFormat: 'css'
              }));

              var imgStream = spriteData.img
                .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]));


              var cssStream = spriteData.css
                .pipe(gulp.dest(currentPath + '/sass/'));

            }
        }
    }else{

        var spriteData = gulp.src(sourceDirectory + '/assets/*-assets/sprite/*.png').pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'css'
          }));

          var imgStream = spriteData.img
            .pipe(gulp.dest(outputDirectory));


          var cssStream = spriteData.css
            .pipe(gulp.dest(sourceDirectory + '/sass/'));
    }
});


gulp.task('html', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'src/creatives/' + creativesArray[i] + '/' + sizesArray[s];

                gulp.src(currentPath + '/pug/*.pug')
                    .pipe(pug())
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]))
            }
        }
    }else{

        gulp.src(sourceDirectory + '/pug/*.pug')
            .pipe(pug({
                pretty:true
            }))
            .pipe(gulp.dest(outputDirectory))
            .pipe(connect.reload());

    }
});

gulp.task('js', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'src/creatives/' + creativesArray[i] + '/' + sizesArray[s];

                var jsSources;

                jsSources = [
                        'src/global/scripts/global_functions.js',
                        currentPath + '/js/main.js'];

                gulp.src( jsSources )
                    .pipe(concat('main.js'))
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]));
            }
        }

    }else{

        var jsSources;

        jsSources = [
                'src/global/scripts/global_functions.js',
                sourceDirectory + '/js/main.js'];


        gulp.src( jsSources )
            .pipe(concat('main.js'))
            .pipe(gulp.dest(outputDirectory))
            .pipe(connect.reload());

    }
});

gulp.task('sass', function() {

    if (currentCreative === 'global') {

            for (var i = 0; i < creativesArray.length; i++) {
                for (var s = 0; s < sizesArray.length; s++) {

                    var currentPath = 'src/creatives/' + creativesArray[i] + '/' + sizesArray[s];

                    gulp.src(currentPath + '/sass/style.scss')
                    .pipe(sass({
                      sass: currentPath + '/sass'
                    })
                    .on('error', gutil.log))
                    //.pipe(connect.reload())
                    .pipe(gulp.dest('dev' + '/' + creativesArray[i] + '/' + sizesArray[s]));

            }
        }

    }else{
        return gulp.src(sourceDirectory + '/sass/style.scss')
            .pipe(sass({
                sass: sourceDirectory + '/sass'
            }).on('error', gutil.log))
            .pipe(connect.reload())
            .pipe(gulp.dest(outputDirectory));
    }

});

gulp.task('minify', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'dev' + '/' + creativesArray[i] + '/' + sizesArray[s];

                //minfy html
                var opts = {
                    conditionals: true,
                    spare:true
                };
                gulp.src( currentPath + '/index.html')
                    //.pipe(minifyHTML(opts))
                    .pipe(gulp.dest('prod' + '/' + creativesArray[i] + '_' + sizesArray[s] ));

                //copy css over
                gulp.src(currentPath + '/*.css')
                    .pipe(cleanCSS({compatibility: 'ie8'}))
                    .pipe(gulp.dest('prod' + '/' + creativesArray[i] + '_' + sizesArray[s] ));

                //minify js
                gulp.src( currentPath + '/main.js')
                    .pipe(uglify())
                    .pipe(gulp.dest('prod' + '/' + creativesArray[i] + '_' + sizesArray[s] ));

            }
        }
    }else{
                //minfy html
                var opts = {
                    conditionals: true,
                    spare:true
                };
                gulp.src( outputDirectory + '/index.html')
                    .pipe(minifyHTML(opts))
                    .pipe(gulp.dest(productionDirectory ));

                //copy css over
                gulp.src(outputDirectory + '/*.css')
                    .pipe(cleanCSS({compatibility: 'ie8'}))
                    .pipe(gulp.dest(productionDirectory ));

                //minify js
                gulp.src( outputDirectory + '/main.js')
                    .pipe(uglify())
                    .pipe(gulp.dest(productionDirectory ));
    }
});


gulp.task('imagemin', function() {
    var imageminOpt = { verbose: true, optimizationLevel: 3, progressive: true };
    var imegeminJpgOpt = { progressive: true };
    var imageminPlugins = [imagemin.gifsicle(), imagemin.jpegtran(imegeminJpgOpt), imagemin.svgo()];
    var sizeOpt = { showFiles: true, pretty: true };



    if (currentCreative === 'global') {
        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {
                var currentPath = 'dev' + '/' + creativesArray[i] + '/' + sizesArray[s];
                //var ignoreTemplate = '!' + currentPath + '/template';
                gulp.src([currentPath + '/*', '!' + currentPath + '/template', '!' + outputDirectory + 'style.css', '!' + outputDirectory + 'index.html', , '!' + outputDirectory + 'main.js'])
                    .pipe(changed(outputDirectory))
                    .pipe(imagemin(imageminPlugins, imageminOpt))
                    .pipe(gulp.dest('prod' + '/' + creativesArray[i] + '_' + sizesArray[s]))
                    .pipe(size(sizeOpt));
            }
        }
    } else {
        gulp.src([outputDirectory + '/*', '!' + outputDirectory + '/template', '!' + outputDirectory + 'style.css', '!' + outputDirectory + 'index.html', '!' + outputDirectory + 'main.js', '!' + outputDirectory + '#.png'])
            .pipe(changed(outputDirectory + '/*'))
            .pipe(imagemin(imageminPlugins, imageminOpt))
            .pipe(gulp.dest(productionDirectory))
            .pipe(size(sizeOpt));
    }
});

gulp.task('tiny-png', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'dev' + '/' + creativesArray[i] + '/' + sizesArray[s];

                gulp.src(currentPath + '/sprite.png')
                    .pipe(tingpng('cbrxIFfmjUJfEDp4UoM0I1Q0rfDGotzb'))
                    .pipe(gulp.dest('prod' + '/' + creativesArray[i] + '_' + sizesArray[s]))
                    .pipe( notify( { message: 'compression complete: I am leaner and meaner' } ) );

            }
        }

    }else{

        gulp.src(outputDirectory + '/sprite.png')
            .pipe(tingpng('cbrxIFfmjUJfEDp4UoM0I1Q0rfDGotzb'))
            .pipe(gulp.dest( productionDirectory ))
            .pipe( notify( { message: 'compression complete: I am leaner and meaner'} ) );
    }
});

gulp.task('zip', function() {

     if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'prod' + '/' + creativesArray[i] + '_' + sizesArray[s] + '/*';
                var fileName = creativesArray[i] + '_' + sizesArray[s] + '.zip';

                gulp.src(currentPath)
                    .pipe(zip(fileName))
                    .pipe(gulp.dest('prod'))
                    .pipe( notify( { message: 'zipped and ready to ship' } ) );

            }
        }
     }else{

        var currentPath = 'prod/' + productionDirectory + '/*';
        var fileName = productionDirectory + '.zip';

        gulp.src([currentPath])
            .pipe(zip(fileName))
            .pipe(gulp.dest('prod'))
            .pipe( notify( { message: 'zipped and ready to ship' } ) );
     }

});


gulp.task('testZipSize', function() {

    if (currentCreative === 'global') {

        for (var i = 0; i < creativesArray.length; i++) {
            for (var s = 0; s < sizesArray.length; s++) {

                var currentPath = 'prod' + '/' + creativesArray[i] + '_' + sizesArray[s] + '/*';
                var fileName = creativesArray[i] + '_' + sizesArray[s] + '.zip';
                var ignoreFile = '!prod' + '/' + creativesArray[i] + '_' + sizesArray[s] + '/*backup.jpg';

                gulp.src([currentPath, ignoreFile])
                    .pipe(zip(fileName))
                    .pipe(gulp.dest('prod'));

            }

            if (i === creativesArray.length) {
                console.log('completed');
            }
        }
    }else{

        var currentPath = 'prod/' + productionDirectory + '/*';
        var fileName = productionDirectory + '.zip';
        var ignoreFile = '!prod/' + productionDirectory + '/*backup.jpg';

        gulp.src([currentPath, ignoreFile])
            .pipe(zip(fileName))
            .pipe(gulp.dest('prod'))
            .pipe( notify( { message: 'fallback removed: check that k-size' } ) );
    }

});


gulp.task('watch', function() {

    if (currentCreative != 'global') {

        //global stuffs
        gulp.watch('src/global/scripts/*', ['js']);

        //watch css
        pathExists(sourceDirectory + '/sass/style.scss').then(exists => {
            gulp.watch(sourceDirectory + '/sass/_main.scss', ['sass']);
            gulp.watch(sourceDirectory + '/sass/_sprite.scss', ['sass']);
        });

        //watch pug
        gulp.watch('src/global/pug/base.pug', ['html']);
        gulp.watch(sourceDirectory + '/pug/index.pug', ['html']);

        //watch js
        gulp.watch(sourceDirectory + '/js/*.js', ['js']);

        //watch for sprite sheet changes
        gulp.watch(sourceDirectory + '/assets/*-assets/sprite/*', ['sprite']);
    }
});


//DEVELOPMENT
gulp.task('default', ['getCreatives', 'sprite', 'html', 'images', 'js', 'sass', 'connect', 'watch']);


//PRODUCTION
gulp.task('prod', function(callback) {runSequence('getCreatives', 'imagemin', 'tiny-png', 'minify', callback);});
gulp.task('testsize', ['getCreatives', 'testZipSize']);
gulp.task('traffic', ['getCreatives', 'zip']);
