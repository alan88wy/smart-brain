import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
    return (
        <div className='align-center ma0'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='It will be display here' src={imageUrl} width='500px' height='auto'></img>
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div >
    )
}

export default FaceRecognition;