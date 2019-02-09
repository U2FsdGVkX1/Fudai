let mix = require('laravel-mix');

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

mix.js('resources/assets/js/admin/app.js', 'public/js/admin')
   .js('resources/assets/js/app.js', 'public/js')
   //.sass('resources/assets/sass/app.scss', 'public/css')
   .extract(['vue', 'vue-router', 'vuex', 'element-ui', 'vue-area-linkage', 'js-cookie', 'file-saver']);
mix.webpackConfig({
    output: {
        publicPath: '/',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js'
        }
    }
})