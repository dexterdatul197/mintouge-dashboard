import React from 'react';
import { Badge } from 'reactstrap';

const DeletableChip = ({ label, onDelete }) => {
    return (
        <Badge color="secondary" pill
            style={{
                display: "flex",
                padding: "8px 15px",
                gap: "5px",
                alignItems: "center",
                fontSize: 12,
                maxHeight: "30px",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <span>{label}</span>
            <button type="button" className="btn-close btn-close-white" onClick={onDelete} />
        </Badge>
    );
};

export default DeletableChip;
