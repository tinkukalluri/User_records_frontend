const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

const extensions = [".js", ".jsx"];

console.log(path.resolve(__dirname, "../../backend/public"))

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../../backend/public"),
    },
    resolve: { extensions },
    devServer: {
        client: {
            overlay: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-react", { runtime: "automatic" }]],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ],
    },
    plugins: [
        new EslintWebpackPlugin({ extensions }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
    ],
    stats: "minimal",
};
