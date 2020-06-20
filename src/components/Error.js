import React from 'react'

const Error = (props) => {
    return(
        <div className="center red">
            <img src="https://media.giphy.com/media/VwoJkTfZAUBSU/giphy.gif" alt="myGif" width="200"/>
            <h2>{props.mensaje}</h2>
        </div>
    )
}

export default Error