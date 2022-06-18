const express = require('express');
const cors = require('cors');

const app = express();

//set up options of cors middleware
// const options = {
//     origin: 'http://localhost:3000',
//     useSuccessState: 200,
// }


const allowed = ["http://localhost:3000","Some other link"];

const options = (req, res) => {
    let tmp;
    let origin = req.header('Origin');
    if(allowed.indexOf(origin) > -1) {
        tmp = {
            origin: true,
            optionsSuccessStatus: 200
        };
    }else{
        tmp = {
            origin: "stupid"
        };
    }

    res(null,tmp);
} 

app.use(cors(options));


//routes
const userRoute = require('./routes/user')

app.use('/api',userRoute);


app.listen(8000, () => {
    console.log('server is listening');
})