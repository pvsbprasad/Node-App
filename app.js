const oServe = require('./Utility/Util.js');

oServe.express = require('express');
oServe.app = oServe.express();
oServe.axios = require('axios');
oServe.helmet = require('helmet');
oServe.pug = require('pug');
oServe.compression = require('compression');
oServe.cors = require('cors');
oServe.PORT = process.env.PORT || 3000;

oServe.app.use(oServe.express.json());
oServe.app.use(oServe.cors({ origin: '*' }));
oServe.app.use(oServe.helmet());
oServe.app.use(oServe.compression()); 
 
oServe.app.set('view engine', 'pug');
oServe.app.set('views', './Template');

oServe.app.get('/', async (req, res, next) => {
try {
res.status(200).render('HomePage', { title: `Qualtrics NodeJS Server`, message: `Qualtrics NodeJS Application` });
}
catch (e) {
if (e.response === undefined) {
next(e);
res.status(503).send(e.message);
}
else {
next(e);
res.status(e.response.status).send(e.response.statusText);
}
}
});

oServe.app.use(async (req, res, next) => {
try {
res.status(404).render('HomePage', { title: 'Page Not Found', message: 'Page Not Found' });
}
catch (e) {
if (e.response === undefined) {
next(e);
res.status(503).send(e.message);
}
else {
next(e);
res.status(e.response.status).send(e.response.statusText);
}
}
});

oServe.app.listen(oServe.PORT, () => {
console.log(`Listening on Port ${oServe.PORT}`);
}); 