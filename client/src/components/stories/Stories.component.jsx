import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Editor from './Editor.component'

const Stories = () => {
    // store database response
    const [storiesData, setStories] = useState();

    useEffect(() => {
        //reach DB for data on load
        (async () => {
            const res = await axios.get(`/outlines`)
            setStories(res.data)
        })();
    }, [])

    // handles search component
    const [search, setSearch] = useState('')

    // search both title and content in the stories list
    const searchResult = story => {
        if (story.title.toLowerCase().includes(search.toLowerCase()) || story.text.toLowerCase().includes(search.toLowerCase())) {
            return <li
                key={story._id}
                onClick={e => expandStory(e, story)}
            >
                <h4>{story.title}</h4>
                <p>{`${story.text.slice(0, 50)}...`}</p>
                <i className="fas fa-chevron-circle-right expand" ></i>
            </li>
        }
    }

    const [showStory, setShow] = useState({ show: false, })

    // display the selected story in full
    const expandStory = (e, story) => {
        e.preventDefault()
        setShow({
            show: true,
            story: story
        })
    }

    return (
        <div className='grid'>
            <section className='story-list'>
                <input
                    className='search'
                    placeholder='find'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ul>
                    {storiesData && storiesData.map(story =>
                        search ?
                            searchResult(story)
                            :
                            <li
                                key={story._id}
                                onClick={e => expandStory(e, story)}
                            >
                                <h4>{story.title}</h4>
                                <p>{`${story.text.slice(0, 50)}...`}</p>
                                <i className="fas fa-chevron-circle-right expand" ></i>
                            </li>
                    )}
                </ul>
            </section>
            {showStory.show && <Editor story={showStory.story} storiesData={storiesData} setStories={setStories} setShow={setShow} />}
        </div>
    )
}

export default Stories
