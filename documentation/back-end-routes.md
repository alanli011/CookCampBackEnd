# Back-End Routes

## Users

* POST /users - creates a new user
* GET /users/:id - returns a given user
* DELETE /users/:id - deletes a given user
* POST /users/token - gets JWT auth token for user

## Home

* GET / - returns all projects
* POST / - creates a new project

## Projects

* GET /project/:id - returns given project

### Message Board

* GET /project/:id/message-board - returns all message board
* POST /project/:id/message-board/:id - creates a new disucssion

### To-do List

* GET /project/:id/to-do - returns all to-do lists
* POST /project/:id/to-do - creates a new to do list
