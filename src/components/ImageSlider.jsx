import React from 'react';

const imageStyle = { width: "180px", objectFit: "contain", border: "1px solid black" };
const ImageSlider = props => {
    const { images, onRemove } = props;
    return (
        <>
            {images && images.length > 0 && <div className="d-flex gap-2"
                style={{
                    WebkitUserSelect: "none",
                    overflowX: "auto",
                }}
            >
                {images.map((image, index) => (
                    <div key={image} className="position-relative">
                        <button
                            type="button"
                            style={{ top: 10, right: 10 }}
                            className="btn-close position-absolute bg-light"
                            onClick={() => props.onRemove && onRemove(index)}
                        />
                        <img
                            src={image}
                            alt="product-image"
                            style={imageStyle}
                        />
                    </div>
                ))}
            </div>}
        </>
    );
};

export default ImageSlider;
