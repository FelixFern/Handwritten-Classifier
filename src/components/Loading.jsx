import React from 'react'
import './Loading.css'

function Loading() {
    return (
        <div className='loading-parent'>
            <div className='loading-content'>
                <img src='./loading.svg'></img>
            </div>
        </div>
    )
}

export default Loading