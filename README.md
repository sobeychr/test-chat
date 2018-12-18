# Test Chat

## Description
This is a test React and Redux application. It simulates a chatting application. It has multiple windows (one per user) with the chat content inside it.

## Setup
Quick description

- Babel 7.0
- Jest 23.6
- NPM 6.4
- React 16.6
- Redux 4.0
- SCSS
- Webpack 4.25

Global setups are set on the root > _.babelrc_, _.gitignore_, _jest.config.json_, _package.json_, _webpack.config.js_

### Commands

- Install `npm i`
- Start `npm start`
- Test `npm t`

### File Structure

- **Public files** under `web/` It contains the HTML holder and the favorite icon.
- **Data** files are under `src/data/` Each file is a JSON file.
- **Jest test** files under `test/` The folder contains the same structure as the other development folder. Each file must be _*.test.js_ to be tested via Jest.
- **React components** files are under `src/component/` 
- **Redux store** files are under `src/reduxStore/` Each reducers are split onto their own file. Types are declared constants in a single file. Actions available within components are declared in a single file.
- **Pure functions** files are under `src/function/` Each file is named after its respective aspect; it may handle data, components or other pure calculations.
- **Style SCSS** files are under `src/style/` Each SCSS file is named after its respective component.
