import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Modal,
  FormFeedback,
} from 'reactstrap';
import Select from 'react-select';

import { CategoryApi, ProductApi } from '@/api';
import Breadcrumbs from '@components/Breadcrumb';
import useToast from '@/utils/useToast';

const TwoColumnForm = (props) => (
  <Card>
    <CardBody>
      <Form onSubmit={(e) => {
        e.preventDefault();
        props.formik.handleSubmit();
        return false;
      }}>
        <Row>
          {props.children}
        </Row>
        <InnerFooter formik={props.formik} />
      </Form>
    </CardBody>
  </Card>
);

const InputItem = (props) => (
  <div className="mb-3">
    <Label htmlFor={props.name}>{props.label}</Label>
    <Input
      id={props.name}
      name={props.name}
      type={props.isMultiline ? "textarea" : "text"}
      className="form-control"
      placeholder={props.label}
      rows={props.rows || 1}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      value={props.formik.values[props.name] || ""}
      invalid={
        props.formik.touched[props.name] && props.formik.errors[props.name]
          ? true
          : false
      }
    />

    {props.formik.touched[props.name] && props.formik.errors[props.name] ? (
      <FormFeedback type="invalid">
        {props.formik.errors[props.name]}
      </FormFeedback>
    ) : null}
  </div>
);

const InnerFooter = (props) => (
  <>
    <ImageItem formik={props.formik} />
    <div className="d-flex justify-content-end gap-2">
      <Button type="submit" color="primary" className="btn ">
        Add Product
      </Button>
      <Button type="button" color="secondary">
        Clear
      </Button>
    </div>
  </>
);

const ImageItem = (props) => {
  const { formik } = props;
  const handleImageChange = (e, key) => {
    formik.setFieldValue("image", formik.values.image.map((_v, index) => (
      index !== key ? formik.values.image[index] : e.target.value
    )));
  };

  const handleAddImage = () => {
    formik.setFieldValue("image", [...formik.values.image, ""]);
  }

  // Function for Remove Input Fields
  const handleRemoveImage = (idx) => {
    formik.setFieldValue("image", formik.values.image.filter((_v, index) => index !== idx));
  }

  return (
    <>
      <Label>Image URLs</Label>
      <div className="inner-repeater mb-4">
        <div className="inner form-group mb-0 row">
          <div
            className="inner col-lg-12 ml-md-auto"
            id="repeater"
          >
            {formik.values.image.map((imageUrl, key) => (
              <div
                key={key}
                id={"nested" + key}
                className="mb-3 row align-items-base"
              >
                <Col md="10">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Image URL.."
                    onChange={(e) => handleImageChange(e, key)}
                    value={imageUrl || ""}
                    invalid={!imageUrl}
                  />
                  {!imageUrl && (
                    <FormFeedback type="invalid">
                      Image URL should not be empty
                    </FormFeedback>
                  )}
                </Col>
                <Col md="2">
                  <div className="mt-2 mt-md-0 d-grid">
                    <Button color="primary" className="inner" onClick={() => { handleRemoveImage(key) }} block>
                      Delete
                    </Button>
                  </div>
                </Col>
              </div>
            ))}
          </div>
        </div>
        <Row className="justify-content-end">
          <Col lg="12">
            <Button color="success" className="inner" onClick={handleAddImage}>
              Add Image
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

const AddProduct = () => {
  document.title = "Add Product | Mintouge - Brands Dashboard";

  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [openCategoryModal, showCategoryModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await CategoryApi.getCategorys();
        setCategories(categoryData.data);
      } catch (err) {
        showToast(err.toString(), "error");
      }
    };

    fetchCategories();
  }, []);

  const productForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      brand: '',
      productKey: '',
      name: '',
      price: 0,
      discount: 0,
      offerEnd: '',
      madeAt: '',
      rating: 5,
      categoryId: undefined,
      tags: '',
      variation: [],
      image: [""],
      qrcode: '',
      productUrl: '',
      shortDescription: '',
      fullDescription: ''
    },

    validationSchema: yup.object({
      name: yup.string().required('Name should not be empty'),
      price: yup.number().min(0).required('Price should be greater than 0'),
      categoryId: yup.object().required('Please specify category'),
      shortDescription: yup.string().optional('Pleases provide short description'),
      fullDescription: yup.string().required('Please provide description'),
      productUrl: yup.string().required('Please provide the product url in your eCommerce site.'),
      image: yup.array().min(1).required('Please type image urls.'),
      tags: yup.string().optional('Tags should be string'),
      // madeAt: yup.date().required('Made At should not be empty'),
      // discount: yup.number().optional('Invalid discount value'),
      // offerEnd: yup.date().optional('Invalid offerEnd date'),
      // rating: yup.number().optional('Invalid rating'),
      // variation: yup.array().optional('Invalid variation'),
    }),

    onSubmit: async (values) => {
      try {
        const _values = { ...values, categoryId: values.categoryId.id };
        console.log(_values);
        const response = await ProductApi.addProduct(_values);
      } catch (err) {
        showToast(err.toString(), "error");
      }
    },
  });

  const SelectItem = (props) => (
    <div className="mb-3">
      <Label className="control-label">{props.label}</Label>
      <div className="d-flex">
        <Select
          type="select"
          id={props.name}
          name={props.name}
          className="w-100"
          classNamePrefix="select2-selection"
          placeholder="Choose..."
          title={props.label}
          onChange={(newValue) => props.formik.setFieldValue(props.name, newValue)}
          onBlur={props.formik.handleBlur}
          options={categories}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          value={props.formik.values[props.name] || -1}
          error={props.formik.errors[props.name]}
        />
        <Button type="button" className="ms-2" color="secondary" onClick={() => showCategoryModal(true)}>
          Add
        </Button>
      </div>
      {props.formik.errors[props.name] && (
        <Alert color="danger" style={{ marginTop: "13px" }}>
          {props.formik.errors[props.name]}
        </Alert>
      )}

    </div>
  );

  const handleAddCategory = async () => {
    try {
      const categoryId = await CategoryApi.addCategory(newCategory);
      setCategories((_categories) => [..._categories, categoryId]);

      setNewCategory("");
      showCategoryModal(false);
    } catch (err) {
      showToast(err.toString(), "error");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Product" />
          <TwoColumnForm formik={productForm}>
            <Col sm="6">
              <InputItem name="name" label="Product Name" formik={productForm} />
              <InputItem name="productUrl" label="Product Url" formik={productForm} />
              <InputItem name="price" label="Price" formik={productForm} />
              <InputItem name="fullDescription" label="Product Description" formik={productForm} isMultiline={"true"} rows={5} />
              <InputItem name="shortDescription" label="Short Description" formik={productForm} isMultiline={"true"} rows={2} />
            </Col>

            <Col sm="6">
              <SelectItem name="categoryId" label="Category" formik={productForm} />
              <InputItem name="tags" label="Tags" formik={productForm} />
            </Col>
          </TwoColumnForm>
        </Container>

        <Modal
          className="modal-dialog-centered"
          isOpen={openCategoryModal}
          toggle={() => showCategoryModal(state => !state)}
        >
          <div className="modal-header">
            Add a new Category
          </div>
          <div className="modal-body">
            <Label htmlFor="newCategory">New Category</Label>
            <Input
              id="newCategory"
              name="newCategory"
              className="form-control"
              placeholder="Category Name.."
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => showCategoryModal(state => !state)}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </Modal>

      </div >
    </React.Fragment >
  )
}

export default AddProduct
