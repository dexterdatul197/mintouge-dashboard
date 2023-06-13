import React from 'react';
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';

function withRouter(Component) {
    return Component;
}

export default withRouter;