import React, { useState, useEffect } from 'react';

const Preview = (props) => {

    const { file } = props;
    const [visible, setVisible] = useState(true);

    return (
        <>
            { visible && <div 
                style={{ position: 'relative', width: '200px', height: '200px'}}
            >
                <img src={file} width={200} height={200}/>
                <div 
                    onClick={() => setVisible(false)}
                    style={{ position: 'absolute', right: '5px', top: '0px', fontSize: '24px'}}
                >
                    <i className="mdi mdi-close-circle" aria-hidden="true" />
                </div>
            </div> }
        </>
    );
};

export default Preview;