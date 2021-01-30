import React, {useState} from 'react'

const BlogForm = ({user,handleCreate}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
   


  const submitBlog = (e) => {
    e.preventDefault();
    handleCreate(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

    return (
        <div>
            <form onSubmit={submitBlog} >
           <div>
              title
              <input 
              type= "text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input 
              type= "text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input 
              type= "url"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
              />
            </div>
            <button type='submit' >Create</button>
           </form>
        </div>
    )
}

export default BlogForm;
