# SN-API



The Social Network API provides RESTful endpoints for managing an e-commerce platform's categories, products, and tags. Built using Node.js, Express, and Sequelize, this API enables CRUD operations on categories, products, and tags, and supports many-to-many relationships between products and tags.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Thoughts](#thoughts)
  
- [License](#license)

## Installation

To get started with the SN API, follow these steps:

### Clone the Repository
bash
git clone https://github.com/gerikoci31/SN-API
cd SN-API

### Install Dependencies

Make sure you have Node.js and npm installed. Then run:
bash
npm install
npm moongose

### Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

MONGO_URI='mongodb://localhost/social-network'

PORT=27017

### Create and Migrate the Database

Ensure MongoDB is installed and running, then drop and recreate the database, and run migrations:
bash
npm install moongose
connect to this url mongodb://localhost:27017/social-network'

## Configuration

- *Database*: MongoDB

- *Server*: Express.js

## Usage

### Start the Server
bash
node index.js

The server will run on [http://localhost:270171](http://localhost:27017).

### Testing Endpoints

You can use tools like Postman or cURL to test the API endpoints.

## API Endpoints

### Users

- *GET /api/users*: Retrieve users.
- *GET /api/users/userId*: Retrieve a user by its id.
- *POST /api/users*: Create a new user.
- *PUT /api/users/userId*: Update a user data by its id.
- *DELETE /api/users/:id*: Delete a user by its id.

### Thoughts

- *GET /api/thoughts*: Retrieve all thoughts.
- *GET /api/thoughts/:thoughtId*: Retrieve a thought by its id.
- *POST /api/thoughts*: Create a new thought
- *PUT /api/products/:id*: Update a product by its id.
- *DELETE /api/products/:id*: Delete a product by its id.
- *POST /api//:thoughtId/reactions* : Post a new reaction.
- *DELETE /api/:thoughtId/reactions* : Delete a new reaction.
