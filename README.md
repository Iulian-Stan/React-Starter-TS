# React Starter
Sample React application without using bostraping scripts.

## File Structure

```
React-Starter/
 ├──src/                           * Project source files
 |   ├──components/                * React components
 |   ├──styles/                    * Styling files (SASS, CSS etc.)
 │   ├──typings/                   * TypeScript additional types definitions
 │   └──index.tsx                  * Entry file of the application
 ├──tests/                         * Project tests
 │   └──components/                * Component specific tests
 ├──.eslintrc.json                 * ESLint configuration
 ├──index.html                     * Entry HTML file
 ├──jest.config.js                 * JEst configuration file
 ├──tsconfig.json                  * TypeScript compiler configuration
 └──webpack.config.json            * Webpack configuration

```

## Technologies

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript
* [Webpack](https://webpack.js.org/) - A module bundler for JavaScript
* [Jest](https://jestjs.io/) - A JavaScript Testing Framework with a focus on simplicity
* [ESLint](https://eslint.org/) - A static code analysis tool for JavaScript

First, we need a HTML page that will host React based application.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Getting Started with TypeScript and ReactJS</title>
  </head>
  <body>
    <!-- this is where react renders into -->
    <div id="root"></div>
  </body>
</html>
```

Next we will be adding technologies one by one.


### React

To start working with react we will need the following 2 packages:
* react
* react-dom

`npm install react react-dom`

Now we can start with application entry file - [index.tsx](src/index.tsx)

```
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <div>
      <h1>Hello, Welcome to React and TypeScript</h1>
    </div>
  )

```
For now React will render a simple `<div>` element containing a header `<h1>` inside the `root` element.
Next, we can start adding React `components`, but before that let's add TypeScript dependencies, as we will use it to implement our components. 


### Typescript

TypeScript cannot be directly exceuted by the browser, thus we will need a compiler that will convert our code into JavaScript:

`npm install typescript --save-dev`

Next, we need to define compiler options. These are stored in a JSON file [tsconfig.json](tsconfig.json).
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strictNullChecks": true
  }
 }
```

Refer to [oficial documentation](https://www.typescriptlang.org/tsconfig#compilerOptions) for the exaplanation and the list of the supported compiler options.

Now we can return to React. Considering TypeScript is strongly typed, we will add tpe definitions corresponding to previously installed React packages in order to use the in our TypeScript project:
* @types/react
* @types/react-dom

`npm install @types/react @types/react-dom`

Let's create our first React component:
```
import * as React from 'react'

export default class StaticComponent extends React.Component<> {
  render () {
    return (
      <div>
        <h2>Example Static Component</h2>
      </div>
    )
  }
}

```

This component can now be used in our React application. So far we have just one single file - our aplication entry point [index.tsx](src/index.tsx), so we will add it there.
```
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import StaticComponent from './components/StaticComponent'
ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <div>
      <h1>Hello, Welcome to React and TypeScript</h1>
      <StaticComponent />
    </div>
  )

```

### Webpack

Webpack is all about plugins that help automating the build and bundling process. Let's install it:
* webpack
* webpack-cli
* webpack-dev-server - this is not used during the build, but wil be used a testing server in the development process

`npm install --save-dev webpack webpack-cli webpack-dev-server`

and the plugins we will be using:
* ts-loader
* html-webpack-plugin

`npm install --save-dev ts-loader html-webpack-plugin`

Webpack configuration is store in [webpack.config.js](webpack.config.js)
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Rule to load TypeScript (uses tsconfig.json)
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // Develpoment server
  devServer: {
    port: 9000,
  },
  plugins:[
    // Helps building index.html (adds bundle.js)
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })  ]
};

```

Finally we can test our application. Add the followinf two entries to `scrips` section inside `package.json`:
```
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

`start` command will launch a development server that we can access on local host on port `9000`. To execute it just run `npm start` command.
`build` will create a bundle and put it into the `dist` folder. After running `npm run build` you will find a new `dist` folder with the following content:

