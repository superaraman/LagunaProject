const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/pages.js', 'public/js/pages.js')
   .js('resources/js/admin/main.js', 'public/js/admin.js')
   .js('resources/js/admin/chart.js', 'public/js/chart.js')
   .sass('resources/sass/admin/sidebar.scss', 'public/css')
   .sass('resources/sass/pages.scss', 'public/css/pages.css')
   .sass('resources/sass/app.scss', 'public/css');
