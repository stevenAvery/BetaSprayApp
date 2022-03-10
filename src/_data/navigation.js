const config = require('./config.js');

const navigationLinksProd = [
    { name: 'Search', route: '/search/' },
];
const navigationLinksDev = navigationLinksProd;
// const navigationLinksDev = navigationLinksProd.concat([
//     { name: 'Wall',     route: '/wall/' }, 
//     { name: 'Problem',  route: '/problem/' },
// ]);
const navigationLinks = config.env.prod ? navigationLinksProd : navigationLinksDev;

module.exports = navigationLinks;