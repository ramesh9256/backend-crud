var express = require("express");
var router = express.Router();
let createModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/search", function (req, res, next) {
  let results ;
  res.render("search", { results });
});

router.get("/create", function (req, res, next) {
  res.render("create", { message: null });
});

router.get("/update", function (req, res, next) {
  res.render("update", { message: null });
});

router.get("/delete", function (req, res, next) {
  res.render("delete", { message: null });
});

router.get("/show-data", function (req, res, next) {
  res.render("show-data");
});

// create

router.post("/create-request", async (req, res) => {
  try {
    const alreadyExits = await createModel.findOne({ email: req.body.email });
    if (alreadyExits) {
      return res.render("create", { message: "Data already exits" });
    } else {
      await createModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      });
      return res.render("create", { message: "Data created successfully" });
    }
  } catch (error) {
    console.log("Some error occurred");
  }
});

router.get("/show-request", async (req, res) => {
  let data = await createModel.find();
  res.send(data);
});

// Search Data of the user
router.post("/search-request", async (req, res) => {
  let results = await createModel.find({
    name: req.body.name,
    email: req.body.email,
  });
  res.render("search", { results });
});

// Delete the User from the database
router.post("/delete-request", async (req, res) => {
  try {
    let deleteData = await createModel.findOneAndDelete({
      email: req.body.email,
      name : req.body.name,
      password: req.body.password,
    });
    if (deleteData != null) {
      res.render("delete", { message: "User deleted successfully!" });
    } else {
      res.render("delete", { message: "No data found!" });
    }
  } catch (error) {
    console.log("Some error occurred");
  }
});


// Update the User's password in the database
router.post("/update-request", async (req, res) => {
  try {
    let updatedUser = await createModel.findOneAndUpdate(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      { $set: { password: req.body.npassword } },
      { new: true }
    );
    if (updatedUser) {
      res.render("update", { message: "User updated successfully!" });
    } else {
      res.render("update", { message: "User not found!" });
    }
  } catch (error) {
    console.log("Some error occurred");
  }
});

module.exports = router;
