module.exports = function () {
  
  return function (req, res, next) {

    res.guard = function (statusCode, cbOrMsg, cbExtra) {

      var msg  = typeof cbOrMsg === 'string'   ? cbOrMsg : null,
          json = typeof cbOrMsg === 'object'   ? cbOrMsg : null,
          cb   = typeof cbOrMsg === 'function' ? cbOrMsg : cbExtra;

      return function () {

        if (Array.prototype.shift.call(arguments)) {

          res.status(statusCode);
          if (msg)  return res.send(msg);
          if (json) return res.json(json);

        } else {

          cb.apply(null, arguments);

        }

      };

    };

    next();

  };

};
