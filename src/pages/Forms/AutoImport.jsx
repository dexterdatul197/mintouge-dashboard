import React from 'react';

import {
  Form,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Row,
  CardTitle,
  Container,
} from 'reactstrap';

// Form Editor
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

//Import Breadcrumb
import Breadcrumbs from '@components/commons/Breadcrumb';

const FormEditors = () => {

  //meta title
  document.title = "API Setting | Mintouge - Brands Dashboard"
  const [endpoint, setEndpoint] = React.useState("https://mintouge.com/public/products");
  const [code, setCode] = React.useState(
    `// Product Data Model
interface ProductModal {
    brand: string,
    name: string,
    description: string,
    images: string[],
    asset: string,
    productUrl: string,
    productCode: string,
    category: string,
    feature: string,
    price: number,
    currency: string,
    symbol: string,
    priceInUsd: number,
};

async function transform(productUrl) {
    const response = await fetch(productUrl);
    const data = await response.json();

    const products: ProductModal[] = data.map(item => ({
        brand: apiPublicKey,
        name: item.name || "Mintouge Bag Model X",
        description: item.description || "Best Mintouge Bag beloved by everyone",
        images: item.images || ["https://cdn.mintouge.com/bag1.png", "https://cdn.mintouge.com/bag2.png"],
        asset: item.asset || "https://cdn.mintouge.com/bag.gltf",
        productUrl: item.productUrl || "https://mintouge.com/products?productId=11840302",
        productCode: item.productCode || "PD-11840302",
        category: item.category || "bag",
        feature: item.feature || "UK Only",
        price: item.price || "100",
        currency: item.currency || "USD",
        symbol: item.symbol || "$",
        priceInUsd: item.priceInUsd || "100",
    }));

    return products;
}
`
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Auto Importing Products" />
          <Form>
            <div className="mb-4">

              <Label
                htmlFor="horizontal-firstname-Input"
                className="col-form-label"
              >
                Product API
              </Label>
              <Input
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                value={endpoint}
                contentEditable={true}
                onChange={(e) => setEndpoint(e.target.value)}
              />
            </div>

            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Javascript/Typescript code to automatically import products</CardTitle>
                    <p className="card-title-desc">
                      Below is the code to import products automatically in background
                    </p>
                    <Editor
                      value={code}
                      onValueChange={code => setCode(code)}
                      highlight={code => highlight(code, languages.js)}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormEditors;
