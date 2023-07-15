# Transpo Project

Transpo is a web application that facilitates communication and collaboration between manufacturers and transporters. The project aims to streamline the process of exchanging information about orders, prices, and descriptions between manufacturers and transporters.

## Technologies Used

The Transpo project utilizes the following technologies:

- **[React](https://react.dev/learn)**: A JavaScript library for building user interfaces. React is used to create the frontend components of the Transpo application, providing an interactive and responsive user experience.

- **[MongoDB](https://www.mongodb.com/)**: A NoSQL document database. MongoDB is used to store and manage the project's data, including orders, user profiles, and other relevant information.

- **[Express](https://expressjs.com/)**: A flexible web application framework for Node.js. Express is used to build the backend server that handles API requests, data retrieval, and other server-side functionalities for the Transpo project.

- **[npm](https://www.npmjs.com/)** (Node Package Manager): A package manager for Node.js. npm is used to manage and install project dependencies, making it easier to incorporate external libraries and tools into the Transpo project.

- **[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)**: A popular CSS framework. Bootstrap is utilized to enhance the project's visual appeal and responsiveness, providing a consistent and user-friendly interface across different devices and screen sizes.

- **[React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)**: A library that combines Bootstrap's CSS with React components. React-Bootstrap is used to create reusable UI components within the Transpo project, simplifying the development process and ensuring consistency in design.

- **[Font Awesome](https://fontawesome.com/)**: A comprehensive icon library. Font Awesome provides a wide range of icons that are used within the Transpo project to enhance the user interface and improve visual communication.

## Extra Project Dependencies

In addition to the main technologies mentioned above, the Transpo project relies on the following dependencies:

- **[module.css](https://create-react-app.dev/docs/documentation-intro)**: A CSS module system that allows for local scoping of styles. module.css is used in the project to provide modular and encapsulated styling for specific components.

- **[react-router](https://reactrouter.com/en/main/start/tutorial)**: A routing library for React applications. react-router is used to manage and handle different routes within the Transpo application, enabling navigation between different pages and components.

- **[react-toast-notifications](https://www.npmjs.com/package/react-toast-notifications)**: A notification library for React. react-toast-notifications is utilized in the project to display informative and user-friendly notifications, such as success messages or error alerts.

- **[react-redux](https://react-redux.js.org/)**: A state management library for React applications. react-redux is used to manage and store the application's state, making it easier to share and access data across different components.

Please ensure that these dependencies are properly installed and configured before running the Transpo project. Use the provided package.json file to reference the specific versions and ensure compatibility.

## Running the Project

To run the Transpo project, follow these steps:

1. Clone the project repository from the designated source.

```shell
git clone https://github.com/YagnikAkbari2/Transpo.git
```

2. Navigate to the directory.

```shell
cd Transpo
```

3. Install the required dependencies using npm.

```shell
npm i
```
or, if needed:
```shell
npm i --force
```

4. Start the backend development server.

```shell
nodemon app.js
```

5. Open new termial sode by side and navigate to client directory

```shell
cd client
```

6. Run step 3 again after navigating to client directory
7.  Start the frontend development server.
```shell
npm start
```

7. The Transpo project should now be running locally. Access it through your preferred web browser by visiting the provided URL or `localhost:3000` or url that shown on terminal.

## Note
Do not forgot to add your own database credentials (Follow to get credentials:- [Link](https://youtu.be/68Jd7GXZPe8)) and secret key (it's a random key of 12 or above characters) into config.env file)

Please ensure that you have the necessary system requirements and a stable internet connection to run the project smoothly.

## [Demo](http://transpo.vercel.app)
