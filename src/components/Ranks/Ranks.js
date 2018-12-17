import React from 'react'
import './Ranks.css'

const Ranks = ({name, entries}) => {
    return (
        <div>
            <div className='f5 white'>
               {`${name}, your current entry count is...`}
            </div>
            <div className='white f1 '>
                {entries}
            </div>
        </div>
    );
}

export default Ranks;