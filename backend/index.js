const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const router = require('./routers/export-router');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function(req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage: storage,
// }).single('myImage');



const storageConfig = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true);
}

const upload = multer({
    dest: './uploads',
    fileFilter,
    storageConfig,
    limits: {
        fileSize: 5000000
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log('wertey', req.file);
    res.json({ file: req.file });
});

app.use((err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ error: 'Only images are allowed' });
        return;
    }
    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: 'Allow file size is 500KB' });
        return;
    }
});

app.use(express.static(__dirname))

app.use(multer({storage: storageConfig}).single('filedata'));


// Extended: https://swagger.io/specification/#infoObject

const swaggerOptions = {
    swaggerDefinition: {
        "info": {
            "description": "This is a sample express server.",
            "version": "1.0.0",
            "title": "Swagger Doc",
            "contact": {
                "email": "verteyko1990@gmail.com"
            },
            "license": {
                "name": "ISC"
            }
        },
        "servers": "localhost:3000",
    },
    apis: ['./routers/movies.js']
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

mongoose.connect('mongodb://localhost:27017/Movie', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (error) => {
    if (!error) {
        console.log('success')
    } else {
        console.log('error');
    }
})

app.use(cors());
const port = process.env.PORT || 8080
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/movies', router.moviesRouter);
app.use('/auth', router.userRouter);
app.post('/upload', (req, res) => {
    console.log('wertey');
    upload(req,res, (err) => {
        if (err) {
            res.send('error');
        } else {
            console.log(req.body);
            res.send('test');
        }
    })
})

app.use(express.static('./public'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.use('/', (req, res) => {
    res.send(`server is on port ${port}`)
});

app.listen(3000, () => {
    console.log('server on port ' + 3000)
})
