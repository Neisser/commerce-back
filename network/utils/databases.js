const mongoose = require('mongoose')
mongoose.Promise = global.Promise

async function connect(uri){
    const options ={
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true
    }
    await mongoose.connect(uri,options).then(
        () => {
            console.log('Connected to mongoDB')
        },
        (err) => {
            console.log(err)
        }
    )
}

module.exports = connect