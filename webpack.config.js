const path = require("path");

var babelOptions = {
  presets: ["@babel/env", "@babel/typescript", "@babel/react"],
  plugins: ["@babel/proposal-class-properties", "classy-ui/plugin"]
};

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "node_modules")
    ],
    index: "index.html"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
    modules: ["src", "node_modules"]
  },

  entry: "./src/index.tsx",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        use: [
          {
            loader: "source-map-loader"
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
