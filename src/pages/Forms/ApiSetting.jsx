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
import Breadcrumbs from '@components/Common/Breadcrumb';

const FormEditors = () => {

  //meta title
  document.title = "API Setting | Mintouge - Brands Dashboard"
  const [code, setCode] = React.useState(
`// How to use Private API Key
try {
  const response = await fetch("https://mintouge.com/auth", {
    method: "POST",
    header: {
      authorization: \`Basic \${apiPrivateKey}\`
    }
  });

  const token = await response.json();

  const gas_fee = await fetch("https://mintouge.com/estimate-gasfee", {
    method: "POST",
    body: {
      network: "Polygon",
      token: "MATIC"
    }
    header: {
      authorization: \`Bearer \${token}\`
    }
  });
} catch (error) {
  console.log(error);
  throw error;
}

// How to use Public API Key
// Please insert the following code into index.html
<script 
  type="text/javascript" 
  src="https://cdn-dev.mintouge.com/js/mini-web.js" 
  id=\`\${apiPublicKey}\`>
</script>
`
  );

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
                Private Api Key
              </Label>
              <Input
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                value="UJX893-MDI82K-PMX90H-XDTPQM"
                contentEditable={false}
              />
            </div>

            <div className="mb-4">

              <Label
                htmlFor="horizontal-firstname-Input"
                className="col-form-label"
              >
                Public Api Key
              </Label>
              <Input
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                value="PQMXDT-90HPMX-I82MDK-JX8U93"
                contentEditable={false}
              />
            </div>

            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Api Key Code Example</CardTitle>
                    <p className="card-title-desc">
                      Below is the code of how to use Api Key to use Mintouge SDK
                    </p>

                    <Form method="post">
                      <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => highlight(code,  languages.js)}
                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 12,
                        }}
                      />
                    </Form>
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
