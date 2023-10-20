import React, { useEffect, useState } from 'react';
import {
    Card,
    Label,
    Modal,
    UncontrolledTooltip,
} from 'reactstrap';
import Switch from 'react-switch';

import { useProducts } from '@/store/productStore';
import DeletableChip from '@/components/DeletableChip';

const ProductItem = (props) => {
    const { name, label, tooltip, formik } = props;
    const [selectedProducts, setSelectProducts] = useState(formik.values[name] || []);
    const [openProductModal, showProductModal] = useState(false);
    const { fetchProducts, products } = useProducts();

    useEffect(() => {
        !products.length && fetchProducts();
    }, []);

    useEffect(() => {
        selectProducts(formik.values[name]);
    }, [formik.values[name]]);

    const selectProducts = (_products) => {
        setSelectProducts(_products);
        formik.setFieldValue(name, _products);
    }

    const handleAdd = async (event) => {
        event.preventDefault();
        showProductModal(true);
    }

    const handleCancel = () => {
        selectProducts(() => formik.values[name] || []);
        showProductModal(false);
    };

    const handleConfirm = () => {
        formik.setFieldValue(name, selectedProducts);
        showProductModal(false);
    }

    const getProductName = (productId) => {
        const _products = products.filter(_product => _product.id === productId);
        if (_products.length > 0) {
            return _products[0]?.name;
        }

        return null;
    }

    const handleDeleteChip = (productId) => {
        const _selectedProducts = selectedProducts.filter(_productId => _productId !== productId);
        formik.setFieldValue(name, _selectedProducts);
        selectProducts(_selectedProducts);
    }

    return (
        <>
            <div className="d-flex flex-row align-items-center gap-3">
                <Label id="label" style={{ minWidth: "120px", maxWidth: "120px" }} htmlFor={name}>{label}</Label>
                <Card
                    id={name}
                    outline
                    color="primary"
                    className="border w-100 p-2 d-flex flex-row flex-wrap gap-1 mb-0"
                    onClick={handleAdd}
                    style={{ minHeight: "50px" }}
                >
                    {products.length > 0 && Array.isArray(selectedProducts) && selectedProducts.map(_productId => (
                        <DeletableChip
                            key={_productId}
                            label={getProductName(_productId)}
                            onDelete={(event) => { event.stopPropagation(); handleDeleteChip(_productId); }}
                        />
                    ))}
                </Card>
                <UncontrolledTooltip
                    placement="top"
                    target={name}
                    className="w-100"
                >
                    {tooltip}
                    You can choose to match the reward to a specific product.
                    Leaving the field blank will make the reward available on all products.
                </UncontrolledTooltip>
            </div >

            <Modal
                className="modal-dialog-centered"
                isOpen={openProductModal}
                toggle={() => showProductModal(false)}
            >
                <div className="modal-header" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    Select Products
                </div>
                <div className="modal-body" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    <table className="table align-middle table-nowrap mb-0">
                        <thead>
                            <tr style={{ borderColor: "lightgray" }}>
                                <th scope="col">
                                    Product
                                </th>
                                <th scope="col">
                                    Active
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((row, index) => (
                                <tr
                                    key={row.id}
                                    style={(index > products.length - 2) ? {} : { borderColor: "lightgray" }}
                                >
                                    <td className="d-flex">
                                        <img
                                            src={row.images[0]}
                                            loading="lazy"
                                            height="50px"
                                            alt="Product Image"
                                            className="avatar-sm d-block rounded me-4 object-fit-cover"
                                            onError={(e) => {
                                                e.onerror = null;
                                                e.target.src = "https://cdn.vaultik.com/brand_dashboard/no_image.jpeg";
                                            }}
                                        />
                                        <span className="table-element underline text-primary">
                                            {row.name}
                                        </span>
                                    </td>
                                    <td>
                                        <Switch
                                            uncheckedIcon={<div />}
                                            checkedIcon={<div />}
                                            onColor="#34c38f"
                                            onChange={() => {
                                                if (!selectedProducts.includes(row.id)) {
                                                    selectProducts([...selectedProducts, row.id]);
                                                } else {
                                                    selectProducts(selectedProducts.filter(_productId => _productId !== row.id));
                                                }
                                            }}
                                            checked={selectedProducts.includes(row.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleConfirm}
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </>
    )
};

export default ProductItem;