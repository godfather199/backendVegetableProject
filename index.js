const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const {mongoose}= require('./db');

const app= express();

app.use(bodyParser.json());
app.use(cors());


// Cart Page Route
app.use('/vegetableDetail', require('./controller/cart_Route'));

// Comment Route
app.use('/commentSection', require('./controller/comment_Route'));

// Authenticate Route
app.use('/authenticate', require('./controller/authenticate_Route'));

// SaveForLater Route
app.use('/saveLater', require('./controller/save_Later_Route'));

// UserBlog Route
app.use('/blog', require('./controller/blog_Route'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});