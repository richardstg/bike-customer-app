[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/richardstg/bike-customer-app/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/richardstg/bike-customer-app/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/richardstg/bike-customer-app/badges/build.png?b=main)](https://scrutinizer-ci.com/g/richardstg/bike-customer-app/build-status/main)
[![Build Status](https://app.travis-ci.com/richardstg/bike-customer-app.svg?branch=main)](https://app.travis-ci.com/richardstg/bike-customer-app)

# E-Scooter Customer App

This application is part of a larger project in the course "pattern" at BTH.

React was used to build the application, and it is part of a complete full-stack e-scooter sharing application. The system consists of a [server](https://github.com/wadholm/pattern-backend) built with express.js (and MongoDB) and three front-end applications. The application is one of these three, and it functions as the customer's app for renting scooters. It allows users to log in with Google OAuth and view a map of the cities where the service is operating and rent available scooters.

## Installation

To run the app on your local system, you need the following:

This server running on http://localhost:1337.

Your system needs git, npm, node.js.

To install:

Clone the repo with git clone https://github.com/xlsson/pattern-admin
Run npm install to install the app and its dependencies.
Create a .env file in the root folder, with the following content:
REACT_APP_BACKEND_URL=http://localhost:1337/v1
REACT_APP_GOOGLE_CLIENT_ID=<needs to be created>
REACT_APP_GOOGLE_CLIENT_SECRET=<needs to be created>
ESLINT_NO_DEV_ERRORS=true
PORT=3001

Start the app in your browser by running npm start.
Point your browser to http://localhost:3001

## Available views

A map with an overview of all e-scooters, charging stations and parking stations in the system/city. There is a select menu where the city to view can be chosen.

A view with information about the trip. Battery and starting time is displayed when the trip is ongoing. A summary of the trip is displayed when the trip is ended.

## Available tasks

Rent an available scooter by clicking on it on the map.
