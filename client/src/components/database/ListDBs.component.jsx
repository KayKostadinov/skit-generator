import React from 'react'
import axios from 'axios'
import List from './List.component'


export default class ListDBs extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
        this.state = {
            dataList: {},
            dbName: '',
        }
    }

    delete(item) {
        let stateUpdate = this.state.dataList

        // eslint-disable-next-line array-callback-return
        stateUpdate.map((x, index) => {
            if (x._id === item) {
                stateUpdate.splice(index, 1)
            }
        })

        this.setState({ dataList: stateUpdate })

    }

    componentDidMount() {
        this.setState({
            dbName: this.props.location.pathname.slice(1, -1)
        })
        axios.get(`${this.props.location.pathname}`)
            .then(res => {
                this.setState({ dataList: res.data })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='listDbs container' >
                <h2>{this.props.location.pathname.slice(1).toUpperCase()}</h2>
                <List
                    data={this.state.dataList}
                    name={this.state.dbName}
                    link={this.props.location.pathname}
                    onDelete={this.delete}
                />
            </div>
        )
    }
}
