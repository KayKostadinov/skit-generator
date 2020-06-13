import React from 'react';

export default function Story(props) {


    return (
        <div className="story">
            <p>{props.char1.name} is a {props.char1.occupation} and wants to {props.char1.desire}</p>
            <p>{props.char2.name} is a {props.char2.occupation} and wants to {props.char2.desire}</p>
            {props.char3.name ? <p>{props.char3.name} is a {props.char3.occupation} and wants to {props.char3.desire}</p> : null}
            {props.char4.name ? <p>{props.char4.name} is a {props.char4.occupation} and wants to {props.char4.desire}</p> : null}
            <p>The story takes place in a {props.world} world, in a {props.location}</p>
            <p>The main theme of the joke is "{props.theme}"</p>
        </div>
    )
}