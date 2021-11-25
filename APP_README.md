To start the application, just type on your terminal: 
`docker-compose up -d`

All backend APIS are available at localhost:3333.

POST http://localhost:3333/users CREATES A NEW USER
POST http://localhost:3333/sessions CREATES A SESSION FOR A USER
POST http://localhost:3333/files UPLOAD OPERATION FILE 
GET http://localhost:3333/operations GET THE LIST OF OPERATIONS
GET http://localhost:3333/stores GET THE LIST OF STORES