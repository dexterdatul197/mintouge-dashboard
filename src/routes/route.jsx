import React from 'react';
import { Navigate } from 'react-router-dom';
import { Storage, GetStorageObject } from '@/utils';

const AuthMiddleware = (props) => {
    const optedUser = GetStorageObject(Storage.OptedUser);

    if (!optedUser?.token) {
        return (
            <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
        );
    } else if (optedUser && !optedUser.token) {
        return (
            <Navigate to={{ pathname: "/verification-review", state: { from: props.location } }} />
        );
    }

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthMiddleware;
