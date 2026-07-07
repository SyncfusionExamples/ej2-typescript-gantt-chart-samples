const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// The client and the server are two independent applications inside the
// same solution. The client is served by webpack-dev-server (port 8080)
// and the OData V4 endpoint is exposed by the ASP.NET Core server
// (port 7023). The dev server proxies all /odata/* calls to the server
// so the browser can hit the Gantt and the OData service from the same
// origin during development.
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
        devServer: {
            port: 8080,
            open: true,
            historyApiFallback: true,
            hot: true,
            static: false,
            server: "https",
            // Avoid SSL errors when the browser hits the dev server over
            // https with a self-signed certificate.
            allowedHosts: "all",
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
           
        },
    };
};
