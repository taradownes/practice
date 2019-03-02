const express = require("express"),
    exphbs = require("express-handlebars"),
    mongoose = require("mongoose"),
    path = require('path'),
    fs = require('fs'),
    session = require('express-session'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    upload = multer({ dest: 'uploads/' });

// const make_upload_to_model = filePluginLib.make_upload_to_model;

const app = express();


//mongoose
mongoose.connect('mongodb://localhost:27017/practice', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//add Idea Model
require('./models/Image');
const Image = mongoose.model('images');


//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Express session middleware
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(multer({ dest: './uploads/'}).single('image'));

// app.use(multer({ dest: __dirname + '/file/uploads'}).any());

//static
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname));



//Routes

app.get("/", function(req, res){
    const title = 'Welcome';
    res.render("index");
});

app.get("/about", (req, res) => {
    Image.find({})
    .then(images => {
        res.render('about', {
            images:images
        }); 
    });
});
app.get('/ideas', (req, res) => {
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
        res.render('ideas/index', {
            ideas:ideas
        }); 
    });
});

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
})

//process form
app.post('/ideas', (req, res) => {
    console.log('starting');
    const newImage = {
          image: req.file,
          title: req.body.title,
          details: req.body.details
    }
       new Image(newImage).save()
           .then(image => {
               console.log(newImage);
               console.log('finishing');
               res.redirect('/');
        });
//    let errors = [];
//    if(!req.body.title){
//        errors.push({text:'Please add title'});
//    }
//    if(!req.body.details){
//        errors.push({text: 'Please add details'});
//    }

//    if(errors.length > 0){
//        res.render('ideas/add', {
//            errors: errors,
//            title: req.body.title,
//            details: req.body.details
//        });
//    } else {
//         const newIdea = new Idea();
//         newIdea.img.data = fs.readFileSync(req.files.userPhoto.path)
//         newIdea.img.contentType = 'image/png';
//         newIdea.save()
//         .then(idea => {
//             res.redirect('/ideas');
//         });
//    }
});

// const newUser = {
//     title: req.body.title,
//     details: req.body.details
// }
//  new Idea(newUser).save()


const port = 5000;

app.listen(port, () =>{
    console.log(`Server Started on port ${port}`);
});