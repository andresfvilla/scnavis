var swig          = require('swig');
var React         = require('react');
var Router        = require('react-router');
var ReactDOM      = require('react-dom/server');
var routes        = require('../../../client/routes');

module.exports = function(app, passport) {

  app.use(function(req, res) {
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
          var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
          var page = swig.renderFile('client/index.html', { html: html });
          res.status(200).send(page);
      } else {
        res.status(404).send('Page Not Found')
      }
    });
  });

  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.send({ message: err.message });
  });

}
