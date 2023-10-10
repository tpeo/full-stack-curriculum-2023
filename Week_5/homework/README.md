# Week 5: React Part 2

We are going to finish off the frontend section of our course by exploring how to build React projects practically. We are going to touch upon UI Component Libraries (specifically Material UI) and how you can use them to speed up the development and styling of your React applications. We will also be going over routing and context, culminating with y'all building the login of an application. Next week, we'll transition into the backend section of the course, introducing NodeJS.

# Materials

[Day 9 + 10: Modern React and Using UI Libraries](https://docs.google.com/presentation/d/12pDClMCPLL9ACW6-LJJjns93Hb8JeUYaWaelsSbQcFY/edit#slide=id.gfdad69bcc6_1_64)

[React Todo List with Login Demo](https://codesandbox.io/s/to-do-mantine-complete-forked-bz9lx3?file=/src/App.js)

# Demo

We will go over how to structure a React application, along with how to use the useContext how to create a login application and remember usernames. We will be building out the entire functionality in React and style our components using Mantine.

# Homework

For this week's homework, y'all will be building on top of the Demo Todo application by integrating it with a sample backend that we have created. We've included the code for the backend, and you do not need to know the ins and outs, just how to use it. The following is documentation of the API that we've created, along with the endpoints.

Backend API URL: https://tpeo-todo.herokuapp.com/

**API Documentation**:

GET: /todo <- Gets the TODO list for a user

- Request -- GET requests dont have payload
- Response -- JSON
  - username: string
  - todos: [Objects] <- each object will look like the following
    - todo: string
    - id: id of the todo
    - email: email of user who created the todo

POST: /todo <- creates a TODO item for a user

- Request -- JSON

  - todo: string

- Response -- JSON
  - msg: string <- should be sucess
  - uid: string <-id of created todo item

DELETE: /todo/<id> <- deletes a todo from a user's list if it exists

- Request
    - uid: string <- the id of the todo you want to remove
- Response -- JSON
  - msg: string <- should be success

## Instructions

1. Support retrieving your todo list
2. Support adding todo items to your todo list
3. Support removing/checking off todo items to your todo list