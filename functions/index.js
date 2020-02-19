const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app; //keys passed in with command line to keep them safe, fireship.io has a good guide on this
const ADMIN_KEY = functions.config().algolia.key; //keys passed in with command line to keep them safe, fireship.io has a good guide on this

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('EXAMPLES'); //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH

/// Cloud Functions

exports.addToIndex = functions.firestore.document('EXAMPLES/{EXAMPLEId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase

    .onCreate(snapshot => {

        const data = snapshot.data();
        const objectID = snapshot.id;
        return index.saveObject({ ...data, objectID });

    });



    exports.updateIndex = functions.firestore.document('EXAMPLES/{EXAMPLEId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


        .onUpdate((change) => {
            const newData = change.after.data();
            const objectID = change.after.id;
            return index.saveObject({ ...newData, objectID });
        });



exports.deleteFromIndex = functions.firestore.document('EXAMPLES/{EXAMPLEId}') //CHANGE TO YOUR ALGOLIA/FIRBASE INDEX/COLLECTION, THEY MUST MATCH - camelCase


  .onDelete(snapshot =>
    index.deleteObject(snapshot.id)
  );
