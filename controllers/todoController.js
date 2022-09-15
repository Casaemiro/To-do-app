var bodyParser = require('body-parser')
var mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0.lkuvbdp.mongodb.net/test')
//This is llike a blue print



var todoSchema = new mongoose.Schema({
    item: String
})


var Todo = mongoose.model('Todo', todoSchema);



// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: "kick some coding ass" }]
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
    // console.log(app);

    app.get('/todo', function (req, res) {
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', { todos: data })
        })
    });

    app.post('/todo', urlencodedParser, function (req, res) {
    // get data from view and add  it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);   
    })
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        var test = req.params.item
        test = test.split("-").join(" ").trim().split(" ").join("-")
        Todo.find({item: test.split("-").join(" ")}).remove(function(err, data){
            if (err) throw err
            res.json(data);
        })
       
        });
    
}