import React from 'react';

const Preview = (props) => {

    const { file } = props;
    return (
        <div className="d-flex flex-row align-items-center gap-3">
            <div style={{ minWidth: "120px", maxWidth: "120px" }} />
            <div>
                <img src={file} style={{ maxWidth: "200px", maxHeight: "80px" }} width="100%" />
            </div>
        </div>
    );
};

export default Preview;