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

            await axios.post(`/outlines/add`, data)
            history.push('/outlines')
        } catch (err) {
            console.error(err)
        }

    }


    return (
        <div className='editor'>
            <textarea required className='story-title' cols="50" rows="1" onKeyUp={handleTitle} placeholder='Title'></textarea>
            <textarea required className='write-story' cols="50" rows="20" onKeyUp={handleKeyUp} placeholder='Story outline' ></textarea>
            {value ? <button className='btn-large' onClick={handleSave} >SAVE</button> : null}
        </div>
    )
}
