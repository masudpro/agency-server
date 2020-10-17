const express = require('express')
const cors = require('cors');
const fs = require('fs-extra');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const uri = `mongodb+srv://agencyuser:agencypass2020@cluster0.hftxd.mongodb.net/agency?retryWrites=true&w=majority`;

const app = express()
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const agencyCollection = client.db("agency").collection("agencydata");
  const courseCollection = client.db("agency").collection("CourseCollection");
  const orderCollection = client.db("agency").collection("order");
  const AdminCollection = client.db("agency").collection("adminPanel");
  console.log('data connected')

    // app.post('/addCourse', (req, res) => {
    //     const addCourse = req.body;
    //     console.log(addCourse)
    //     agencyCollection.insertOne(addCourse)
    //     .then( result => {
    //         res.send(result.insertedCount > 0)
    //     })

    // })

    // app.get('/showCourse', (req, res) => {
    //     const showCourse = req.body;
    //     agencyCollection.find({})
    //         .toArray((err, documents) => {
    //             res.send(documents)
    //         })
    // })



// add Admin and Login Admin from Admin

app.post('/makeAdmin', (req, res) => {
    const email = req.body.email;
    AdminCollection.insertOne({  email })
        .then(result => {
            res.send(result.insertedCount > 0)
        })

})

app.get('/loginAdmin', (req, res) => {
    const newUser = req.query.email;
    AdminCollection.find()
        .toArray((err, documents) => {
            res.send(documents);
        })
})

// add Order and display Order from OrderCollection


app.post('/addOrder', (req, res) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const comment = req.body.comment;
    const price = req.body.price;
    const newImg = req.files.file.data;
    const encImg = newImg.toString('base64');
    var img = {
        contentType: req.files.file.mimetype,
        size: req.files.file.size,
        img: Buffer.from(encImg, 'base64')
    }

    orderCollection.insertOne({ name, email, title, comment, price, img })
        .then(result => {
            res.send(result.insertedCount > 0)
        })

})


        app.get('/showOrder', (req, res) => {
            const newUser = req.query.email;
            orderCollection.find({ email: newUser })
                .toArray((err, documents) => {
                    res.send(documents);
                })
        })
        app.get('/getOrder', (req, res) => {
            const getReview = req.body;
            orderCollection.find({})
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })

// add Review and display Review from agencyCollection
   app.post('/addReview', (req, res) => {
       const file = req.files.file;
       const name = req.body.name;
       const recognition = req.body.recognition;
       const feedback = req.body.feedback;
       console.log(name, recognition, feedback, file);
       const filePath = `${__dirname}/image/${file.name}`
        file.mv(filePath, err=> {
            if(err){
                console.log(err);
                 res.status(500).send({msg: 'Failed to Upload your Image'});
            }
            

            const newImage = fs.readFileSync(filePath);
            const encImg = newImage.toString('base64');
            const image = {
                contentType: req.files.file.mimeType,
                size: req.files.file.size,
                img: Buffer(encImg, 'base64')
            };


            agencyCollection.insertOne({name, recognition, feedback, image})
            .then( result => {
               fs.remove(filePath, error => {
                   if (error){console.log(error);
                    res.status(500).send({msg: 'Failed to Upload your Image'});
                }
                   res.send(result.insertedCount > 0)
               })
            })
        })

    })


    app.get('/getReview', (req, res) => {
        const getReview = req.body;
        agencyCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/addReview', (req, res) => {
       const file = req.files.file;
       const name = req.body.name;
       const recognition = req.body.recognition;
       const feedback = req.body.feedback;
       console.log(name, recognition, feedback, file);
       const filePath = `${__dirname}/image/${file.name}`
        file.mv(filePath, err=> {
            if(err){
                console.log(err);
                 res.status(500).send({msg: 'Failed to Upload your Image'});
            }
            

            const newImage = fs.readFileSync(filePath);
            const encImg = newImage.toString('base64');
            const image = {
                contentType: req.files.file.mimeType,
                size: req.files.file.size,
                img: Buffer(encImg, 'base64')
            };


            agencyCollection.insertOne({name, recognition, feedback, image})
            .then( result => {
               fs.remove(filePath, error => {
                   if (error){console.log(error);
                    res.status(500).send({msg: 'Failed to Upload your Image'});
                }
                   res.send(result.insertedCount > 0)
               })
            })
        })

    })


    app.get('/getReview', (req, res) => {
        const getReview = req.body;
        agencyCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })


// add course and display course from courseCollection




    app.post('/addCourses', (req, res) => {
       const file = req.files.file;
       const title = req.body.title;
       const price = req.body.price;
       const description = req.body.description;
       console.log(title, price, description, file);
       const filePath = `${__dirname}/image/${file.name}`
        file.mv(filePath, err=> {
            if(err){
                console.log(err);
                 res.status(500).send({msg: 'Failed to Upload your Image'});
            }
            // return res.send({name: file.name, path: `/${file.name}`})

            const newImage = fs.readFileSync(filePath);
            const encImg = newImage.toString('base64');
            const image = {
                contentType: req.files.file.mimeType,
                size: req.files.file.size,
                img: Buffer(encImg, 'base64')
            };


            courseCollection.insertOne({title, price, description, image})
            .then( result => {
               fs.remove(filePath, error => {
                   if (error){console.log(error);
                    res.status(500).send({msg: 'Failed to Upload your Image'});
                }
                   res.send(result.insertedCount > 0)
               })
            })
        })

    })


    app.get('/getCourse', (req, res) => {
        const getReview = req.body;
        courseCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })





});






app.use(cors());
app.use(bodyParser.json());
app.use(express.static('image'))
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)