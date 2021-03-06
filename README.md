## Disclaimer
This website is build for educational purposes only and will never be supposed to serve real users.
The design of this website was inspired by https://substack.com/.
Some parts of this website match its parent quite closely. This is for
educational purposes only. The articles in this website use copy/paste content & pictures
from well known news providers like BBC etc. This is for educational purposes only and its never supposed to serve real users.

## Description
Simple blog build on top of React & Firebase.

Authentication - register, login, logout

Profile create, edit.

CRUD - article create, edit, delete. Non authenticated users can read only the latest
article for given category. Authenticated users can read all articles, can create articles(if their profile is completed),
can edit & delete their own articles.

Bulma is used for styling. The styling is implemented in a single style sheet.

External libraries used: "bulma", "bulma-timeline", "firebase", "formik", "node-sass", "react-toastify", "uuid"

Firebase deployed: mysoftexam.web.app

## Covered general requirements:

At least 3 different dynamic pages (pages like about, contacts, etc. do not count towards that figure)

Use React.js for the client-side

Communicate to a remote service (Firebase)

Implement authentication

Implement client-side routing

Demonstrate use of programming concepts, specific to the React library: stateless and state full components, bound forms, synthetic events, React Hooks, Context API, Component Styling…

Use a source control system, like GitHub

Brief documentation on the project and project architecture (as .md file)

## Other requirements

Error handling and data validation added to the forms

Decent UI and UX

## Bonuses

Global state implemented on top of the ContextAPI



## To run the project locally

1. Clone the repo - `git clone https://github.com/Srednogorie/react-blog.git`

2. Get into the project dir - `cd react-blog`

3. Install the dependencies - `npm install`, this might take a while depending on your machine

4. Start the project - `npm start`

5. If the project fail to load because of node-sass, run - `npm rebuild node-sass`.
Once done run `npm start` again.

6. Visit the dev server at http://localhost:3000/

Enjoy!

The page will reload if you make edits.\
You will also see any lint errors in the console.

