import './Popup.css'
import React, { useContext } from 'react'
import { popupContext } from '../App'


function Popup() {
    const { popup, setPopup } = useContext(popupContext)
    if(popup.type == "success") {
        return (
            <div className={ popup.state ? "popup-parent show" : "popup-parent hide"  }>
                <h2>Data Added Successfuly</h2>
                <h2 className='close-btn' onClick={() => { setPopup(false); console.log(popup) }}>x</h2>
            </div>
        )
    } else if (popup.type == "failed") {
        return (
            <div className={ popup.state ? "err popup-parent show" : "err popup-parent hide"  }>
                <h2>Unable to Add Data</h2>
                <h2 className='close-btn' onClick={() => { setPopup(false); console.log(popup) }}>x</h2>
            </div>
        )
    }
}

export default Popup