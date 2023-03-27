import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
// React hook form

import Logo from "../../assets/images/my-store.png";
import AddProduct from "../../assets/images/Add tasks.gif";
export default function AddProducts() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

    const navigate=useNavigate();


  const [productType, setProductType] = useState("");
  const [productAttributes, setProductAttributes] = useState({});

  const handleProductTypeChange = (event) => {
    const selectedOption = event.target.value;

    setProductType(selectedOption);

    if (selectedOption === "DVD") {
      setProductAttributes({ size: "" });
    } else if (selectedOption === "Book") {
      setProductAttributes({ weight: "" });
    } else if (selectedOption === "Furniture") {
      setProductAttributes({
        height: "",
        width: "",
        length: "",
      });
    }
  };

  const onSubmit = (data) => {
    const productData = {
      sku: data.sku,
      name: data.name,
      price: data.price,
      category: data.category,
      attributes: productAttributes,
    };
  
    fetch("https://scandiweb-elkoumey.000webhostapp.com/api/v1/add", {
      method: "POST",
      mode: "cors",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        setProductType("");
        setProductAttributes({});
        navigate('/')
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the product.");
      });
  
    console.log(productData);
  };
  

  return (
    <>
      <header>
        <nav className="navbar  navbar-light" id="neubar">
          <div className="container">
            <span className="navbar-brand">
              <img src={Logo} height="50" alt="the logo" />
            </span>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}

            <div className="d-flex" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto flex-row">
                <li className="nav-item" onClick={handleSubmit(onSubmit)}>
                  <button className="btn border border-0 nav-link mx-2 active p-1">
                    Save
                  </button>
                </li>
                <Link to="/" className="nav-item">
                  <li className="nav-item">
                    <button className="nav-link mx-2 active p-1">cancel</button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Form id="product_form" onSubmit={handleSubmit(onSubmit)} className="p-5 mb-5" autoComplete="off">
              <h3>Product Form</h3>
              <Form.Group controlId="sku">
                <Form.Label>SKU:*</Form.Label>
                <Form.Control
                  {...register("sku", {
                    required: true,
                    pattern: /^(SKU[A-Za-z]*\d{3})$/,
                  })}
                  type="text"
                  name="sku"
                />
                {errors?.sku?.type === "required" && (
                  <p className="text-danger">This field is required</p>
                )}
                {errors?.sku?.type === "pattern" && (
                  <p className="text-danger">SKU Not Valied</p>
                )}
                <Form.Text className="text-muted">
                  SKU must be a unique and contain at first (SKU) , name and
                  three numbers just EX: <span className="fw-bold">SKUABC123</span>
                  .
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>Name:*</Form.Label>
                <Form.Control
                  {...register("name", {
                    required: true,
                    pattern: /^[A-Za-z0-9]/,
                  })}
                  type="text"
                  name="name"
                />
                {errors?.name?.type === "required" && (
                  <p className="text-danger">This field is required</p>
                )}
                {errors?.name?.type === "pattern" && (
                  <p className="text-danger">
                    Name must be not Start with space
                  </p>
                )}
                <Form.Text className="text-muted">
                Name must be just letters without numbers EX:{" "}
                  <span className="fw-bold">DVD CD OR dvd cd</span>.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price:*</Form.Label>
                <Form.Control
                  {...register("price", {
                    required: true,
                    pattern: /^[+]?([0-9]*[.])?[0-9]+$/,
                  })}
                  type="text"
                  name="price"
                />

                {errors?.price?.type === "required" && (
                  <p className="text-danger">This field is required</p>
                )}

                {errors?.price?.type === "pattern" && (
                  <p className="text-danger">
                    offcurse You can't put a negative numbers in the price Or Letters
                  </p>
                )}
              </Form.Group>

              <Form.Group controlId="productType">
                <Form.Label>Product Type:*</Form.Label>
                <Form.Control
                  as="select"
                  {...register("category")}
                  onChange={handleProductTypeChange}
                >
                  <option value="">Type Switcher</option>
                  <option value="DVD">DVD</option>
                  <option value="Book">Book</option>
                  <option value="Furniture">Furniture</option>
                </Form.Control>
              </Form.Group>

              {productType === "DVD" && (
                <Form.Group controlId="size">
                  <Form.Label>Size (MB):*</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("size", {
                      required: true,
                      pattern: /^[+]?([0-9]*[.])?[0-9]+$/,
                    })}
                    value={productAttributes.size}
                    onChange={(event) =>
                      setProductAttributes({
                        ...productAttributes,
                        size: event.target.value,
                      })
                    }
                  />

                  {errors?.size?.type === "required" && (
                    <p className="text-danger">This field is required</p>
                  )}

                  {errors?.size?.type === "pattern" && (
                    <p className="text-danger">No Negative Numbers OR letters</p>
                  )}

                  <Form.Text className="text-muted">
                    No Negative Numbers OR letters
                  </Form.Text>
                </Form.Group>
              )}

              {productType === "Book" && (
                <Form.Group controlId="weight">
                  <Form.Label>Weight (KG):*</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("weight", {
                      required: true,
                    })}
                    value={productAttributes.weight}
                    onChange={(event) =>
                      setProductAttributes({
                        ...productAttributes,
                        weight: event.target.value,
                      })
                    }
                  />

                  {errors?.price?.type === "required" && (
                    <p className="text-danger">This field is required</p>
                  )}

<Form.Text className="text-muted">
                    No Negative Numbers OR letters
                  </Form.Text>
                </Form.Group>
              )}

              {productType === "Furniture" && (
                <div>
                  <Form.Group controlId="height">
                    <Form.Label>Height (CM):*</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("height", {
                        required: true,
                        pattern: /^[+]?([0-9]*[.])?[0-9]+$/,
                      })}
                      value={productAttributes.height}
                      onChange={(event) =>
                        setProductAttributes({
                          ...productAttributes,
                          height: event.target.value,
                        })
                      }
                    />
                    {errors?.height?.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}

                    {errors?.height?.type === "pattern" && (
                      <p className="text-danger">No Negative Numbers OR letters</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="width">
                    <Form.Label>Width (CM):*</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("width", {
                        required: true,
                        pattern: /^[+]?([0-9]*[.])?[0-9]+$/,
                      })}
                      value={productAttributes.width}
                      onChange={(event) =>
                        setProductAttributes({
                          ...productAttributes,
                          width: event.target.value,
                        })
                      }
                    />
                    {errors?.width?.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}

                    {errors?.width?.type === "pattern" && (
                      <p className="text-danger">No Negative Numbers OR letters</p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="length">
                    <Form.Label>Length (CM):*</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("length", {
                        required: true,
                        pattern: /^[+]?([0-9]*[.])?[0-9]+$/,
                      })}
                      value={productAttributes.length}
                      onChange={(event) =>
                        setProductAttributes({
                          ...productAttributes,
                          length: event.target.value,
                        })
                      }
                    />

                    {errors?.length?.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}

                    {errors?.length?.type === "pattern" && (
                      <p className="text-danger">No Negative Numbers OR letters</p>
                    )}
                  </Form.Group>
                </div>
              )}
            </Form>
          </Col>

          <Col xs={12} md={6}>
            <figure className="p-5">
            <img src={AddProduct} alt="" />
            </figure>
          </Col>
        </Row>
      </Container>
    </>
  );
}
