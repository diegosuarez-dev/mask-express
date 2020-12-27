const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Succesfully connected to MongoDB')).catch(console.error());