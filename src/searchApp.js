// global algoliasearch instantsearch




const searchClient = algoliasearch(
  'XXXXXXXXXXX', //YOUR ALGOLIA APP ID
  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX' //YOUR ALGOLIA PUBLIC SEARCH API KEY
);

const search = instantsearch({
  indexName: 'agencies', //CHANGE TO YOUR ALGOLIA INDEX NAME
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: { //EDIT AS NEEDED WITH PROPER VARIABLE NAMES AND HTML FORMATTING
      item: `
<article> 

  <h5>{{agencyName}}</h5>
  <h6>{{userName}}</h6>
  <p>{{userTitle}}</p>
  <a href="mailto: {{userEmail}}" class="collection-item email"><i class=" tiny material-icons">email</i> {{userEmail}}</a><br>
  <a href="tel:+1-{{userCellPhone}}" class="collection-item cell"><i class="tiny material-icons">phone_android</i> Cell: {{userCellPhone}}</a><br>
  <a href="tel:+1-{{userOfficePhone}}" class="collection-item cell"><i class="tiny material-icons">local_phone</i> Cell: {{userOfficePhone}}</a><br>
  <a href="{{agencyAddressLink}}" class="collection-item cell" target="_blank"><i class="tiny material-icons">add_location</i>{{agencyAddress}}</a>

</article>
`,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#list',
    attribute: 'brand',
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
