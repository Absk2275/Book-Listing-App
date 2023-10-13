import React from 'react'
import ReactDom from 'react-dom'

import { GiCancel} from "react-icons/gi";
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'white',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  borderRadius:5
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 100
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} >
        <div className='fs-2 cartView text-danger bg-white' style={{ marginLeft: "95%", marginTop: "15px", border:"none" }} onClick={onClose}> <GiCancel/> </div>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}