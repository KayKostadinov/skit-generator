import React, { useState } from 'react'
import axios from 'axios'

export default function ListStories(props) {
    const [isFocused, setIsFocused] = useState(false)

    function handleHover(e) {
        e.preventDefault()
        e.stopPropagation()

        setIsFocused(!isFocused)
    }

    function handleMLeave(e) {
        e.preventDefault()
        e.stopPropagation()

        setIsFocused(!isFocused)
    }

    async function handleDelete(e) {
        e.preventDefault()
        e.stopPropagation()
        try {
            const id = props.id
            await axios.delete(`/outlines/${id}`)
            props.delete(id)
        } catch (err) {
            console.error(err)
        }
    }

    function handleEdit(e) {
        e.preventDefault()
        e.stopPropagation()
        props.edit(true)
        const id = props.id
        props.editTarget(id)
    }

    return (
        <div className='box-container'>
            <div className='story-box' onMouseEnter={handleHover} onMouseLeave={handleMLeave} >
                <p className='story-title' >{props.title}</p>
                <textarea contentEditable='false' className='story-content' >{props.content}</textarea>
                <div className='conditional-buttons'>
                    <button className='button-options button-edit' onClick={handleEdit} >EDIT</button>
                    <button className='button-options button-delete' onClick={handleDelete} >DELETE</button>
                </div>
            </div>
        </div>
    )
}