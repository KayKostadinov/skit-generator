import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Stories = (props) => {
    // store database response
    const [storiesData, setStories] = useState({});

    useEffect(() => {
        //reach DB for data on load
        (async () => {
            const res = await axios.get(`/outlines`)
            setStories(res)
        })();

    }, [])

    // handles search component
    const [search, setSearch] = useState('')

    // search both title and content in the stories list
    const searchResult = story => {
        if (story.title.toLowerCase().includes(search.toLowerCase()) || story.text.toLowerCase().includes(search.toLowerCase())) {
            return <li
                key={story._id}
                id={story._id}
            >
                <h4>{story.title}</h4>
                <p>{`${story.text.slice(0, 50)}...`}</p>
            </li>
        }
    }

    const expandStory = e => {
        e.preventDefault()

    }

    return (
        <div>
            <section className='storyList'>
                <input
                    className='search'
                    placeholder='find'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ul>
                    {storiesData.data && storiesData.data.map(story =>
                        search ?
                            searchResult(story)
                            :
                            <li
                                key={story._id}
                                id={story._id}
                                onClick={e => expandStory(e)}
                            >
                                <h4>{story.title}</h4>
                                <p>{`${story.text.slice(0, 50)}...`}</p>
                                <i className="fas fa-chevron-circle-right expand" ></i>
                            </li>
                    )}
                </ul>
            </section>
        </div>
    )
}

export default Stories
