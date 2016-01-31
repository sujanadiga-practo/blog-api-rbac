# blog-api-rbac

This application gives a set of RESTful APIs which are used by `blog-web-rbac`.

### Version
0.0.1

### Tech
This application uses following technologies,
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [sails.js](http://sailsjs.org/) - webframework build over expressjs
* [mysql](https://www.mysql.com) - opensource database

### Installation
Below are the steps you need to follow for installation:

```sh
$ git clone https://github.com/sujanadiga-practo/blog-api-rbac.git
$ cd blog-api-rbac
$ sudo npm install
```

For setting up the database in mysql
```sh
$ mysql -u root
$ CREATE DATABASE blogs;
```

Update the config for database consumer application in the file present in consumer-payments/config/connections.js
```sh
$ grunt db:migrate:up
$ sails lift
```

Blog-API is a sails app that runs of port 1338, so you can access the application on http://10.0.1.2:1338 (on vagrant) or on http://localhost:1338 (on local machine)

###Packages Installed
* [jade](http://jade-lang.com/) - Templating engine for your sails app
* [moment.js](http://momentjs.com/) - Date-time formatting
* [sails-mysql](https://github.com/balderdashy/sails-mysql) - MySQL adapter for Sails.js
* [passport](http://passportjs.org/) - authentication middleware for Node.js
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
* [sails-db-migrate](https://github.com/building5/sails-db-migrate) - db-migrate integration for your sails app
* [sails-hook-autoreload](https://github.com/sgress454/sails-hook-autoreload) - Sails JS hook to autoreload controllers, models and locales when changed.