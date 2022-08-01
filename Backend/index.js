const express = require('express');
require('./db/mongoconnection')
const user = require('./db/usermodel');
const cors = require('cors')
let Product = require('./db/Productmodel')
let bcrypt = require('bcrypt')

const app = express();
app.use(express.json());
app.use(cors())

app.post('/register', async (req, resp) => {
       
        try{
         
            let users=new user(req.body);
         users= await users.save();
         resp.send(users);
        }
     
     catch(error){
         resp.status(499).json({error:"email already exists"})
       }
         
})
app.post('/login', async (req, resp) => {
   if (req.body.pass && req.body.email) {
      let users = await user.findOne(req.body).select("-pass");
      if (users) {
         resp.send(users);
      }
      else {
         resp.send("User Not Found")
      }
   }
   else {
      resp.send("enter correct Details")
   }
});
app.post("/add", async (req, resp) => {
   let product = new Product(req.body);
   let result = await product.save()
   resp.send(result);
   console.log(result);
})

app.get('/products', async (req, resp) => {
   let result = await Product.find();
   if (result.length > 0) {
      resp.send(result)
   } else {
      resp.send("no products available")
   }
})
app.delete('/products/:id', async (req, resp) => {
   let result = await Product.deleteOne({ _id: req.params.id });
   resp.send(result)
})
app.get('/products/:id', async (req, resp) => {
   let result = await Product.findOne({ _id: req.params.id });
   if (result) {
      resp.send(result)
   }
   else {
      resp.send("Data Unavailable")
   }
})
app.put('/products/:id', async (req, resp) => {
   let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
   resp.send(result)
})
app.get('/search/:key', async (req, resp) => {
   let result = await Product.find({
      "$or": [{
         name: { $regex: req.params.key }
      },
      {
         company: { $regex: req.params.key }
      },
      { category: { $regex: req.params.key } }
      ]
   });
   resp.send(result);
})
app.listen(4500);

// {
//    user.find({ email: req.body.email }).exec().then(users => {
//       if (users.length>0) {
//          return resp.status(409).json({
//             message: "email already exist"
//          })
//       } else {
//          bcrypt.hash(req.body.pass, 10, (err, hash) => {

//             if (err) {
//                return resp.status(500).json({ error: err });

//             }
//             else {
//                let users = new user ({
//                   name: req.body.name,
//                   email: req.body.email,
//                   pass: hash
//                })
//                users
//                   .save()
//                   .then(result => {
//                      console.log(result)
//                      resp.status(201).json({
//                         message: "user created"
//                      })
//                   }).catch(err => {
//                      console.log(err);
//                      resp.status(500).json({
//                         error: err
//                      })
//                   })
//             }
//          }
//          )
//       }
//    })
// })
