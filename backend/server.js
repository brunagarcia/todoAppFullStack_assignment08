const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Todos');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.argv[2] || 8080;

app.use(bodyParser.json());

//Allowing cors access. 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


//Databases connection:
app.get('/url', (req, res) => {
  database.find({})
    .then(databases => {
      res.json(databases)
    })
})

//Enabling promises.
mongoose.Promise = global.Promise;
//Declaring Scheema.
const Schema = mongoose.Schema;



// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  key: {
    type: String,
    required: true
  }
})

//Startint the CRUD operations:

//CREATE Todo
app.post('/addtodo', (req, res) => {
  console.log(req.body);
  let newTodo = Todo({
      title: req.body.title,
      complete: req.body.complete,
      key: req.body.key,
    })
  
  newTodo.save()
    .then(Todo => {
      console.log(Todo)
    })
    .catch (error => {
      console.log(error)
    })
    res.json({ success: true })
})

//UPDATE database
app.put('/updatetodo', (req, res) => {
 
  let update = {
   complete: req.body.complete
 }

let query = {"key": req.body.key}

let options = {
  new: true,
  runValidators: true
}

Todo.findOneAndUpdate(query, update, options)
  .then(updatedTodo => {
    console.log(updatedTodo);
    res.json(updatedTodo)
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({err});
  })
});


//READing database.
app.get('/gettodo', (req, res) => {
  Todo.find({})
    .then(todos => {
        //returns an array of objects
        res.send(todos);
    })
    .catch(err => {
        console.log(err);
    })
})

//DELETE Database.
app.delete('/deletetodo', (req,res) => {
	Todo.find({"complete": true}).remove()
		.then(todo => {
			res.json({deleted:true});
		})
		.catch(err => {
			console.log(err);
			res.status(400)
				.json({err});
		})
});

const Todo = mongoose.model('Todo', TodoSchema)


app.listen(8080, () => {
  console.log(`CONNECT ON PORT ${port}`)
})