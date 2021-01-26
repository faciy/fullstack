const _ = require('lodash')

const dummy = (blogs) => {
  // console.log('blogs', blogs.length)
  if(blogs.length === 0){
    return 1
  }else{
    return 0
  }
}
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    // console.log('object',item)
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteLike = [...blogs.map(blog => blog.likes)]
  if (favoriteLike.length === 0){
    return undefined
  } else{
    const maxFavoriteLike = Math.max(...favoriteLike)
    // console.log(maxFavoriteLike)
    const blogFavorite =  blogs.find(blog => blog.likes === maxFavoriteLike)
    // console.log(blogFavorite)
    return {
      title : blogFavorite.title,
      author: blogFavorite.author,
      likes : blogFavorite.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const groupedBlogs = _.groupBy(blogs, 'author')
  console.log('groupedBlogs', groupedBlogs)

  const sortedBlogs = Object.keys(groupedBlogs)
    .map((author) => {
      return { author, blogs: groupedBlogs[author] }
    })
    .sort((a, b) => {
      return b.blogs.length - a.blogs.length
    })

  return {
    author: sortedBlogs[0].author,
    blogs: sortedBlogs[0].blogs.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const groupedBlogs = _.groupBy(blogs, 'author')
  // console.log('groupedBlogs', groupedBlogs)

  const sortedBlogs = Object.keys(groupedBlogs)
    .map((author) => {
      return { author, likes: totalLikes(groupedBlogs[author]) }
    })
    .sort((a, b) => {
      return b.likes - a.likes
    })

  return {
    author: sortedBlogs[0].author,
    likes: sortedBlogs[0].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}