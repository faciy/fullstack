const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url =
  `mongodb+srv://charlesothiel_2000:${password}@cluster0.1jllf.mongodb.net/blog?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: process.argv[3],
  author: process.argv[4],
  url: process.argv[5],
  likes: process.argv[6]
})


// eslint-disable-next-line no-unused-vars
blog.save().then(response => {
  // eslint-disable-next-line semi
  console.log('blog saved!');
  // eslint-disable-next-line semi
  mongoose.connection.close();
})


Blog.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})