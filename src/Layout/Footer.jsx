export default function Footer() {
  return (
    <>
      <footer className="footer_1 coupon_footer text-white">
        <div className="container-fluid text-white py-2">
          <div className="row d-lg-fle d-non justify-content-between justify_content_center align-items-center">
            <div className="col-xl-6 col-sm- flex_0 d-sm-flex flex-wrap m-0">
              <ul className="list-unstyled d-flex flex-wrap justify-content-center text-start my-auto">
                <li className="nav-item mx-lg- my-aut m- my-1 m-4 ms-0">
                  <a className=" ls footer_ls text-white" routerLink="/terms">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="nav-item mx-lg- my-aut m- my-1 m-4 ms-0">
                  <a className=" ls footer_ls text-white" routerLink="/privacy">
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item mx-lg- my-aut m- my-1  m-4 ms-0">
                  <a className=" ls footer_ls text-white" routerLink="/FAQ">
                    FAQ
                  </a>
                </li>
              </ul>
              <div className="d-flex flex-wrap social_icons align-items-center justify-content-sm-end justify-content-center com_wth min_max m-0 my- ms-xl-2 ms-sm-auto me-sm-0 mx-auto">
                <a
                  href="https://www.facebook.com/TheAltruistBusinessHotel?mibextid=ZbWKwL "
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src="assets/Images/facebook.png"
                    className="img-fluid d-block"
                  />
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/the_altruist_business_hotel?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw== "
                  target="_blank"
                >
                  <img
                    src="assets/Images/instagram.png"
                    className="img-fluid d-block"
                  />
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/the-altruist-business-hotel/ "
                  target="_blank"
                >
                  <img
                    src="assets/Images/linkedin.png"
                    className="img-fluid d-block"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-sm- col- m-0 ms-auto">
              <p className="copyright_text text-capitalize text-xl-end text-center m-0 mt- mt_0 text-white">
                Copyright © Scholar Alley Private Limited. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
