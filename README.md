
## Intro
A Firebase boilerplate for the web; with auth, storage, messaging and cloud functions out of the box. Bundled with Webpack 2. Moreover, `firebase-ignite` is a serverless PWA.

## Get started

Clone the repo:

`git clone https://github.com/collardeau/firebase-ignite.git my-new-app`
`cd my-new-app`

#### Install Dependencies

To deploy cloud functions, you'll need the Firebase CLI:

`npm install -g firebase-tools`

now you can login to firebase:

`firebase login`

install the local npm dependencies:

`npm install`

install the cloud functions dependencies:

`npm install` in the `functions ` folder

#### Set up Firebase

There are two environments to prep: `staging` and `production`, so the following needs to be **done twice**:

- create new firebase app (for instance: `my-app-production` and `my-app-staging`)
see https://firebase.google.com

- enable sign-in method for email/password from the console.

Now, **plug in the app configs** in the following places:

- `src/config.js`
- `sw/firebase-messaging-staging.js`
- `sw/firebase-messaging-producton.js`

Finally, <b>alias your projects</b>, `staging` and `production` respectively, with:

`firebase use -add`

You're ignited and ready to go.

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

## Devving

Be sure you've deployed the cloud functions first (see above).

`npm run dev` runs a webpack dev server with live reload,
 point your browser to `localhost:8080`.

(The staging env is used with `npm run dev`. PWA capacities are disabled to avoid caching, this can be tested on a staging deployment).

## Test Drive

Once you run the app, you'll see some demo of the firebase integration. You'll be able to register/login (auth), save an avatar photo (storage), and send yourself notifications (messaging / cloud functions).

The view layer uses React (with Recompose) but feel free to use what best strikes your fancy :)

Check the cloud functions logs in the firebase console.
