import React, { useRef } from 'react';
import {
    Button,
    Label,
    Input,
    FormFeedback,
} from 'reactstrap';

const FileContent = (props) => {
    const { onFileUpload, additionalText } = props;

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
            <Button onClick={handleUpload} color="primary" className="btn ">
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
    const { isOptional, name, label, formik, disabled, type = "text" } = props;
    const isFile = type === "file";

    if (!label) return <InputContent {...props} />;

    return (
        <div className="d-flex flex-row align-items-center gap-3">
            <Label style={{ minWidth: "120px" }} htmlFor={name}>{label} {isOptional ? "" : " *"}</Label>
            <>
                {isFile
                    ? <FileContent {...props} />
                    : <InputContent {...props} />
                }
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