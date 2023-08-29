const LoadingScreen = ({ styles = { width: "100vh" } }) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={styles}>
            <div className="spinner-border text-primary" role="status" />
        </div>
    );
};

export default LoadingScreen;