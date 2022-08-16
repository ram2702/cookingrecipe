const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("RecipeBookUsers");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/recipeRecord").get(function (req, res) {
  let db_connect = dbo.getDb("RecipeBookUsers");
  db_connect
    .collection("Recipes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/recipeRecord/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Recipes").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

recordRoutes.route("/recipesRecord/:author").get(function (req, res) {
  let db_connect = dbo.getDb("RecipeBookUsers");
  let myquery = { author: req.params.author };
  db_connect
    .collection("Recipes")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb("RecipeBookUsers");
  let myobj = {
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    retypePassword: req.body.retypePassword,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
recordRoutes.route("/reciperecord/add").post(function (req, response) {
  let db_connect = dbo.getDb("RecipeBookUsers");
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    author: req.body.author,
  };
  db_connect.collection("Recipes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/recipeupdate/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      author: req.body.author,
    },
  };
  db_connect
    .collection("Recipes")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("RecipeBookUsers");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Recipes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
