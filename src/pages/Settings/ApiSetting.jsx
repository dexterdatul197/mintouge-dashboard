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
import useToast from '@/utils/useToast';
import Breadcrumbs from '@components/Breadcrumb';
import { Storage, GetStorageObject } from '@/utils';
import * as Template from './template';

const FormEditors = () => {
  document.title = "API Setting | Vaultik - Brands Dashboard";

  const showToast = useToast();
  const optedUser = GetStorageObject(Storage.OptedUser);
  const code = Template.GetProductsCode;

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to Clipboard");
    } catch (error) {
      showToast(`Copy to clipboard failed: ${error}`, "error");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="API Setting" />
          <Form>
            <div className="mb-4">

              <Label
                htmlFor="horizontal-firstname-Input"
                className="col-form-label"
              >
                API Secret Key
              </Label>
              <Input
                type="text"
                className="form-control cursor-pointer"
                id="horizontal-firstname-Input"
                value={optedUser.apiSecretKey}
                contentEditable={false}
                readOnly
                onClick={() => handleCopy(optedUser.apiSecretKey)}
              />
            </div>

            <div className="mb-4">
              <Label
                htmlFor="horizontal-firstname-Input"
                className="col-form-label"
              >
                API Public Key
              </Label>
              <Input
                type="text"
                className="form-control cursor-pointer"
                id="horizontal-firstname-Input"
                value={optedUser.apiPublicKey}
                contentEditable={false}
                readOnly
                onClick={() => handleCopy(optedUser.apiPublicKey)}
              />
            </div>

            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Api Key Code Example</CardTitle>
                    <p className="card-title-desc">
                      Below is the code of how to use Api Key to use Vaultik SDK
                    </p>

                    <Editor
                      value={code}
                      readOnly
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
