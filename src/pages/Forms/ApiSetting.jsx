import React from "react";

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
} from "reactstrap";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormEditors = () => {

  //meta title
  document.title = "Form Editors | Mintouge - Vite React Admin & Dashboard Template"

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
                API KEY
              </Label>
              <Input
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                value="UJX893-MDI82K-PMX90H-XDTPQM"
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
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
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
