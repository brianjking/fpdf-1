var 
		gulp 		= require('gulp')
	,	include 	= require('gulp-include')
	,	watch 		= require('gulp-watch')
	,	jshint 		= require('gulp-jshint')
	,	stylish 	= require('jshint-stylish')
	,	concat 		= require('gulp-concat')
	,	uglify 		= require('gulp-uglify')
	,	rename 		= require('gulp-rename')

;




gulp.task('dev', function(){

	gulp.src('./src/**/*.js')
		.pipe( watch(function(){

			gulp.src(['./src/devonly.js', './src/fpdf.js'])
				.pipe( concat('fpdf.js') )
				.pipe( include() )
			.pipe( gulp.dest('./dist') );

		}) )
		.pipe( jshint() )
		.pipe( jshint.reporter(stylish) );
		

});


gulp.task('build', function(){

	gulp.src('./src/fpdf.js')
		.pipe( include() )
		.pipe( jshint() )
		.pipe( jshint.reporter(stylish) )
		.pipe( rename('fpdf.min.js') )
		.pipe( uglify({
			outSourceMap: true,
			preserveComments: 'all'
		}) )
	.pipe( gulp.dest('./dist') );

});