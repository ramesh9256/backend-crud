var express = require('express');
var router = express.Router();
let createModel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search', function(req, res, next) {
  res.render('search');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/update', function(req, res, next) {
  res.render('update');
});

router.get('/delete', function(req, res, next) {
  res.render('delete');
});

router.get('/show-data', function(req, res, next) {
  res.render('show-data');
});



// create

router.post("/create-request", async (req,res) => {
  try {
    const alreadyExits = await createModel.findOne({email:req.body.email});
    if (alreadyExits) {
      return res.send("Data already exits");
    }

    await createModel.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      contact:req.body.contact,
    })
  } catch (error) {
   console.log("Some error occurred");
  }
})


router.get("/show-request", async (req,res) => {
  let data = await createModel.find();
  res.send(data);
})

router.post("/search-request", async (req,res) => {
    let store = await createModel.findOne({name:req.body.name,email:req.body.email});
    let ans = null;
    if (!store) {
      ans = "Data not found";
    }
    else{
      ans = store;
    }
    res.render("search",{data:ans}) 
})


router.post("/delete-request", async (req,res) => {
  try { 
    let deleteData = await createModel.findOneAndDelete({email:req.body.email});
    if (!deleteData) {
      res.send("User not found");
    }
  } catch (error) {
    console.log("Some error occurred");
  }
 
})

router.post("/update-request", async (req,res) => {
  try {
      let updateData = await createModel.findOneAndUpdate({email:req.body.email},{$set:{password:req.body.new-password}});
      if(!updateData){
        res.send("User not found");
      }

  } catch (error) {
    console.log("Some error occurred");
  }
})



module.exports = router;


