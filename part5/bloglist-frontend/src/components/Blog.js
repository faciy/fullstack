import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({  blog }) => {
    const [showblog, setShowblog] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const toggleVisibility = () => {
        setShowblog(!showblog);
    }

    const incrementLikes = async () => {
        const newBlog = {
            user: blog.user._id,
            title: blog.title,
            author: blog.author,
            likes: likes + 1,
            url: blog.url
        }
        // console.log('newBlog', newBlog)
        const returnedBlog = await blogService.update(blog.id, newBlog);
        setLikes(returnedBlog.likes);
        // console.log('returnedBlog', returnedBlog.likes)
    }
 
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      if(!showblog){
          return(
          <div style={blogStyle}>
              {blog.title} {blog.author} 
              <button type='button' onClick={() => toggleVisibility()} >
                  View
              </button>
          </div>
          )
      }
      return (
        <div onClick={toggleVisibility} style={blogStyle}>
      <div>
      {blog.title} {blog.author}{' '}
        <button type="button" onClick={toggleVisibility}>
          Hide
        </button>
      </div>
      <div>{blog.url}</div>
      <div>
          likes {likes} {' '}
            <button type='button' onClick={incrementLikes} >
                like
            </button>
      </div>
      <div>{blog.author}</div>
    </div>
      )
}

export default Blog