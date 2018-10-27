import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="ma4 mt0">
            <p className='f3'>
                {'Brain will detect your faces in your picture. Try it!'}
            </p>
            <div className='align-center'>
                <div className='form align-center shadow-5 pa4 br3'>
                    <input type='text' className='pa2 w-70 f4 center' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
