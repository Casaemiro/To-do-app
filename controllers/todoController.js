var bodyParser = require('body-parser')
var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: "kick some coding ass" }]
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
    // console.log(app);

    app.get('/todo', function (req, res) {
        res.render('todo', { todos: data })
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        data.push(req.body);
        console.log(data);
        res.json(data);
    });

    app.delete('/todo/:item', function (req, res) {
        var test = req.params.item
        test = test.split("-").join(" ").trim().split(" ").join("-")
        data = data.filter((todo)=>{
            console.log(todo.item.split(" ").join("-"))
            return todo.item.split(" ").join("-") !== test;
        });
        console.log(data)
        console.log(test);
        res.json(data);
    });
}