# Clubhouse
[The Odin Project: project description](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only)


## Project overview
This is an exclusive Clubhouse where your members can write anonymous posts. Inside Clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Task overview
1. Draft database models.
   1. users
      - firstName
      - lastName
      - userName (or email)
      - password
      - membershipStatus: [user, privilegedUser, admin]
      - isAdmin (via optional check box)
    2. messages
       - title
       - timestamp, protected
       - body
       - createdBy: `users[i]`, protected
2. Set up database and create project skeleton.
3. Create `/sign-up` page with sign-up form.
   1. Secure passwords with hash and salt.
   2. Sanitize and validate data.
   3. Include `confirmPassword`.
4. Create `/secret-passcode` page. When users sign up, they should automatically be given a `membershipStatus === user`. They should only get privileges (`membershipStatus === privilegedUser`) if they enter the correct passcode.
5. Create `/log-in` page with log-in form.
6. Create `/new-message` page with message form. To logged-in users, provide a link to "Create a new message."
7. Create `/`, the home page. Here, all messages will be displayed to any visitor of the website. Show `timestamp` and `createdBy` to those users only whose `membershipStatus === privilegedUser`.
8. On the home page, users whose `isAdmin === true` should have the ability to delete messages.

9.  Deploy the project to heroku.
