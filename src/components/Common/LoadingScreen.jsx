const LoadingScreen = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-24">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingScreen;