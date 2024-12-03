import React from "react";
import "./500.css";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Page500() {
  const history = useHistory();
  console.log(history, "history");

  return (
    <section className="centered" style={{ backgroundColor: "black" }}>
      <h1 style={{ color: "white" }}>Something Went Wrong !!</h1>
      <span className="message" id="js-error">
        We are Sorry for the Inconvinience
      </span>{" "}
      <Link
        to="/expense"
        onClick={() => {
          setTimeout(() => {
            window?.location?.reload();
          }, 500);
        }}
        className="bn13 mt-5"
      >
        <ReplyAllIcon /> Go Home
      </Link>
    </section>
  );
}
