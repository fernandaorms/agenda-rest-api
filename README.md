# Agenda REST API

The idea of this project comes form the [js-course](https://github.com/fernandaorms/js-course), but over there the teacher decided to create a Students API, while I prefered to keep the Contacts Agenda context based on the previous [full stack agenda-nodejs](https://github.com/fernandaorms/agenda-nodejs) project.
The main difference here was the introduction of:

1. [Multer](https://www.npmjs.com/package/multer) for handling with images uploads;
2. [Sequelize](https://sequelize.org/docs/v6/getting-started/) for handling with relational database operations (the course uses MariaDB, but I choose to work with PostgreSQL);
3. [JSON Web Token](https://jwt.io/introduction) for managing access to protected routes of the api;
4. Usage of tools for creating and organizing the http requests for testing the api (the courses uses Insomnia, but I choose to work with Postman);

As said, based on the previous project and in the course, I made some improvements like:

1. Phone Number validation using the [google-libphonenumber](https://www.npmjs.com/package/google-libphonenumber);
2. Models logic:
   1. Each User has his unique contact list and cannot access or modify other users lists;
   2. Creating a restriction that only allows a User to delete his account after removing all of his contacts;
   3. Users can upload photos (like having a gallery) and after it they can associate one photo for profile picture of himself or his contacts;
4. Add Photo routes:
   1. Index: the User can view all of his photos;
   2. Show: the User can view one of his photos based on ID;
   3. Delete: the User can delete one of his photos based on ID (I used the [fs-extra](https://www.npmjs.com/package/fs-extra)).
