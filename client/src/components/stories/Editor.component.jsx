import React, { useState, useEffect } from 'react'

// TODO: change the handling of editable textareas:
//      css :read-only
//      js  contenteditable

const Editor = ({ story }) => {

    // re-render the component data when other items are clicked in the parent(Stories)
    useEffect(() => {
        setTitle(story.title)
        setContent(story.text)
    }, [story])

    const [title, setTitle] = useState(story.title)
    const [content, setContent] = useState(story.text)
    const [edit, setEdit] = useState(false)
    const [editable, setEditable] = useState('not-editable') // TODO: write the CSS rules to forbid/ allow editing

    // Delete story
    const handleDelete = e => {
        e.preventDefault()
        // TODO: delete from db
    }

    // Save the changes
    const save = e => {
        e.preventDefault()

        // TODO: save to db

        setEdit(!edit)
        setEditable('not-editable')
    }

    // Make text content editable
    const enterEditMode = e => {
        e.preventDefault()
        setEditable('editable')
        setEdit(!edit)
    }

    return (
        <section className='editor'>
            <div className="buttons">
                {edit ?
                    <button className='btn btn-regular' onClick={e => save(e)}>Save</button>
                    :
                    <button type='button' className='btn btn-regular' onClick={e => enterEditMode(e)}>Edit</button>
                }
                <button className='btn btn-danger' onClick={e => handleDelete(e)}>Delete</button>
            </div>
            <form className="story-form">
                <textarea name='title' className={`${editable} title`} value={title} onChange={e => setTitle(e.target.value)}></textarea>
                <textarea name='text' className={`${editable} text`} value={content} onChange={e => setContent(e.target.value)}></textarea>
            </form>
        </section>
    )
}

export default Editor
