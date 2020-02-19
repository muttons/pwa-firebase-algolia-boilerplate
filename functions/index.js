const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('agencies'); //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH

/// Cloud Functions

exports.addToIndex = functions.firestore.document('agencies/{agencyId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH

    .onCreate(snapshot => {

        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({ ...data, objectID });

    });



    exports.updateIndex = functions.firestore.document('agencies/{agencyId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH

        .onUpdate((change) => {
            const newData = change.after.data();
            const objectID = change.after.id;
            return index.saveObject({ ...newData, objectID });
        });



exports.deleteFromIndex = functions.firestore.document('agencies/{agencyId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH

  .onDelete(snapshot =>
    index.deleteObject(snapshot.id)
  );
