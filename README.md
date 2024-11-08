# Truco Online Backend

### Stacks

- Node.js
- Express
- TypeScript
- Swagger UI
- Swagger Autogen
- mysql2
- nodemon
- JWT

## Start Project

### Create a .env file with these variables for mysql connection.

```ts
HOST_DB = "";
DATABASE_NAME = "";
USER_DB = "";
PSW_DB = "";
JWT_SECRET = "";
JWT_EXPIRATION = "";
```

### Install the dependencies and devDependencies and start the server.

```sh
cd truco-online-backend;
npm i;
npm run start:dev;
```

### To generate swagger.

```sh
npm run swagger;
```
