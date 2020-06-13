import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function WriteEditor(props) {
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const history = useHistory();

    function handleKeyUp(e) {
        setValue(e.target.value)
    }

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    async function handleSave(e) {
        e.preventDefault()
        e.stopPropagation()
        try {
            const data = {
                title: title,
                text: value
            }
            // const story = props.storyData
            //TODO:
            //create mongo model and save to db
            //implement the Story component to display in the new editor

            await axios.post(`/outlines/add`, data)
            history.push('/outlines')
        } catch (err) {
            console.error(err)
        }

    }


    return (
        <div className='editor'>
            <textarea className='story-title' cols="50" rows="1" onKeyUp={handleTitle} placeholder='Title'></textarea>
            <textarea className='write-story' cols="50" rows="20" onKeyUp={handleKeyUp} placeholder='Story outline' ></textarea>
            {value ? <button className='btn-large' onClick={handleSave} >SAVE</button> : null}
        </div>
    )
}

// TO DO: create a check if it's accessed from the Edit functionality and GET the information from the DB