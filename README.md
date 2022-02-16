# Backend Engineer Test

Create an API that serves as an cloud backup system

## Simple Mode
- Users can create an account with:
    - email address
    - password
    - full name
- Users can upload files up to 200mb
- Users can download uploaded files
- Users can create folders to hold files

## Hard Mode
- An admin user type for managing the content uploaded
- Admins can mark pictures and videos as unsafe
- Unsafe files automatically get deleted
- Users can stream videos and audio

## Ultra Mode
- Compression
- File History

## Bonus
- Revokable session management
- Multiple admin reviews before file is deleted

## How to pick what to work on
At minimum you must implement everything in simple mode. You're free to pick and choose what else you
implement along side it. The harder the task, the better your chances. Though make sure to finish the **Simple Mode**
first.

## Tools/Stack

- NodeJs (TypeScript & Express) or Golang
- Postgres for pure data
- Redis
- Docker
- Postman
- S3 or any other shared cloud storage provider

## Tests

Unit tests are a must, submissions without tests will be ignored.


## Time Duration

7 days

## Submission

1. Your API endpoints should be well documented in POSTMAN.
2. Code should be hosted on a git repository, Github preferably.
3. The API should be hosted on a live server (e.g. https://heroku.com)
4. Your app should be `containerized` using `docker`.
5. Share with us through email the:
    - Repository
    - Hosted API URL
    - Postman Collection
    - A list of tasks you did beyond **Simple Mode**


## Running locally

To run the app locally, follow the steps below:

1. Clone the repository to your PC using your terminal. For more info, refer to this [article](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

2. After cloning, navigate into the repo using:

   ```
   cd backend-test

   ```

3. Install the dependencies in the yarn.lock using the command:

   ```
   yarn
   ```

4. After the dependencies have been installed successfully, create a .env file at the root. Take a look at the env.sample file and configure your environment variables with your values in the .env file.


## Writing Tests

**NOTE**: All test files should have a `.test.ts` file extension.

All tests for a route or controller should be placed in a `_tests_` folder relative to the folder it resides in.

For example, if you had a `authController.ts` file located in `controllers/auth`, and your tests are in a `authController.test.ts` file, do the following:

1. Create a `_tests_` folder in the `controllers/auth` folder

2. Move the `authController.test.ts` file to the `_tests_` folder

3. To run test

   ```
   yarn run test
   ```


The file structure would look similar to this:

```
.
├── controllers
│   └── auth
│       ├── authController.ts
│       └── _tests_
│           └── authController.test.ts
```