const LoadingScreen = () => {
    return (
        <div className="d-flex ">
            <div id="status">
                <div className="spinner-chase">
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;