const router = require("express").Router();

const product = [
  {
    field: "name",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "picture",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "sell_count",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "why_unique",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "benfits",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "basic_info",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "scientific_evidence",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "inventory_id",
    type: "choice",
    create: "true",
    update: "true",
  },
  {
    field: "discount_id",
    type: "choice",
    create: "true",
    update: "true",
  },
  {
    field: "category_id",
    type: "choice",
    create: "true",
    update: "true",
  },
  {
    field: "price",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "created_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "modified_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "id",
    type: "input",
    create: "false",
    update: "false",
  },
];

const category = [
  {
    field: "name",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "picture",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "description",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "created_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "modified_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "id",
    type: "input",
    create: "false",
    update: "false",
  },
];

const discount = [
  {
    field: "name",
    type: "input",
    create: "true",
    update: "true",
  },

  {
    field: "description",
    type: "textarea",
    create: "true",
    update: "true",
  },
  {
    field: "created_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "modified_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "id",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "discount_percent",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "active",
    type: "checkbox",
    create: "true",
    update: "true",
  },
];

const inventory = [
  {
    field: "created_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "modified_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "id",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "quantity",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "name",
    type: "input",
    create: "true",
    update: "true",
  },
];

const user = [
  {
    field: "created_at",
    type: "input",
    create: "false",
    update: "false",
  },

  {
    field: "picture",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "modified_at",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "id",
    type: "input",
    create: "false",
    update: "false",
  },
  {
    field: "role",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "mobile",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "email",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "username",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "first_name",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "last_name",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "password",
    type: "input",
    create: "true",
    update: "true",
  },
];

const campaign = [
  {
    field: "table_name",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "record_id",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "url",
    type: "input",
    create: "true",
    update: "true",
  },
  {
    field: "id",
    type: "input",
    create: "true",
    update: "true",
  },
];

const createSchema = {
  products: product,
  categories: category,
  discounts: discount,
  inventory: inventory,
  users: user,
  campaigns: campaign,
};

router.get("/", (req, res) => {
  const table = req.query.table;
  console.log(" model table " + table);
  return res.status(200).send(createSchema[table]);
});

module.exports = router;
