# What is this for?

This repo aims to allow the user to register some employees and also tables to attend in rounds of 20 minutes and also display a slot to rest, also 20 minutes.

## What does it uses?

It´s a [React](https://reactjs.org/) project, using [Mantine](https://mantine.dev/) to help with styling and [Tabler](https://tabler-icons-react.vercel.app/) to icons.

### How to register/edit/delete an employee?

* Open the menu on the top-left corner and open the Employee link;
* Choose the desired period (Morning, Afternoon or Night);
* Fill with the name/identifier and press Enter to save it;
* The `Delete` button erases the employee from the localstorage;
* The `Edit`  button fill the `Employee name` and autofocus it to type the changes.

### How to register/edit/delete a table?

* Open the menu on the top-left corner and open the Tables link;
* Fill with the name/identifier and press Enter to save it;
* The `Delete` button erases the table from the localstorage;
* The `Edit`  button fill the `Table description` and autofocus it to type the changes.

## How to run it?

It uses [node](https://nodejs.org/en/) to run, version 18.14, and to run and start the local server just execute the following commands in the main project folder:

### `npm install`

### `npm start`

After that, if the browser doesn't open automatically, just past the following url in it: [http://localhost:3000](http://localhost:3000).

The command bellow create a package to deploy it in production environment:

### `npm run build`

It minifies the files and change the names to use hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Bugs list:

* With 3 employees and 3 tables the schedule list starts with the same table;
* The *rest slot* logic isn't working fine, so it was removed temporarily;
* The `Buttons` in the `Employees` and `Tables pages` could not be rightly positioned;

## Improvement list:

* Login/OAuth screen to allow only users with permissions access the system and the features;
* When use the real API, set the [Loader](https://mantine.dev/core/loader/) to these cases;
* Set a new page to manage the Users after the Login task became done;
* Make the shift table horizontal scrolling.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
