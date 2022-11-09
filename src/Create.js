import { useState } from "react"
import { useHistory } from 'react-router-dom'
const Create = () => {
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ isPending, setIsPending] = useState(false)
    const history = useHistory();


    //form submit
    const handleSubmit  = (e) => { 
        // prevent from being refreshed the page
        e.preventDefault(); 
        const blog = { title, body, author };

        setIsPending(true)
        setTimeout( () => {

            fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: { "content-Type": "application/json"},
                body: JSON.stringify(blog)
            }).then(() => {
                console.log('blog added ')
                setIsPending(false)
                //history.go(-1) vuelve un evento o pagina atras
                history.push('/')
            })
            
        }, 300 )
    }

    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form action="POST" onSubmit={ handleSubmit }>
                <label htmlFor="">Blog Title: </label>
                <input 
                    type="text" 
                    value={ title }
                    onChange = { (e) =>setTitle( e.target.value ) }
                    required
                />
                <label htmlFor="">Blog body: </label>
                <textarea 
                    required 
                    cols="30" 
                    rows="10"
                    value = { body }
                    onChange = { (e) =>setBody( e.target.value ) }
                    >
                </textarea>

                <label htmlFor="">Blog Author: </label>
                <select name="" id="" 
                    value={ author}
                    onChange = { (e) =>setAuthor( e.target.value ) }
                >
                    <option value="">Choose an Author</option>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                
                { !isPending && <button>Add Blog</button> }
                { isPending && <button>  Adding Blog . . . </button>}
            </form>
        </div>
    );
}

export default Create;