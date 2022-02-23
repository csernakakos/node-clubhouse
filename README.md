# Clubhouse
[The Odin Project: project description](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only)


## Project overview
This is an exclusive Clubhouse where your members can write anonymous messages. Inside Clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

Every visitor of the website can read all message titles and message bodies.
Every logged-in user can post a message.
A basic user can only see the message title and the message body.
Only a privilegedUser can see who posted a message and when.
Only an admin can delete a message.

## Yet to be implemented
- **DONE** 1.2: CreatedBy `users[i]`, available only to `privilegedUser`:
  - Revisit how I set up related documents and populated the required fields by looking up the `// < RELATED DOCUMENTS` comments.
- **DONE** 1.2: timestamps should be available only to `privilegedUser`.
- **DONE** 5: sanitize, validate `/log-in` and `/sign-up` data in API using `validator`.
- 5: sanitize, validate `/log-in` and `/sign-up` FORM data in API using `express-validator`.
- 11: Minor front-end design improvements.
- 11: **DONE** Re-add front-end now that the MERN backend code is reworked.
- 12: **DONE** Code cleanup, then deploy `git push heroku main` and submit to TOP.

## Task overview
1. **DONE** Create database models.
   1. users
      - username
      - email
      - password
      - membershipStatus: [user, privilegedUser, admin]
      - isAdmin
      - timestamps
   2. messages
       - title
       - timestamps, available only to `privilegedUser`
       - body
       - createdBy: `users[i]`, available only to `privilegedUser`
2. **DONE** Set up database and create project skeleton.
3. **DONE** Finish Cookie work.
4. **DONE** Replace Cookie with JWT.
5. **DONE** Create `/sign-up` page with sign-up form.
   1. **DONE** Secure passwords with hash and salt.
   2. **DONE** Include `confirmPassword`.
6. Sanitize and validate `/sign-up` and `/log-in` data.
7. **DONE** Create `/secret-passcode` page. When users sign up, they should automatically be given a `membershipStatus === user`. They should only get privileges (`membershipStatus === privilegedUser`) if they enter the correct passcode.
8. **DONE** Create `/log-in` page with log-in form.
9. **DONE** Create `/new-message` page with message form. To logged-in users, provide a link to "Create a new message."
10. **DONE** Create `/home`, the home page. Here, all messages will be displayed to any visitor of the website. Show `timestamp` and `createdBy` to those users only whose `membershipStatus === privilegedUser`.
11. **DONE** On the `/home` page, users whose `isAdmin === true` should have the ability to delete messages.
12. **DONE** Improve the site's look with CSS.

13. Deploy the project to heroku.
