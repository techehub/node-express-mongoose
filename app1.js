var express = require("express");
var mongoose = require("mongoose");

var db = require("./models");
mongoose.connect("mongodb://localhost:27017/mydb1", { useNewUrlParser: true });
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var PORT = 3000;

//below code for cross origin support
var cors = require('cors');
app.use(cors());

app.get("/review", function(req,res) {
  db.Review.find({})
  .then(function(dbReviews) {
    res.json(dbReviews);
  })
  .catch(function(err) {
    res.json(err);
  })
});


app.get("/product", function(req,res) {
  db.Product.find({})
  .then(function(dbProducts) {
    res.json(dbProducts);
  })
  .catch(function(err) {
    res.json(err);
  })
});

app.post("/product", function(req, res) {
  db.Product.create(req.body)
    .then(function(dbProduct) {
        res.json(dbProduct);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// service to create a new Review and update Product's "review" field 
app.post("/products/:id", function(req, res) {
    db.Review.create(req.body)
      .then(function(dbReview) {
            return db.Product.findOneAndUpdate({ _id: req.params.id }, {$push: {reviews: dbReview._id}}, { new: true });
      })
      .then(function(dbProduct) {
         res.json(dbProduct);
      })
      .catch(function(err) {
           res.json(err);
      });
  });

//sevice to get details of  given product including review
  app.get("/products/:id", function(req, res) {
    db.Product.findOne({ _id: req.params.id })
      .populate("reviews") //  populate all of the reviews associated with it
      .then(function(dbProduct) {
         res.json(dbProduct);
      })
      .catch(function(err) { 
         res.json(err);
      });
  });


  app.post("/category", function(req, res) {
    db.Category.create(req.body)
      .then(function(dbProduct) {
          res.json(dbProduct);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/category", function(req,res) {
    db.Category.find({})
    .then(function(dbProducts) {
      res.json(dbProducts);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  //sevice to get details of  given product including review
  app.get("/productlist/:cat", function(req, res) {

   
    var query = db.Product.find({ 'category': req.params.cat });

// selecting the 'name' and 'age' fields
query.select('name desc brand price');



// execute the query at a later time
query.exec(function (err, products) {
  if (err) return err;
  res.json(products);
})

  
  });

// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});