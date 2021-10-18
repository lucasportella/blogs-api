# blogs-api
## CRUD/REST API using MSC architecture with Sequelize

## How to install

### Requirements
  - node
  - mysql server running on your local machine, you need to have a username and password configured
  - an app to do requests to the API like Postman or Insomnia

### Installation steps
  - in the "Code" icon, download the project via git clone or download zip option
  - open the terminal and enter in the project's folder
  - create the .env file and fill it with the data you see on the file .env.example
  - in the terminal run the following commands:
      - ***npm install***
      - ***npm start***
  - now you can start making requests

## Requests
In the root folder, go the public folder, you will see pictures of expected inputs and outputs from the API.

Here's an example of how to register an user in the database through the route *htttp://localhost:3000/user* with a POST request.

> {
> 
  > "displayName": "Brett Wiltshire",
  >
  > "email": "brett@email.com",
  >
  > "password": "123456",
  >
  > "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
>
> }

If you can read portuguese, take a detailed look of this project through the file *avaliacao-trybe.md* in the root folder.
