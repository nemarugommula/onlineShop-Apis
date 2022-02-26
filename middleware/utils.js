const { PrismaClient, Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { User } = new PrismaClient();

module.exports.filterCreation = async function (req, res, next) {
  if (!req || !req.body || !req.body.email || !req.body.mobile) {
    return res.status(400).send({ reason: "parameters are missing !!" });
  }
  const response = await User.findFirst({
    where: {
      OR: [
        {
          email: req.body.email,
        },
        {
          mobile: req.body.mobile,
        },
      ],
    },
  });
  if (response && response.id)
    return res.status(400).send({
      reason: "user already exist with the same email or mobile",
    });
  next();
};

module.exports.authenticationToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token : " + token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(user);
    if (err) {
      console.log("inside error: " + err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const intDataTypes = [
  "id",
  "order_id",
  "product_id",
  "user_id",
  "address_id",
  "inventory_id",
  "discount_id",
  "category_id",
  "quantity",
  "session_id",
  "product_id",
  "sell_count",
];

const booleanDataTypes = [
  "default",
  "active",
  "user",
  "address",
  "inventory",
  "discount",
  "category",
  "session",
  "product",
];

const decimalDataTypes = ["total", "amount", "discount_percent"];

const syncVariableTypesToDatabaseTypes = function (obj) {
  for (let key in obj) {
    if (!obj[key] || obj[key] == "undefined") {
      delete obj[key];
    } else if (obj[key] == "null") {
      obj[key] = null;
    } else if (typeof obj[key] == "object") {
      obj[key] = syncVariableTypesToDatabaseTypes(obj[key]);
    } else if (intDataTypes.indexOf(key) != -1) {
      obj[key] = parseInt(obj[key]);
    } else if (booleanDataTypes.indexOf(key) != -1) {
      obj[key] = "true" == obj[key];
    } else if (decimalDataTypes.indexOf(key) != -1) {
      obj[key] = parseFloat(obj[key]);
    }
  }
  return obj;
};
module.exports.syncVariableTypesToDatabaseTypes =
  syncVariableTypesToDatabaseTypes;

module.exports.mapIdtoEntity = function (req, res, next) {
  req.body.id = req.params.id;
  next();
};

module.exports.logger = function (req, res, next) {
  console.log(" reqest body : " + JSON.stringify(req.body));
  console.log(" reqest params : " + JSON.stringify(req.params));
  next();
};

module.exports.getUser = async function (id) {
  const response = await User.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return response;
};

module.exports.removeIdsSuffixes = function (req, res, next) {
  for (let key in req.body) {
    if (key.indexOf("_id") != -1) {
      // let newField = key.slice(0, key.indexOf("_id"));
      // req.body[newField] = req.body[key];
      // delete req.body[key];
    } else if (!req.body[key] || typeof req.body == undefined) {
      delete req.body[key];
    }
  }
  console.log(" brushing done : " + JSON.stringify(req.body));
  next();
};
