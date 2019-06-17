const mix = require("laravel-mix");

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

mix.disableNotifications();

mix.react("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .babelConfig({
        presets: ["@babel/preset-env"],
        plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties"
        ]
    })
    .sourceMaps();

mix.webpackConfig({
    output: {
        filename: "[name].js",
        chunkFilename: "js/chunks/[name].js"
    }
});
