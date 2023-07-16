import React from 'react';

const ImageSlider = props => {
    const { images } = props
    return (
        <>
            <div className="d-flex gap-2"
                style={{
                    WebkitUserSelect: "none",
                    overflowX: "scroll",
                }}
            >
                {images.map(image => (
                    <img key={image} style={{ width: "180px", objectFit: "contain", border: "1px solid black" }} src={image} width={'100%'} height={'100%'} alt="product-image" />

                ))}
            </div>
        </>
    );
};

export default ImageSlider;
