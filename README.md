# React Starter (TypeScript)

Sample starter React application.

## Preview

[React Starter TS](https://github.com/Iulian-Stan/React-Starter-TS/)

## Technologies

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript
* [Webpack](https://webpack.js.org/) - A module bundler for JavaScript
* [Jest](https://jestjs.io/) - A JavaScript Testing Framework with a focus on simplicity
* [ESLint](https://eslint.org/) - A static code analysis tool for JavaScript

## Project Structure

```
React-Starter/
 ├──public/                        * Static content (contains entry index.html) 
 ├──src/                           * Project source files
 |   ├──components/                * React components
 |   ├──theme/                     * Styling files (SASS)
 │   ├──App.tsx                    * Entry React component
 │   ├──index.tsx                  * Entry file of the application
 │   └──index.scss                 * Global styling
 ├──tests/                         * Project tests
 │   └──components/                * Component specific tests
 ├──.eslintrc                      * ESLint (Linter) configuration
 ├──jest.config.json               * Jest (Testing Framework) configuration
 ├──tsconfig.json                  * TSC (TypeScript compiler) configuration
 └──webpack.config.json            * Webpack (Bundler) configuration

```

The best way to understand project structure is to inspect [Webpack configuration file](webpack.config.js).

### Application Entry Page

The entry page is [index.html](public/index.html) is located in the `public` folder:
```
plugins: [
  // Helps building index.html (adds bundle.js)
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.html')
  })
]
```

The content of this file is:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Starter TS</title>
  </head>
  <body>
    <!-- this is where react renders into -->
    <div id="root"></div>
  </body>
</html>
```

Note `<div id="root"></div>` element. It is used by entry script [index.jsx](src/index.tsx) to host React application content:
```
entry: './src/index.tsx'
```

Here's the corresponding code snippet from [index.jsx](src/index.tsx): 
```
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);
```

[App](src/App.tsx) is the root component of the React application.

### Building the code

Note the `.tsx` extension of the script files. JSX is a syntax extension to TypeScript. It allows combining React UI components with TypeScript code. This code needs to be transpiled into native JavaScript to run in a web browser. 

Webpack defines rules on how each file type should be handled. Here's the corresponding rule:
```
module: {
  rules: [
    {
      test: /\.(ts|tsx)?$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }
  ]
}
```

`ts-loader` uses TypeScript compiler for `.ts` and `.tsx` files. TypeScript also requires a configuration file [tsconfig.json](tsconfig.json):
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "module": "es6",
    "moduleResolution": "node",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "esModuleInterop": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
 }
```

Refer to [official documentation](https://www.typescriptlang.org/tsconfig#compilerOptions) for the explanation and the list of the supported compiler options.

### Styling

This example uses SCSS (Sassy CSS) for styling, meaning it works with standard CSS and some enhancement from Sass.

Webpack rules corresponding to the style files:
```
module: {
  rules: [
    {
      test: /\.(css|scss)$/,
      exclude: /node_modules/,
      use: [
        // Inject CSS into the DOM in development and extract it into separate files in production
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        // Interprets @import and url() like import/require() and resolves them
        {
          loader: 'css-loader',
          options: {
            modules: 'local',
            sourceMap: devMode,
          }
        },
        // Loads a Sass/SCSS file and compiles it to CSS
        {
          loader: 'sass-loader',
          options: {
            sourceMap: devMode,
          }
        }
      ]
    }
  ],
  plugins:[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}
```

Note: Style files are imported into `.tsx` files as a standard module. To avoid compilation errors additional type definitions `.d.ts` files are required.

## Running the application

The application can be launched by invoking the `start` script defined in [package.json](package.json):
```
"scripts": {
  "start": "webpack serve --mode development"
}
```
`start` command will launch a development server that we can access on local host on port `9000`. To execute it run the `npm start` command.

## Bundling the application

The application is bundled by invoking the `build` script defined in [package.json](package.json):
```
"scripts": {
  "build": "webpack --mode production"
}
```
`build` will create a bundle and put it into the `dist` folder. To execute it run the `npm run build` command.

## Extra

### Testing

This example uses Jest for testing. Jest configuration is defined in [jest.config.json](jest.config.json):
```
{
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}
```
The tests are placed in the `test` folder next to `src`. The corresponding script is defined in [package.json](package.json):
```
"scripts": {
  "test": "jest"
},
```
Tests are executed by running `npm run test`.

### Code Formatting

Last but not least, static code analysis and code formatting are performed using [ESLint](https://eslint.org/). Linting configuration is defined in a JSON file [.eslintrc.json](.eslintrc.json).

For explanation and list of supported options refer to the [official documentation](https://jestjs.io/docs/configuration).

There are two scripts dedicated for linting:
```
"scripts": {
  "lint": "eslint \"{src,tests}/**/*.{ts,tsx}\"",
  "lint:fix": "eslint \"{src,tests}/**/*.{ts,tsx}\" --fix"
}
```
Running `npm run lint` identifies problems in the source and test files and displays them directly in the terminal. `npm run lint:fix` identifies problems and fixes them directly in the source code if possible, in case a fix is not possible it will display the issue in the terminal.