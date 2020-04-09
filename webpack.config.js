const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => ({
    mode: env.prod ? "production" : "development",
    devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",
    entry: path.resolve(__dirname, "./src/main.ts"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        // See https://github.com/webpack/webpack/issues/6522
        globalObject: "typeof self !== 'undefined' ? self : this",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            // See https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
            vue: path.resolve("./node_modules/vue"),
            "@vue": path.resolve("./node_modules/@vue"),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        templateCompilers: {
                            vugel: { compiler: require("vugel/lib"), compilerOptions: {} },
                        },
                    },
                },
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
                    options: { limit: 8192 },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: !env.prod },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    devServer: {
        inline: true,
        hot: false,
        stats: "minimal",
        contentBase: __dirname,
        overlay: true,
    },
});
