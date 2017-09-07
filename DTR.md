## Workflow
### Commits
- Nobody merges to master.  Fork off of master repo, and submit PR to master repo.
- Branch naming convention: Name should be relevant to the issue being worked on.  No initials prefixed
- Atomic commits.  Avoid "ands"
- Imperative. Capitalize start, no period at end.  Keep short as possible.
  ### Pull Requests
    - [Use this Style Guide](https://gist.github.com/jdiejim/0ed1c2974b46d96e0729ed80984674dc)
    - Comments should be as explicit as necessary
  ### Tool
    - Waffle
    - TAGS: Test, Feature, Fix, Style, Risk
  ### Linting/Gitignore
    - AirBnB ruleset(will remove library specific conflicts)
    - Ignore: Node_modules, DS_Store, build file, ENV variables
  ### Deployment
    - Will help each other set up the same githooks
    - CircleCI + Heroku

## Schedule
  - ALL: Will try to take Sundays off.  Try not to burn out.
  - George: Will work til 9pm at latest
  - Juan: If Saturday, earlier the better
  - Evan: Will work til 9pm at latest.  Saturday is ok
  - Joe: Wants to be home for dinner.  Might work past 9.  Cant be in earlier than 11:30 on Sat.
  - James: 9pm cutoff also

## Interests
  - ALL: Websocket implementation
  - George: Redux, helper functions/scoring algorithms, user login (if we do it)
  - Juan: UI, Redux, webpack
  - Evan: Database, CircleCI / Heroku
  - Joe: Database, CircleCI / Heroku, Backend testing
  - James: Freestyling, no preferences and will help as needed

## MVP
  - Front end that has two views: one for administrator, another for a student
  - Administrator can create a question that is viewable by student
  - Student can answer the question that is returned to the administrator
  - The accumulation of all students answers is displayed back to the administrator
 
## Full Features 
  ### Welcome Page (first time view)
  - Login/Signup
  - Should provide quick instruction on how the app works
  - Will redirect to home page if it's been viewed before
  - Student should be able to type code and redirect to relevant test
  
  ### Administrator View
  - Login that verifies correct email extension
  - Instructor should be able to create, delete, or edit tests
  - Each test should generate a unique ID code
  - Questions should be multiple choice (for MVP)
  - Dashboard
  
  ### Student View
  - See what section the test they're on
  - See the name of the question
  - See the potential answers
  - Only see one question at a time
  - Submit go to next page 
  - There should be a skip button that sets answer to null and goes to next page
  - There should be a back button
  - Final submit would verify that all questions are answered.  It will alert student of missing answers.  If all questions are answered, it will submit the scores and show the student the results of their quiz and possibly the class results?
  
## Stack
  - Web Sockets
  - React and Redux
  - React Router
  - SCSS
  - Node/Express/Knex
  - JWTs
  - [OAuth] or [FireBase for OAuth]
  - Jest/Enzyme for front-end testing and helpers
  - Mocha/Chai for back-end testing
  - Session ID or cookies
  
## New Tech (optional)
  - OAuth/Firebase
  - SCSS
  - React D3
  - GraphQL

## Extension (features)
- Timer
- React Native
- PWA 
- Import / Export
- Print

## Agile Process
  - Daily Standup.  Outstanding issues from previous day.  Assignment of new issues.  Requests for assistance.