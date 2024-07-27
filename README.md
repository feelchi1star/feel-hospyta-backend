# Hospyta Backend API

## Overview

This is a backend API built using NestJS and MongoDB for managing posts, comments, and votes. The API allows users to create, update, delete, and retrieve posts while also providing features for commenting and voting.

**For a more detailed explanation, watch the video [here](https://www.youtube.com/watch?v=3Peh5Lla9_4).**

[![Watch the video](https://img.youtube.com/vi/3Peh5Lla9_4/0.jpg)](https://www.youtube.com/watch?v=3Peh5Lla9_4)

## Features

- **Post Management**

  - Create a new post with an image, content, and category.
  - Edit and delete a user's own posts.
  - Retrieve a list of posts with timestamps, user information, and post details.

- **Comments**

  - Add comments to posts and reply to comments.
  - Retrieve comments for a specific post, including user information and timestamps.

- **Voting**
  - Upvote and downvote posts.
  - Retrieve total upvotes and downvotes for each post.

## API Endpoints

### Post Management

- **Create Post**

  - `POST /posts`

- **Update Post**

  - `PATCH /posts/:id`

- **Delete Post**

  - `DELETE /posts/:id`

- **Get All Posts**
  - `GET /posts`

### Comment Management

- **Add Comment**

  - `POST /posts/:postId/comments`

- **Get Comments for a Post**
  - `GET /posts/:postId/comments`

### Voting

- **Upvote Post**

  - `POST /posts/:postId/upvote`

- **Downvote Post**
  - `POST /posts/:postId/downvote`

## Environment Variables

Make sure to create a `.env` file in the root directory based on the provided `.env-sample` file. The environment variables required for the application include:

- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- Additional environment variables as required by your application

## Technologies Used

- **NestJS**: Framework for building the API.
- **MongoDB**: NoSQL database for storing data.
- **JWT**: For authentication and authorization.
- **Class-validator**: For validating incoming requests.

## Author

Felix Chinonso Emmanuel
[feelchi1star@example.com](mailto:feelchi1star@example.com)

---

Feel free to contact me for any additional details needed!
