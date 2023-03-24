import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// style
import "./style.scss";
import Logo from "../../assets/images/my-store.png";
import NoData from "../../assets/images/undraw_no_data_re_kwbl.svg";
import AnimatedPages from "../../components/AnimatePages";
// style

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const [checked, setChecked] = useState(false);
  const [items, setItems] = useState([]);

  const handleCheck = (sku) => {
    const newProducts = products.map((product) => {
      if (product.sku === sku) {
        return {
          ...product,
          checked: !product.checked,
        };
      }
      return product;
    });
    setProducts(newProducts);
    const newItems = newProducts
      .filter((product) => product.checked)
      .map((product) => product.sku)
      .filter((sku) => !items.includes(sku)); // check if sku already exists in items array
    setItems([...items, ...newItems]); // add only the new skus to the items array
    return newItems;
  };
  const massDelete = async () => {
    try {
      const responses = await Promise.all(
        items.map(async (send) => {
          const response = await fetch(
            "https://scandiweb-elkoumey.000webhostapp.com/api/v1/delete",
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
              },
              mode: "cors",
              body: JSON.stringify({
                sku: send,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete items");
          }
          return response;
        })
      );
      setItems((prev) => [...prev]);
      return responses.map((response) => response.json());
    } catch (error) {
      console.error("the error is :" + error);
    }
  };
  

  useEffect(() => {
    let url = fetch("https://scandiweb-elkoumey.000webhostapp.com/api/v1/get",{
      mode:"cors"
    })
      .then((res) => res.json())
      .then((data) => {
        return setProducts(data.allData);
      });
    console.log(items);
  }, [items]);
  // console.log(JSON.parse(products[0].attributes)?.weight);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
          <div className="container">
            <span className="navbar-brand">
              <img src={Logo} height="50" alt="the logo" />
            </span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <Link to="add-product">
                    <button
                      className="nav-link mx-2 active"
                      aria-current="page"
                    >
                      ADD
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    id="delete-product-btn"
                    className="btn border border-0 nav-link mx-2 active"
                    aria-current="page"
                    onClick={massDelete}
                  >
                    MASS DELETE
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="p-5 product-wrapper">
        <Container>
          <Row>
            {products.length > 0 ? (
              products.map((value) => (
                <Col key={value.sku} xs={12} md={3} lg={4}>
                  <div className="crd_dsgn p-2">
                    <div className="crd_hdng p-2">
                      <div className="title-check d-flex justify-content-between">
                        <Form.Check
                          type="checkbox"
                          name="delete"
                          className="delete-checkbox card-check"
                          id={value.sku}
                          onChange={() => handleCheck(value.sku)}
                        />{" "}
                        <h4>{value.sku}</h4>
                      </div>

                      <h4>{value.price} $</h4>
                      <h4>{value.category}</h4>
                      {value.category === "Book" &&
                        JSON.parse(value.attributes) && (
                          <span>
                            Weight: {JSON.parse(value.attributes).weight}
                          </span>
                        )}

                      {value.category === "DVD" && value.attributes && (
                        <span>Size: {JSON.parse(value.attributes).size}</span>
                      )}

                      {value.category === "Furniture" && value.attributes && (
                        <span>
                          Dimensions: {JSON.parse(value.attributes).height} x{" "}
                          {JSON.parse(value.attributes).width} x{" "}
                          {JSON.parse(value.attributes).length}
                        </span>
                      )}
                      <p className="fw-bold">{value.name}</p>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="w-50 m-auto">
                <h1 className="text-center mb-5 fw-bolder text-danger">
                  No Data Yet
                </h1>
                <img
                  src={NoData}
                  alt="No Data Yet "
                  title="No Data Yet"
                  className="w-75"
                />
              </div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
