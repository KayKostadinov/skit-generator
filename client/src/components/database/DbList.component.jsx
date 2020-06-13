import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class DbList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: [],
            desire: [],
            occupation: [],
            location: [],
            world: [],
            theme: [],
        }
        this.ref = React.createRef();
    }

    onKeyUp = (e) => {
        const content = e.target.value.split(', ');
        const db = e.target.name.slice(0, -1);
        this.setState({
            [db]: content
        })

    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            // e.preventDefault();
            // e.stopPropagation();
            this.handleClick();

        }
    }

    handleClick = (event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const db = this.props.listItem.slice(0, -1);
        const addHere = {
            [db]: this.state[db]
        }
        axios.post(`/${this.props.listItem}/add`, addHere);


        this.ref.current.value = "DB updated!";

        setTimeout(() => {
            this.ref.current.value = "";

        }, 500)


    }

    render() {
        return (
            <form type='submit' className='db-list' >
                <h3>{this.props.listItem}</h3>
                <textarea
                    ref={this.ref}
                    name={this.props.listItem}
                    onKeyUp={this.onKeyUp}
                    cols="40" rows="2"
                    placeholder='Insert coma-separated values'
                    onKeyPress={this.onKeyPress}
                >
                </textarea>
                <div className='links'>
                    <button className='link' type='submit' onClick={this.handleClick} >ADD TO DB</button>
                    <Link className='link' to={`/${this.props.listItem}`}>FULL LIST</Link>
                </div>
            </form>
        )
    }
}