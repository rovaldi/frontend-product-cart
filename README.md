# Frontend product cart - Roberto Valcárcel

This project is a test. The goal is to build a simple React application that follows a responsive design, consumes a GraphQL API, and passes the predefined tests. The application is designed to be responsive and user-friendly.

## Features

- A responsive React application built with TypeScript.
- Integration with a GraphQL API to fetch product data.
- Implementation of user interactions, such as adding items to a cart and managing quantities.
- Predefined tests to ensure the functionality of the application.
- Styled using CSS with predefined color variables.

## Getting started

First, install the dependencies.

```sh
yarn install
```

## Start the app

```sh
yarn dev
```

This will do two things:

- Start a React app running in development on <http://localhost:3000>
- Start a graphQL stub server running on <http://localhost:3001/graphql>

## Running tests

To run the tests, use the following command:

```sh
yarn test
```

The tests are located in the **tests** directory and are designed to validate the core functionality of the application.

## Testing Approach

- **Use of `data-testid` for element selection**:
  - By standardizing the use of `data-testid` across all tests, I aimed to make the test suite easier to read, maintain, and extend.

## Requirements

The following requirements were considered during the development of this project:

- **Problem Solving**: Demonstrate the ability to reason through a programming problem and implement a solution.
- **User Interactions**: Build interactive features, such as managing product quantities and adding items to a shopping cart.
- **Code Quality**: Write clean, maintainable, and extendable code.
- **Testing**: Write tests to document and safeguard the application's behavior.
- **Version Control**: Use Git effectively to convey intent and track changes.
- **TypeScript Typings**: Define TypeScript typings for components and GraphQL API responses.

## Project Structure

The project follows a modular structure to ensure scalability and maintainability:

```
src/
├── __tests__/          # Unit tests
├── api/                # GraphQL client, queries, and types
├── components/         # Reusable UI components
├── pages/              # Page-level components
├── styles/             # Global and component-specific styles
├── utils/              # Utility functions and types
└── main.tsx            # Application entry point
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **GraphQL**: A query language for APIs.
- **Jest**: A testing framework for JavaScript.
- **Vite**: A fast build tool for modern web projects.
- **CSS**: Used for styling the application.

## Local Storage and Caching

- **Local Storage Usage**: For this test, I used `localStorage` to cache data such as the cart state. This approach was chosen to demonstrate the concept of caching and to keep the application lightweight and simple.
- **Real-World Alternatives**: In a real-world scenario, I would consider more robust approaches for state persistence and caching, such as state management libraries like `Redux` or `Zustand` for handling persistent state.

## Continuous Integration

This project uses GitHub Actions to ensure code quality. The workflow runs on every push or pull request to the `main` branch and performs the following checks:

- **ESLint**: Validates code style and catches potential issues.
- **Jest Tests**: Runs the test suite to verify application functionality.

The workflow configuration can be found in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Notes

- The application is designed to be responsive and works well on both desktop and mobile devices.
- **CSS Approach**: I chose not to use any CSS libraries as I did not find them necessary for this project. Instead, I used native CSS to maintain simplicity and control over the styling.

## License

This project is licensed for **non-commercial use only**. You are free to use, copy, and modify the code **for personal or educational purposes**, but **you must give credit to the original author** (Roberto Valcárcel Diaz).

Commercial use is strictly prohibited without explicit written permission from the author.

For full license details, see the [LICENSE](LICENSE) file.
