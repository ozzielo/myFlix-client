# myFlix-client 🎬

myFlix-client is a front end for a movie application that allows movie enthusiasts to view information about movies, directors and genres for a selection of classic films. 

The app interacts with a database that holds movie and user information, using the myFlix API. The repository for the API, which includes documentation of all the available endpoints, can be found [here](https://github.com/Penny167/myFlix).

my-Flix-client was built using React, uses the build tool Parcel and is hosted on Netlify.

## Key Features

- Users can log in or sign up to the app from a welcome page. Login and registration forms implement HTML form validation to ensure credentials adhere to the database users schema.
- On logging in users are taken to a movie view where they can view all the movies in the database. Movies are displayed as cards showing an image, the title, a scrollable synopsis and a button that the user can click to open the card for further information. The movie view also contains a search bar that implements a filter whereby users can search for individual movies by name.
- Clicking the movie card button takes the user to a view of the movie selected. There they can read the full synopsis and find information about the film's director and genre. Clickable links take them to director and genre views with further details. A button allows the user to add the movie to a list of their favourites, which they can view on their profile page.
- Back buttons and links allow the user to move between views. There is also a navigation bar via which a user can navigate directly to the movie view, navigate to their profile or click a button to log out.
- The user's profile displays their registration credentials as well as the list of their favourite movies. Inside this view they can update their credentials using an update form, remove movies from their list of favourites or delete their profile and deregister from the app.
- myFlix-client is a React application and uses both class based and function components to demonstrate different ways of working with state, hooks and lifecycle methods.
- The app implements Redux and React-Redux to manage shared state via a store using actions and reducers. 
- React-Bootstrap has been used to provide a responsive layout as well as a variety of components such as forms, cards, toast alerts and a navbar.
- Routing has been implemented using the React Router in the main component and nav links in the Bootstrap NavBar.
- The data used throughout the app is sent to and from the database by using Axios to make HTTP requests to the relevant myFlix API endpoints.
- Prop-types have been used to ensure that props are passed between React components correctly.
- The completed app has been published to Netlify and is accessible via the live website link above.

## Technologies

- React
- React-Bootstrap
- React-Redux
- Redux
- Axios
- Prop-types
- Parcel
- Netlify

## Installation and set up

This project requires npm in order to install package dependencies. npm is installed automatically when installing node.js. The relevant documentation can be found [here](https://nodejs.org/en/).

Once npm is installed, install myFlix-client by running: 
```
npm install
```
To launch myFlix-client run:
```
parcel src/index.html
```
This will build a local version of myFlix-client viewable in the browser. 
