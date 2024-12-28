const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./models');

app.use(express.json());
app.use(cors())

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

// app.get('/', (req, res) => {console.log("homepage")
//     res.send("Welcome to the blog API")
// })
db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });    

})





