import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Layout from "../components/Layout";

const CreateEvent = () => {
  const [online, setOnline] = useState(false);

  return (
    <Layout>
      <div className="container my-4">
        <h2>Create Event</h2>

        {/* Upload Photo Section */}
        <Form.Group controlId="uploadPhoto" className="mb-4">
          <Form.Label>Upload Photo</Form.Label>
          <div className="upload-photo mb-3">
            <Form.Control type="file" className="d-none" />
            <Button variant="secondary" className="upload-btn">
              Choose Photo
            </Button>
          </div>
        </Form.Group>

        {/* Time & Location Section */}
        <div className="time-location mb-4">
          <Form.Label>Time & Location</Form.Label>

          <div className="d-flex flex-wrap gap-3">
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="DD/MM/YYYY" />
            </Form.Group>

            <Form.Group controlId="timeStart">
              <Form.Label>Time (Start)</Form.Label>
              <Form.Control type="time" placeholder="00:00pm" />
            </Form.Group>

            <Form.Group controlId="timeEnd">
              <Form.Label>Time (End)</Form.Label>
              <Form.Control type="time" placeholder="00:00pm" />
            </Form.Group>
          </div>

          <div className="d-flex align-items-center gap-3 mt-3">
            <Form.Group controlId="location" className="flex-grow-1">
              <Form.Label>Location</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-geo-alt-fill"></i>
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Enter Location" />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="onlineSwitch">
              <Form.Check
                type="switch"
                label="Online"
                checked={online}
                onChange={() => setOnline(!online)}
              />
            </Form.Group>
          </div>

          <Button variant="secondary" className="mt-3">
            Map
          </Button>
        </div>

        {/* Categories Section */}
        <div className="categories mb-4">
          <Form.Group controlId="category">
            <Form.Label>Categories</Form.Label>
            <Form.Select>
              <option>Select Category</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="tags" className="mt-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Add tags" />
          </Form.Group>
        </div>

        {/* Pricing Section */}
        <div className="pricing mb-4">
          <Form.Label>Pricing</Form.Label>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <span>Free</span>
              <Form.Check type="switch" id="free" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>Regular</span>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                className="w-50"
              />
              <Form.Check type="switch" id="regular" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>VIP</span>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                className="w-50"
              />
              <Form.Check type="switch" id="vip" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary">Cancel</Button>
          <Button variant="primary">Continue</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
