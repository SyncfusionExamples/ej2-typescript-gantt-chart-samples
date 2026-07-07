const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// The client is a standalone webpack application (port 8080). It talks to
// the GraphQL endpoint exposed by the GraphQlAdaptor.Server (port 4205),
// which runs the graphpack/graphql server used in the Angular sample.
//
// In production the client output is generated with `npm run release`
// and the files in `wwwroot/` can be served by any static host.
module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./src/index.ts",
        output: {
            path: path.resolve(__dirname, "wwwroot"),
            filename: "[name].[chunkhash].js",
            publicPath: "/"
        },
        resolve: {
            extensions: [".js", ".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : "style-loader",
                        "css-loader",
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            ...(isProduction
                ? [
                      new MiniCssExtractPlugin({
                          filename: "css/[name].[chunkhash].css",
                      }),
                  ]
                : []),
        ],

    };
};
