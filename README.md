# About this Application
Accessible at https://free-the-freela.vercel.app/, employs Clean Architecture, facilitating the addition of new features without affecting existing functionalities. Here's an improved description of your architecture:

## Architecture
I used Clean Architecture in this project, because it's a easy way to add new features without impact the features that have been created.

### Domain layer
This layer houses all models and interfaces, independent of frameworks, libraries, or external packages. It's isolated from the React application, ensuring a clear separation of concerns.

### Data layer
This layer handles the parsing of API responses, managing both errors and successful outcomes. It solely consists of TypeScript code, without the need for additional libraries.

### Infra Layer
The Infrastructure Layer is designated for external dependencies like Axios and GraphQL. It's where all the interactions with external services and APIs are managed.

### Presentation Layer
The React application resides within the Presentation Layer. This design choice allows for flexibility in the choice of frontend frameworks. If a transition from React to Angular, Vue, or another framework is desired, only the Presentation Layer needs reworking, leaving the rest of the application intact.

### Main Layer
Instead of using Create React App, a custom configuration for tools like Jest, ESLint, and TypeScript is recommended. This approach allows for stronger coding patterns and the utilization of advanced TypeScript features, such as module aliases. These enhancements contribute to a more robust and efficient software architecture.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
