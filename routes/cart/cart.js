const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
} = require("../../middleware/utils");
const { Cart_item, Session } = new PrismaClient();
const {
  rephraseUserInQueryForCartItemAndSession,
  userOrAdmin,
  rephraseOnlyQuery,
} = require("../../middleware/warriers");

async function getSessionOfUser(user_id) {
  let session = await Session.findMany({
    where: {
      user_id: parseInt(user_id),
    },
  });

  console.log(" session object ------ > " + JSON.stringify(session));
  if (session.length == 0) {
    session = await Session.create({
      data: {
        user_id: parseInt(user_id),
      },
    });
  } else {
    session = session[0];
  }

  return session.id;
}

async function carItemAlreadyExists(session_id, product_id) {
  let cartItem = await Cart_item.findMany({
    where: {
      session_id: parseInt(session_id),
      product_id: parseInt(product_id),
    },
  });

  return cartItem.length > 0 ? cartItem[0] : {};
}

router.use(authenticationToken, rephraseOnlyQuery);
router
  .route("/")
  .get(userOrAdmin, async (req, res) => {
    req.query.session_id = await getSessionOfUser(req.user.id);
    console.log(" session_id : " + req.query.session_id);
    console.log(" user_id : " + req.user.id);

    const prismaQuery = {
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    };
    prismaQuery["include"] = {
      product: {
        select: {
          name: true,
          price: true,
          picture: true,
          discount: true,
        },
      },
    };

    const response = await Cart_item.findMany(prismaQuery);
    console.log(" response ----> " + JSON.stringify(response));
    res.status(200).send(response);
  })
  .post(userOrAdmin, async (req, res) => {
    req.body.session_id = await getSessionOfUser(req.user.id);
    console.log(" session id --------> " + req.body.session_id);
    const cartResponse = await carItemAlreadyExists(
      req.body.session_id,
      req.body.product_id
    );
    if (Object.keys(cartResponse).length != 0) {
      const response = await Cart_item.update({
        where: {
          id: parseInt(cartResponse.id),
        },
        data: {
          quantity: 1 + parseInt(cartResponse.quantity),
        },
      });

      return res.send(response);
    }

    const response = await Cart_item.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    res.status(201).send(response);
  })
  .put(userOrAdmin, async (req, res) => {
    const response = await Cart_item.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    console.log(" response : " + JSON.stringify(response));

    res.status(201).send(response);
  })
  .delete(userOrAdmin, async (req, res) => {
    const response = await Cart_item.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
