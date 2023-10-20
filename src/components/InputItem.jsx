import React, { useRef, useMemo } from 'react';
import {
    Button,
    Label,
    Input,
    FormFeedback,
} from 'reactstrap';

const FileContent = (props) => {
    const { onFileUpload, additionalText, startAdornment } = props;

    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        onFileUpload && onFileUpload(selectedFile);
    }

    const handleUpload = () => {
        inputRef.current.click();
    }

    return (
        <>
            {startAdornment}
            <Button onClick={handleUpload} color="primary" className="btn" style={{ minWidth: '120px' }}>
                Upload Cover
            </Button>
            <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileChange}
            />
            <div>{additionalText}</div>
        </>
    )
};

const InputContent = (props) => {
    const { name, label, formik, rows, disabled, type = "text" } = props;
    return (
        <Input
            id={name}
            name={name}
            type={type}
            disabled={disabled}
            className="form-control"
            placeholder={label}
            rows={rows || 1}
            checked={formik.values[name] || false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name] || ""}
            invalid={
                formik.touched[name] && formik.errors[name]
                    ? true
                    : false
            }
        >
            {props.children}
        </Input>
    )
};

const InputItem = (props) => {
    const { isOptional, name, label, formik, disabled, type = "text", startAdornment } = props;
    const isFile = type === "file";

    if (!label) return <InputContent {...props} />;

    return (
        <div className="d-flex flex-row align-items-center gap-3">
            <Label style={{ minWidth: "120px", maxWidth: "120px" }} htmlFor={name}>{label} {isOptional ? "" : " *"}</Label>
            <>
                {isFile
                    ? <FileContent {...props} />
                    : <InputContent {...props} />
                }
                {startAdornment && startAdornment}
            </>
            {formik.touched[name] && formik.errors[name] ? (
                <FormFeedback type="invalid">
                    {formik.errors[name]}
                </FormFeedback>
            ) : null}
        </div>
    )
};

export default InputItem;