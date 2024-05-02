# SimplifyMe

ElyasZone is a website that allow users to post their services to clients and also allow them 
see other’s services in the platform.

## Technologies Used

### Frontend

- **React with TypeScript**: Building user interfaces with type safety and better development experience.
- **Redux Toolkit**: State management library for predictable state containers in JavaScript apps.
- **RTK Query**: Data fetching and caching library for Redux apps.
- **SASS**: For styling
- **Yup and Formik**: Form validation and form handling libraries for React forms.

### Backend

- **Node.js**: Server-side JavaScript runtime environment for building scalable network applications.
- **Express.js**: Web application framework for Node.js, providing a robust set of features for web and mobile applications.
- **MongoDB**: NoSQL database for storing flexible and scalable data.
- **JWT (JSON Web Tokens)**: Authentication mechanism for secure transmission of information between parties.

## Installation

To run SimplifyMe locally, follow these steps:
- Clone the repository: `git clone <repository-url>`
- Create .env files inside both the frontend and backend folders and add the required variables for the frontend you need to add VITE_APP_API_URL
  and for the backend you need to add the following variables:
  - ACCESS_TOKEN_SECRET
  - REFRESH_TOKEN_SECRET
  - DATABASE_URI
  - EMAIL_FROM
### Running the frontend
- Navigate to the project directory: `cd ElyasZone/frontend`
- Install dependencies frontend: `npm install`
- Run the frontend: `npm run dev`
### Running the backend
- Navigate to the project directory: `cd ElyasZone/backend`
- Install dependencies frontend: `npm install`
- Run the frontend: `npm run dev`

## Feedback

We welcome any feedback or suggestions for improving ElyasZone. Please feel free to open an issue or submit a pull request with your ideas or contributions.

Thank you for using ElyasZone! We hope it helps you to post your services and see other's services effectively.
