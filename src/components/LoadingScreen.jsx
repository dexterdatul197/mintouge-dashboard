const LoadingScreen = ({ styles = { height: "100vh" } }) => {
    return (
        <div id="loading-screen" className="d-flex justify-content-center align-items-center" style={styles}>
            <div className="spinner-border text-primary" role="status" />
        </div>
    );
};

export default LoadingScreen;