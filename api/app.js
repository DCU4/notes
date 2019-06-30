var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require('cors'),
    mongoose = require('mongoose');



// mongoose.connect('mongodb://localhost:27017/notes', { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors());




var noteSchema = new mongoose.Schema({
    note: String,
    created: { type: Date, default: Date.now },
});

var Note = mongoose.model('Note', noteSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

Note.create( {
    note: 'A test note'
    },
    function(err,note){
        if(err){
            console.log(err);
        } else {
            console.log('yes');
            console.log(note);
        }
});

//note list page
// app.get('/', function(req, res, next){

//   res.render('index');

// });



app.post('/note', cors(), function (req, res, next) {
    //Create a new kee and save to DB
    // console.log(req.body);
    // console.log(req.body);
    // console.log(req.user);

    // var note = req.body
    // console.log(note)

    // console.log(req);
    var newNote = { note: req.body.note };
    // console.log(newNote)
    Note.create(newNote, function (err, newlyCreated) {
        if (err) {
            //later this should be front end error message
            console.log(err);
        } else {
            // res.redirect('/');
            console.log(newlyCreated);
            // console.log(req.body._id);
        }
    });
});


//single note page
app.get('/:id', cors(), function (req, res, next) {
    // find campgorund with correct id, render the template
    Note.findById(req.params.id, function (err, foundNote) {
        if (err) {
            console.log(err);
        } else {
            // res.render('single',{notes:foundNote});
            res.send({ notes: foundNote });
        }
    });

});

//note list page
app.get('/', cors(), function (req, res, next) {
    //Get all kees from DB -- find.({}) means ALL kees

    Note.find({}, function (err, allNotes) {
        if (err) {
            console.log(err);
        } else {
            // res.render('/',{notes: allNotes });
            res.send({ notes: allNotes });
            // res.send('sending data from server');
            console.log(allNotes);
            // console.log(req.user.username);

        }
    });

});


var http = require("http");

var port = "8080";
// var port = process.env.PORT || "8081";
app.set("port", port);


var server = http.createServer(app);

// server.listen(port, function(){
//     console.log('Server started');
// });

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server started');
});

// app.listen(process.env.PORT || 3000, function(){
//     console.log('Server started');
// });

