const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const router = require('./routers/export-router');
const mongoose = require('mongoose');
const cors = require('cors');


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
    apis: ["index.js"]
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

app.use('/', (req, res) => {
    res.send(`server is on port ${port}`)
});

app.listen(3000, () => {
    console.log('server on port ' + 3000)
})
