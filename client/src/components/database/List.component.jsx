import React from 'react'
import axios from 'axios'

function List(props) {
    // list the entries of this DB in a <ul>

    const name = props.name
    const newData = props.data
    const lists = [] // each list item with their DB id

    // eslint-disable-next-line array-callback-return
    Object.keys(newData).map(x => {
        const newnew = newData[x]
        lists.push({ id: newnew._id, name: newnew[name] }) // items to display along with their ids
    })


    async function handleDelete(e) {
        e.preventDefault()
        e.stopPropagation()

        try {
            let target = e.target.id
            await axios.delete(`${props.link}/${target}`)
            props.onDelete(target)

        } catch (err) {
            console.error(err)
        }

    }


    const listItems = lists.map(x => {
        return <li key={x.id} id={x.id} onClick={handleDelete} className='list-items'>{x.name}</li>
    })

    return (
        <ul className='u-list'>
            {listItems}
        </ul>
    )
}

export default List