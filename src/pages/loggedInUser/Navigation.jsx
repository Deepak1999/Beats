import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import logo1 from "../../assets/images/logo_outer.png";
import expense from "../../assets/images/expense.png";
import purchase from "../../assets/images/purchase.png";
import invoice from "../../assets/images/invoice.png";
import raise from "../../assets/images/raise claim.png";
import payment from "../../assets/images/payment.png";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
export default function NavigationBar() {
  const [roleId, setRoleId] = useState(0);
  const [type, setType] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("roleId") != null) {
      setRoleId(localStorage.getItem("roleId"));
    }
  });
  const history = useHistory();
  return (
    <>
      <div className="container-fluid py-3 ">
        <div className="row navig_images justify-between d-flex">
          <div
            className="col-md-12 d-flex"
            style={{ justifyContent: "center" }}
          >
            <div className="card col-md-3 col-4 text-center pb-3 mx-3">
              <a className="d-block">
                {/* <h4 style={{ color: "#48a8dd" }}>Expense Request</h4> */}
                <div
                  className="o_hidden mt-3"
                  style={{ textAlign: "center", color: "#48a8dd" }}
                >
                  <img
                    src={expense}
                    className="expense img-fluid"
                    style={{ width: "100px" }}
                  ></img>
                </div>
                <span
                  className="d-block mt-4"
                  style={{ fontSize: "21px", color: "#48a8dd" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      history.push(`/create`);
                    }}
                  >
                    Create Expense Request
                  </button>
                </span>
              </a>
            </div>
            {/* (roleId == "5" || roleId == "2" || roleId == "1") */}
            {(roleId == "5" ||
              roleId == "2" ||
              roleId == "1" ||
              roleId == "17") && (
              <div className="card col-md-3 col-4 text-center pb-3 mx-3">
                <a className="d-block">
                  {/* <h4 style={{ color: "#48a8dd" }}>Purchase Request</h4> */}
                  <div
                    className="o_hidden mt-3"
                    style={{ textAlign: "center", color: "#48a8dd" }}
                  >
                    <img
                      src={purchase}
                      className="expense img-fluid"
                      style={{ width: "100px" }}
                    ></img>
                  </div>
                  <span className="d-block mt-4" style={{ fontSize: "21px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        history.push(`/purchase`);
                      }}
                    >
                      {" "}
                      Create Purchase Request
                    </button>
                  </span>
                </a>
              </div>
            )}
            {/* (roleId == "4" || roleId == "2" || roleId == "1")  */}
            {(roleId == "4" || roleId == "2" || roleId == "1") && (
              <div className="card col-md-3 col-4 text-center pb-3 mx-3">
                <a className="d-block">
                  {/* <h4 style={{ color: "#48a8dd" }}>Invoice Demand</h4> */}
                  <div
                    className="o_hidden mt-3"
                    style={{ textAlign: "center", color: "#48a8dd" }}
                  >
                    <img
                      src={invoice}
                      className="expense img-fluid"
                      style={{ width: "100px" }}
                    ></img>
                  </div>
                  <span className="d-block mt-4" style={{ fontSize: "21px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        history.push(`/demand`);
                      }}
                    >
                      {" "}
                      Raise Invoice Demand
                    </button>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="row navig_images justify-between d-flex mt-5">
          <div
            className="col-md-12 d-flex"
            style={{ justifyContent: "center" }}
          >
            <div className="card col-md-3 col-4 text-center pb-3 mx-3">
              <a className="d-block">
                {/* <h4 style={{ color: "#48a8dd" }}>Raise Claim</h4> */}
                <div
                  className="o_hidden mt-3"
                  style={{ textAlign: "center", color: "#48a8dd" }}
                >
                  <img
                    src={raise}
                    className="expense img-fluid"
                    style={{ width: "100px" }}
                  ></img>
                </div>
                <span
                  className="d-block mt-4"
                  style={{ fontSize: "21px", color: "#48a8dd" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      history.push(`/raiseClaim`);
                    }}
                  >
                    Raise Personal Claim
                  </button>
                </span>
              </a>
            </div>

            {/* (roleId == "5" || roleId == "2" || roleId == "1")  */}
            {(roleId == "5" ||
              roleId == "2" ||
              roleId == "1" ||
              roleId == "17") && (
              <div className="card col-md-3 col-4 text-center pb-3 mx-3">
                <a className="d-block">
                  {/* <h4 style={{ color: "#48a8dd" }}>Payment Release</h4> */}
                  <div
                    className="o_hidden mt-3"
                    style={{ textAlign: "center", color: "#48a8dd" }}
                  >
                    <img
                      src={payment}
                      className="expense img-fluid"
                      style={{ width: "100px" }}
                    ></img>
                  </div>
                  <span className="d-block mt-4" style={{ fontSize: "21px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        // Swal.fire({
                        //   icon: "info",
                        //   title: "Coming Soon",
                        //   text: "This module is under development",
                        // });

                        history.push(`/paymentRelease`);
                      }}
                    >
                      {" "}
                      Payment Release Request
                    </button>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
