# Clubhouse
[The Odin Project: project description](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only)


## Project overview
This is an exclusive Clubhouse where your members can write anonymous posts. Inside Clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Task overview
1. **DONE** Create database models.
   1. users
      - firstName
      - lastName
      - **IMPROVE** email
      - **IMPROVE** password
      - membershipStatus: [user, privilegedUser, admin]
      - isAdmin (via optional check box)
    2. messages
       - title
       - timestamp, available only to `privilegedUser`
       - body
       - **IMPROVE** createdBy: `users[i]`, available only to `privilegedUser`
2. **DONE** Set up database and create project skeleton.
3. **IMPROVE** finish Cookie work.
4. Create `/sign-up` page with sign-up form.
   1. Secure passwords with hash and salt.
   2. Sanitize and validate data.
   3. Include `confirmPassword`.
5. Create `/secret-passcode` page. When users sign up, they should automatically be given a `membershipStatus === user`. They should only get privileges (`membershipStatus === privilegedUser`) if they enter the correct passcode.
6. Create `/log-in` page with log-in form.
7. Create `/new-message` page with message form. To logged-in users, provide a link to "Create a new message."
8. Create `/`, the home page. Here, all messages will be displayed to any visitor of the website. Show `timestamp` and `createdBy` to those users only whose `membershipStatus === privilegedUser`.
9. On the home page, users whose `isAdmin === true` should have the ability to delete messages.

10. Deploy the project to heroku.
