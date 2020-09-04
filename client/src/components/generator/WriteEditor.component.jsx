import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function WriteEditor(props) {
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const history = useHistory();

    function handleContent(e) {
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
        <div className='write'>
            <textarea required className='title' value={title} onChange={handleTitle} placeholder='Title'></textarea>
            <textarea required className='story' value={value} onChange={handleContent} placeholder='Story outline'></textarea>
            {value && title &&
                <button className='btn' onClick={handleSave} >SAVE</button>
            }
        </div>
    )
}
