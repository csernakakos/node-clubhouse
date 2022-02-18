# Clubhouse
[The Odin Project: project description](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only)


## Project overview
This is an exclusive Clubhouse where your members can write anonymous messages. Inside Clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

Only a privilegedUser can see who posted a message and when.
Only an admin can delete a message.

## Yet to be implemented
- 1: relationship between users and messages (createdBy!)
- 5: sanitize, validate
- 11: improve site look

## Task overview
1. Create database models.
   1. users
      - firstName
      - lastName
      - email
      - password
      - membershipStatus: [user, privilegedUser, admin]
      - isAdmin
   1. messages
       - title
       - timestamp, available only to `privilegedUser`
       - body
       - createdBy: `users[i]`, available only to `privilegedUser`
2. **DONE** Set up database and create project skeleton.
3. **DONE** Finish Cookie work.
4. **DONE** Create `/sign-up` page with sign-up form.
   1. **DONE** Secure passwords with hash and salt.
   2. **DONE** Include `confirmPassword`.
5. Sanitize and validate `/sign-up` and `/log-in` data.
6. **DONE** Create `/secret-passcode` page. When users sign up, they should automatically be given a `membershipStatus === user`. They should only get privileges (`membershipStatus === privilegedUser`) if they enter the correct passcode.
7. **DONE** Create `/log-in` page with log-in form.
8. **DONE** Create `/new-message` page with message form. To logged-in users, provide a link to "Create a new message."
9. **DONE** Create `/home`, the home page. Here, all messages will be displayed to any visitor of the website. Show `timestamp` and `createdBy` to those users only whose `membershipStatus === privilegedUser`.
10. **DONE** On the `/home` page, users whose `isAdmin === true` should have the ability to delete messages.
11. Improve the site's look with CSS.

12. Deploy the project to heroku.
