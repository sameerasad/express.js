//a middleware is also responsible for the termination of req,res cycle and send control to the next middleware
function log(req, res, next) {
  console.log("logging....");
  next();
}

module.exports = log;

function auth(req, res, next) {
  console.log("authenticating....");
  next();
}
module.exports = auth;
