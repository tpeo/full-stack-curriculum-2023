# Week 5: React Part 2

We are going to finish off the frontend section of our course by exploring how to build React projects practically. We are going to touch upon UI Component Libraries (specifically Material UI) and how you can use them to speed up the development and styling of your React applications. We will also be going over routing and context, culminating with y'all building the login of an application. Next week, we'll transition into the backend section of the course, introducing NodeJS.

# Materials

[Day 9: Modern React and Using UI Libraries](https://docs.google.com/presentation/d/1fNy5c4Ifoodhr5EUBneSnhK8zneYxMPU/edit?usp=sharing&ouid=100708582121827169460&rtpof=true&sd=true)

[Day 10: Virtual Dom + Demo Day](https://docs.google.com/presentation/d/182TEMg6a03rtG34_yxJgPaGhUzbNXpm4/edit?usp=sharing&ouid=100708582121827169460&rtpof=true&sd=true)


# Homework

For this week's homework, y'all will be building on top of the Demo Todo application by integrating it with a sample backend that we have created. We've included the code for the backend, and you do not need to know the ins and outs, just how to use it. The following is documentation of the API that we've created, along with the endpoints.

Backend API URL: https://tpeo-todo.vercel.app/

**API Documentation**:

You can access the FULL documentation at: https://tpeo-todo.vercel.app/api-docs/

There are 4 endpoints given to you, and you can experiment with the API itself by
trying certain endpoints out. For example, the GET endpoint for all tasks can be 
called at /tasks, or the full URL, https://tpeo-todo.vercel.app/tasks.

The documentation provides the full guidelines on what is passed in the request,
and what is given back in the response. 

## Instructions

1. Support retrieving your todo list
2. Support adding todo items to your todo list
3. Support removing/checking off todo items to your todo list

HINTS: When retrieving the todo list (hopefully with your own name), make sure to
keep the IDs of each task as well! This ID is how you will delete specific tasks
through the DELETE endpoint. When you POST a new task, the response returns an ID!
You should take this ID and add it to any object you've created.
