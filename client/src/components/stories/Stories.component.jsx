import React from 'react'
import ListStories from './ListStories.component'
import axios from 'axios'
import StoryEdit from './StoryEdit.component'

export default class Stories extends React.Component {
    constructor(props) {
        super(props)
        this.deleteComponent = this.deleteComponent.bind(this)
        this.state = {
            items: [],
            editMode: false,
            editTarget: '',
        }
    }

    async componentDidMount() {
        try {
            const data = await axios.get(`/outlines`)
            this.setState({ items: data.data })
        } catch (err) {
            console.error(err)
        }
    }

    deleteComponent(target) {
        let stateUpdate = this.state.items

        // eslint-disable-next-line array-callback-return
        stateUpdate.map((x, index) => {
            if (x._id === target) {
                stateUpdate.splice(index, 1)
            }
        })

        this.setState({ items: stateUpdate })
    }

    enterEdit = () => {
        this.setState({ editMode: !this.state.editMode })
    }

    render() {
        const currentData = this.state.items
        const renderData = currentData.map(x => {
            return (
                <ListStories
                    key={x._id}
                    id={x._id}
                    title={x.title}
                    content={x.text}
                    time={x.updatedAt}
                    delete={this.deleteComponent}
                    edit={x => this.setState({ editMode: x })}
                    editTarget={x => this.setState({ editTarget: x })}
                />
            )
        })

        return (
            <div className='container'>
                {this.state.editMode ? null :
                    <div className='searchbar'>
                        <p className='fas fa-search'></p>
                        <input type="search" placeholder='search' />
                    </div>
                }
                <div className='stories-container'>
                    {this.state.editMode ?
                        <StoryEdit
                            target={this.state.editTarget}
                            editMode={this.enterEdit}
                        />
                        : renderData
                    }
                </div>
            </div>
        )
    }
}