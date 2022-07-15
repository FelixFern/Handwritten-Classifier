import React from 'react'
import '../App.css'

function Grid({val}) {
    return (
        <div className='grid' style={{backgroundColor: `rgb(${val}, ${val}, ${val})`}}></div>
    )
}

export default Grid