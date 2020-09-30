var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//var data =[{item:'get milk'},{item:'walk dog'},{item:'kcik some coding ass'}];
var urlencodedParser = bodyparser.urlencoded({extended:false});

//Connect to mongo DB
mongoose
.connect('<MongoDB URI>',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
.then(()=>console.log('Mongo DB connected...'))
.catch((err)=>console.log(err));

//Todo Schema
var todoSchema = new mongoose.Schema({
    item:String
});

//Create model of the mongo database
var Todo = mongoose.model('Todo', todoSchema);



module.exports = function(app){
    app.get('/todo',(req,res)=>{
        //Get data from mongo DB and pass it to view
        Todo.find({},(err,data)=>{
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        //Get data from the view and add it to mongo DB
        if (req.body.item !== '')
        {
            var newTodo = Todo(req.body).save((err,data)=>{
                if (err) throw err;
                res.json(data);
                console.log('item saved');
            });
        }
    });

    app.delete('/todo/:item',(req,res)=>{
        //Delete the requested item from mongoDB
        Todo.find({item:req.params.item.replace(/\-/g,' ')}).deleteOne((err,data)=>{
            if (err) throw err;
            res.json(data);
            console.log('item deleted');
        });
    });
};