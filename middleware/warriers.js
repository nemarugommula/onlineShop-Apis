module.exports.onlyAdmin = function (req, res, next) {
  if (req && req.user && req.user.role == "ADMIN") {
    next();
  } else {
    return res.status(401).send("Sorry you are not autorized for this");
  }
};

module.exports.onlyUser = function (req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    next();
  } else {
    return res.status(401).send("Sorry you are not autorized for this");
  }
};

module.exports.userOrAdmin = function (req, res, next) {
  if (req && req.user && req.user.id) {
    next();
  } else {
    return res.status(401).send("Sorry you are not autorized for this");
  }
};

module.exports.rephraseOnlyQuery = function (req, res, next) {
  console.log(
    "-------------------------------------------------------------------------"
  );
  console.log(" req params : " + JSON.stringify(req.query));
  if (req.body) console.log(" req body : " + JSON.stringify(req.body));
  if (req.user) console.log(" req user : " + JSON.stringify(req.user));
  if (req.query.include) {
    req.include = { ...req.query.include };
    delete req.query.include;
  }
  next();
};

module.exports.rephraseUserInQuery = function (req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    req.query.user_id = req.user.id;
  }
  next();
};

module.exports.rephraseUserInQueryForPaymnentAndOrder = function (
  req,
  res,
  next
) {
  if (req && req.user && req.user.role == "USER") {
    req.query.order_id = {
      user_id: req.user.id,
    };
  }
  next();
};

module.exports.rephraseUserInQueryForCartItemAndSession = function (
  req,
  res,
  next
) {
  if (req && req.user && req.user.role == "USER") {
    req.query.session_id = {
      user_id: req.user.id,
    };
  }
  next();
};

module.exports.rephraseUserInQueryForOrderItemAndOrder = function (
  req,
  res,
  next
) {
  if (req && req.user && req.user.role == "USER") {
    req.query.order_id = {
      user_id: req.user.id,
    };
  }
  next();
};

module.exports.rephraseUserInQueryForUserTable = function (req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    req.query.id = req.user.id;
  }
  next();
};

module.exports.userTableSpecific = function (req, res, next) {
  if (req.user.role == "USER") {
    req.query.id = req.query.user_id;
  }
  next();
};
