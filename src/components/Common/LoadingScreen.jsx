import { Avatar, Box } from "@mui/material";

export const LoadingScreen = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                        "0%": {
                            transform: "rotate(360deg)",
                        },
                        "100%": {
                            transform: "rotate(0deg)",
                        },
                    },
                }}
            >
                <Avatar
                    alt="Versify Labs"
                    src="/static/brand/logo.png"
                    sx={{ width: 100, height: 100, backgroundClip: "transparent" }}
                />
            </Box>
        </Box>
    );
};
