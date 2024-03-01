# README for Poll Realtime APP - AOA

### Frontend (React with Tailwind CSS):
- **Purpose**: The frontend seems to be the user interface for the polling application.
- **Technologies**:
  - **Framework**: React
  - **Styling**: Tailwind CSS
- **Directory Structure**:
  - `frontend-tailwind/`:
    - `src/`: Contains the source code for the frontend application.
      - `components/`: Contains reusable UI components.
      - `hooks/`: Contains custom React hooks like `AuthContext.tsx`.
      - `models/`: Contains TypeScript models like `Poll.ts`.
      - `pages/`: Contains different pages of the application like `Home`, `Login`, `Poll`, etc.
      - `services/`: Contains API service files for authentication and polls.
      - `styles/`: Contains global styles like `index.css`.
      - `utils/`: Contains utility functions like `handleApiError.ts`.
    - `public/`: Contains static assets like `favicon.ico`, `index.html`.
    - `package.json`, `package-lock.json`: Contains the frontend dependencies.
    - `tailwind.config.js`: Tailwind CSS configuration file.
    - `tsconfig.json`: TypeScript configuration file


## Technologies and Frameworks Used

This frontend project is built using the following technologies and frameworks:

- **React**: A popular JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile applications.
- **TypeScript**: A statically typed superset of JavaScript that adds optional types to the language, enhancing code quality and developer productivity.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces. It's used for styling the application, ensuring a consistent and responsive design.
- **React Router**: A standard library for routing in React applications. It's used for managing navigation and rendering the appropriate components based on the current URL.

## Application Architecture

The application follows a modular architecture, with each module encapsulating a specific functionality. The main modules include:

- **Components Module**: Contains reusable UI components that are used across the application.
- **Hooks Module**: Contains custom React hooks for managing state and side effects, such as authentication and data fetching.
- **Models Module**: Contains TypeScript models that define the shape of the data used in the application.
- **Pages Module**: Contains different pages of the application like `Home`, `Login`, `Poll`, etc.
- **Services Module**: Contains API service files for interacting with the backend, handling authentication and polls.
- **Styles Module**: Contains global styles and Tailwind CSS configurations.
- **Utils Module**: Contains utility functions for common tasks, such as error handling and API request utilities.

## Implemented Modules

The frontend project includes the following modules:

- **Authentication Module**: Implements user registration, login, and token-based authentication.
- **Polls Module**: Allows users to create, update, and delete polls. It also handles voting on polls.
- **Users Module**: Manages user profiles, including profile creation and updates.

## Running the Project

### Using Yarn or npm

To run the project using Yarn or npm, follow these steps:

1. Ensure Node.js and npm (or Yarn) are installed on your machine.
2. Navigate to the project root directory.
3. Install the project dependencies:

```bash
yarn install
```

or

```bash
npm install
```

4. Start the application:

```bash
yarn start
```

or

```bash
npm start
```

This will start the development server, and you can view the application by opening [http://localhost:3000](http://localhost:3000) in your browser. The page will reload if you make edits, and you will see the build errors and lint warnings in the console.

 