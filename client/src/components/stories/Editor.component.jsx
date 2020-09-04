import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Editor = ({ story, storiesData, setStories, setShow }) => {
    const [title, setTitle] = useState(story.title)
    const [content, setContent] = useState(story.text)
    const [edit, setEdit] = useState(false)

    // re-render the component data when other items are clicked in the parent(Stories)
    useEffect(() => {
        setTitle(story.title)
        setContent(story.text)
    }, [story])


    // Delete story
    const handleDelete = async e => {
        e.preventDefault()

        // delete from db
        await axios.delete(`/outlines/${story._id}`)
        setStories(storiesData.filter(x => x._id !== story._id))
        setShow(false)
    }

    // Save the changes
    const save = async e => {
        e.preventDefault()

        // TODO: save to db
        const sendData = { title: title, text: content }
        await axios.post(`/outlines/${story._id}`, sendData)

        //exit edit mode
        setEdit(false)
    }

    // Make text content editable
    const enterEditMode = e => {
        e.preventDefault()
        setEdit(true)
    }


    return (story &&
        <section className='editor'>
            {edit ?
                <div className="buttons">
                    <button className='btn btn-danger' onClick={e => handleDelete(e)}>Delete</button>
                    <button className='btn btn-confirm' onClick={e => save(e)}>Save</button>
                    <button className='btn btn-danger' onClick={() => setEdit(false)}>Cancel</button>
                </div>
                :
                <div className="buttons">
                    <button type='button' className='btn btn-regular' onClick={e => enterEditMode(e)}>Edit</button>
                </div>
            }
            <form className="story-form">
                <textarea name='title' readOnly={!edit} className={`${edit} title`} value={title} onChange={e => setTitle(e.target.value)}></textarea>
                <textarea name='text' readOnly={!edit} autoFocus={true} className={`${edit} text`} value={content} onChange={e => setContent(e.target.value)}></textarea>
            </form>
        </section>
    )
}

export default Editor
