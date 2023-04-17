# Interview Scheduler

This Interview Scheduler project is a single page application which allows you to book, edit and delete interviews between students and mentors! It is an app built using React and makes requests to a scheduler-api server to get and save appointments!

## Project Showcase

Appointments page

!["Appointments page"](https://github.com/marcuszcoding/scheduler/blob/master/docs/appointment-form.png)

Creating A New Appointment

!["Creating Appointment"](https://github.com/marcuszcoding/scheduler/blob/master/docs/create-appointment.png)

Showing The New Appointment

!["Showing New Appointment"](https://github.com/marcuszcoding/scheduler/blob/master/docs/new-appointment.png)

Delete Appointment

!["Deleting An Appointment"](https://github.com/marcuszcoding/scheduler/blob/master/docs/delete-appointment.png)

## Setup

1.) Fork and clone this repository  
2.) Install dependencies with `npm install`.  
3.) Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api)  
4.) Follow steps in the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) README file in order to set up a proper database for the app  
5.) Open up 2 terminal windows, 1 for the scheduler webpack server and 1 for the scheduler-api  
6.) In both terminal windows just use "npm start" and you will be up and running!  
6.5) If you would like to run tests for the scheduler app you can use the Jest framework "npm test"

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- class-names
- normalize.css
- react
- react-dom
- react-scripts
- react-hooks-testing-library