```
dist/
 ├──bundle.js
 ├──bundle.js.LICENSE.txt
 └──index.html

```
If you open the `index.html` in the web browser, you will see the same content as in the previous step.

### Jest

Once the application is functional, we can start adding tests to make sure it works correctly and future changes don't break existing functionality. We will use Jest for testing. It requires the following dependencies:
* jest
* @types/jest
* jest-environment-jsdom
* ts-jest
* @testing-library/jest-dom
* @testing-library/react

`npm install --save-dev jest @types/jest jest-environment-jsdom ts-jest @testing-library/jest-dom @testing-library/react`

Similar to Webpack, Jest stores is configured via a JS file [jest.config.js](jest.config.js):
```
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: "jsdom"
};
```

Now let's add the first test for our conponent [StaticComponent.test.tsx](tests/components/StaticComponent.test.tsx):
```
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import StaticComponent from '../../src/components/StaticComponent'

describe('Static component tests', () => {
  test('Data is render correctly', () => {
    const { getByText } = render(<StaticComponent />)

    expect(getByText('Hello, Welcome to React and TypeScript')).toBeInTheDocument()
  })
})

```

We will add a new `scripts` entry to execute our tests:

```
"scripts": {
  "test": "jest"
},
```
Execute tests by running `npm run test`.

### ESLint

Last but not least, we will use ESLint for static code analysis and code formating. We will use the following packages:
* eslint
* eslint-config-standard-with-typescript
* eslint-plugin-import
* eslint-plugin-n
* eslint-plugin-promise
* eslint-plugin-react
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser

`npm install --save-dev eslint eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser`

Linting configuration is defined in a JSON file [.eslintrc.json](.eslintrc.json):
```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```

For explanation and list of suported options refer to the [official documentation](https://jestjs.io/docs/configuration).
As in the previous steps, we will add a separate command for linting
```
"scripts": {
  "lint": "eslint src/**/*.ts[x] tests/**/*.ts[x]"
}
```

After running `npm run lint`, it will display the problems identified in out source and test files.

## Extra

### Styling

This example uses SCSS (Sassy CSS) for styling, meaning it works with standard CSS and some enhancement from Sass.
Style files are imported into .ts or .tsx files as a standard module. But in order to compile the code we need to add some type definitions [scss.d.ts](src/typings/scss.d.ts):
```
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
```

Next we add webpack plugins that will handle CSCC loading:
* style-loader
* css-loader
* sass-loader
* node-sass
* mini-css-extract-plugin

`npm install --save-dev style-loader css-loader sass-loader node-sass mini-css-extract-plugin`

and update [webpack.config.js](webpack.config.js) accordingly:
```
module: {
  rules: [
    ...
    {
      test: /\.(css|scss)$/,
      use: [
        // Creates `style` nodes from JS strings
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        {
          loader: 'css-loader',
          options: {
           modules: true,
           sourceMap: isDevelopment,
        }
        },
        // Compiles Sass to CSS
        {
          loader: 'sass-loader',
          options: {
            sourceMap: isDevelopment,
          }
        }
      ],
      exclude: /node_modules/
    }
  ]
},
plugins:[
  ...
  new MiniCssExtractPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
  })
]
```

Now we can import the entire .scss file into a .tsx - seee [index.tsx](src/index.tsx):
```
...
import './styles/main.scss'
...
```
in which case the final css file will include the original style definitons from the (main.scss)[src/styles/main.scss].
Another option is to use component specific styles - see [DynamicComponent.tsx](src/components/DynamicComponent.tsx):
```
...
import style from './DynamicComponent.scss'
...
<span className={style.number}>{this.state.count}</span>
...
```
this notation will decorate `number` class for `DynamicComponent` to avoid name collision is case same class name is used in another component.

To complete this topic, we will add one more package for testing purpose:
`npm install --save-dev identity-obj-proxy`
It will be used to instruct Jest to mock imported CSS modules such that all `className` lookups on the imported styles object will be returned as-is. See [jset.config.js](jest.config.js):
```
..
moduleNameMapper: {
  '\\.scss$': 'identity-obj-proxy'
}
...
```