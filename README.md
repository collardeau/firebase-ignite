[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Intro
A Firebase boilerplate for the Web: with auth, storage, messaging and cloud functions out of the box. Bundled with Webpack 2. `firebase-ignite` is a serverless PWA.

#### Get started

Clone or fork the repo: `https://github.com/collardeau/firebase-ignite.git`

#### Install Dependencies

To deploy cloud functions, you'll need the Firebase CLI:

`npm install -g firebase-tools`

login to firebase if you haven't already:
`firebase login`

install the local npm dependencies:

`npm install` in the root folder and the `functions` folder as well.

#### Set up Firebase

There are two environments to ready: `staging` and `production`.

- create 2 new firebase apps (for instance: `my-app-production` and `my-app-staging`)
at https://firebase.google.com

- enable sign-in method for email/password for both (in the firebase console)

Now, **edit in the configs** in the following places:

- `src/config.js`
- `sw/firebase-messaging-staging.js`
- `sw/firebase-messaging-producton.js`

Finally, <b>alias your projects</b>, `staging` and `production` respectively, with:

`firebase use --add`

You're ignited and ready to go.

`npm run dev`

## Devving

Be sure you've deployed the cloud functions first (see above), as a cloud function is used to create user profiles on registration.

`npm run dev` runs a webpack dev server with live reload at `localhost:8080`.

The staging env is used in DEV. PWA capacity is disabled to avoid caching, that can be tested on a staging deployment.

## Test Drive

Once you run the app, you'll see a demo of the firebase integration. You'll be able to register/login (auth), save an avatar photo (storage), and send yourself notifications (messaging / cloud functions).

The UI uses React (with Recompose) with an app shell, but that's just to demo. `firebase-ignite` gives you a lot of freedom once you're hooked in firebase itself. Use your favorite tools.

Check the cloud functions logs in the firebase console.

## Deploy

#### Static Web App

To deloy the app, you must first package your bundle and assets for the correct environment:

`npm run build:staging` or `npm run build:production`.

This will move everything you need into the `dist` folder, which still needs to be deployed, for example using zeit now:

`npm install now -g`
`now dist`

#### Cloud Functions

Target an env with:

`firebase use staging` or `firebase use production`

Then, simply: 

`firebase deploy --only functions`

and optionally return to the staging env for safety:
`firebase use staging`

## Code Architecture

WIP
