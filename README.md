# backend-bossabox
## VUTTR (Very Useful Tools to Remember)
## The API was built using nodejs with express and mondoDB.

### To run the project on your machine you must have installed:

- NodeJs
- NPM or Yarn
- Git
- Docker
- REST Client (Postman, Insomnia, etc.)

### First we need to clone the repository
  In the directory of your choice run the command:

`git clone https://github.com/wellici-js/backend-bossabox.git` 

after cloning the project needs to rename the file `.env.example` for `.env`

### Enter the directory and install the dependencies:

`npm install`

### We need to upload the container where our database will be:

`docker run --name database-mongo -p 27017:27017 -d mongo`

#### run `docker ps` and if everything went well it should have a container running database-mongo

### Now run the project:

`npm run dev` or `yarn dev`

### For run the tests automated:

`npm run test` or `yarn test`

### For view the documentation:
`https://app.swaggerhub.com/apis-docs/wellici/backend-vuttr/1.0.0`

