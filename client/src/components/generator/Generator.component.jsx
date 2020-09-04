import React, { Component } from 'react'
import axios from 'axios'
import Story from './Story.component'
import WriteEditor from './WriteEditor.component'

export default class Generator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            populate: false,
            writeStoryButton: false,
            write: false,
            genBtnClicked: false,
        }
    }

    handleClick = async e => {
        try {
            e.preventDefault()
            e.stopPropagation()

            const res = await axios.get('/generate')
            this.setState({ data: res.data, populate: true, writeStoryButton: true, write: false, genBtnClicked: true })
        } catch (err) {
            console.error(err)
        }
    }

    writeStory = e => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ write: true, writeStoryButton: false })
    }


    render() {
        return (
            <div className='genBody container' >
                <button className="button-main" onClick={this.handleClick}>{this.state.genBtnClicked ? 'REROLL' : 'GENERATE'}</button>
                <br />
                <div className='cards-container'>
                    {/* generator story card */}
                    <div className='gen-card'>
                        {this.state.populate &&
                            <Story
                                char1={this.state.data.characters.char1}
                                char2={this.state.data.characters.char2}
                                char3={this.state.data.characters.char3}
                                char4={this.state.data.characters.char4}
                                location={this.state.data.location}
                                theme={this.state.data.theme}
                                world={this.state.data.world}
                            />

                        }
                        {
                            this.state.writeStoryButton &&
                            <button className='btn' onClick={this.writeStory} data={this.state.data} >OUTLINE STORY</button>

                        }
                    </div>
                    {/* write editor card */}
                    {
                        this.state.write ?
                            <WriteEditor
                                storyData={this.state.data}
                            />
                            : null
                    }
                </div>
            </div>
        )
    }
}