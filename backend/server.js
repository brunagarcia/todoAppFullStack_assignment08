const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Todos');

mongoose.Promise = global.Promise;

// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

const Schema = mongoose.Schema;

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

const Todo = mongoose.model('Todo', TodoSchema)

let newTodo = Todo({
  title: "Bogart King",
  complete: false,
  key: new Date(),
})

newTodo.save()
  .then(Todo => {
    console.log(Todo)
  })
  .catch (error => {
    console.log(error)
  })
