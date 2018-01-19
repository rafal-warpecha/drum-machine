const ghpages = require('gh-pages');

ghpages.publish('dist', {}, err => {
    if (err) {
        console.error(err);

        return;
    }

    console.log('Deployed to gh-pages');
});
