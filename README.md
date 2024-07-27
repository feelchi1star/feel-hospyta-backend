# Hospyta Backend API

## Overview

This is a backend API built using NestJS and MongoDB for managing posts, comments, and votes. The API allows users to create, update, delete, and retrieve posts while also providing features for commenting and voting.

**For a more detailed explanation, watch the video [here](https://www.youtube.com/watch?v=3Peh5Lla9_4).**

[![Watch the video](https://img.youtube.com/vi/3Peh5Lla9_4/0.jpg)](https://www.youtube.com/watch?v=3Peh5Lla9_4)

**API Documentation:** [View API Documentation](https://documenter.getpostman.com/view/21087341/2sA3kaBJwR)

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

  - `POST /posts/:postId/vote`

- **Downvote Post**
  - `POST /posts/:postId/vote`

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

## Challenges Faced

### 1. Circular Dependency Issues

- **Challenge:** Encountered circular dependency issues between modules while implementing voting functionality.
- **Solution:** Utilized `forwardRef()` in NestJS to resolve dependencies without breaking the module structure.

### 2. Mongoose Virtual Fields

- **Challenge:** Faced issues with setting up virtual fields for counting votes due to the way Mongoose handles references.
- **Solution:** Defined virtual fields in the `Post` schema and ensured that they were populated correctly when querying posts.

### 3. Error Handling

- **Challenge:** Initially lacked comprehensive error handling in API endpoints, leading to uninformative responses.
- **Solution:** Implemented custom error handling middleware and refined the responses to provide meaningful feedback to API consumers.

### 4. TypeScript Integration

- **Challenge:** Faced type-related errors when integrating TypeScript with Mongoose and Express, particularly with request objects.
- **Solution:** Created custom interfaces and extended existing ones to accommodate additional properties, ensuring type safety.

## Author

Felix Chinonso Emmanuel
[feelchi1star@gmail.com](mailto:feelchi1star@gmail.com)

Feel free to contact me for any additional details needed!
