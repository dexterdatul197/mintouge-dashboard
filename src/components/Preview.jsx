import React, { useState, useEffect } from 'react';

const Preview = (props) => {

    const { file } = props;
    const [imgData, setImgData] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
       if(file!==undefined && file!==null && file.size>0)
       {
          setImgData(URL.createObjectURL(file));
          setVisible(true);
       }
    }, [file]);

    return (
        <>
            { visible && <div 
                style={{ position: 'relative', width: '200px', height: '200px'}}
            >
                <img src={imgData} width={200} height={200}/>
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