import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function StoryEdit(props) {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [fetchAgain, setFetchAgain] = useState(false)

    useEffect(() => {
        fetchData();
    }, [fetchAgain])

    async function fetchData() {
        try {
            const data = await axios.get(`/outlines/${props.target}`)
            setText(data.data.text)
            setTitle(data.data.title)
        } catch (err) {
            console.error(err)
        }
    }

    function handleChangeText(e) {
        setText(e.target.value)
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value)
    }

    async function handleSave(e) {
        e.preventDefault()
        e.stopPropagation()
        try {
            const sendData = { title: title, text: text }
            await axios.post(`/outlines/${props.target}`, sendData)
            props.editMode();
        } catch (err) {
            console.error(err)
        }

    }
    function handleCancel(e) {
        e.preventDefault()
        e.stopPropagation()
        props.editMode()
    }

    return (
        <div className='editor-container'>
            <div className='editor-2'>
                <textarea className='story-title' cols="50" rows="1" onChange={handleChangeTitle} defaultValue={title}></textarea>
                <textarea className='write-story' cols="50" rows="20" onChange={handleChangeText} defaultValue={text} ></textarea>
                <div className='btn-container'>
                    <button className='btn-editor update' onClick={handleSave} >UPDATE</button>
                    <button className='btn-editor cancel' onClick={handleCancel}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}
