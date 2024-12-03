import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { common_axios } from "../../App";
import { setLoader } from "../../redux/features/authSliceandSidebar";
export const FAQ = () => {
  const [faqList, setfaqList] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getFaqs();
  }, []);
  const getFaqs = async () => {
    const res = await common_axios.post(`/auth/FAQ/get`);
    dispatch(setLoader(true));
    if (res?.data?.statusDescription?.statusCode == 200) {
      setfaqList(res.data.questions);
      dispatch(setLoader(false));
    }
  };
  return (
    <>
      <section className="faqs py-4">
        <div className="container">
          <h1 className="h_1 text-center text-capitalize mb-4">
            frequently asked questions
          </h1>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="team">
              <h3>FAQ’s for Activation</h3>
              <div className="mt-2">
                {faqList?.map((data, index) => {
                  return (
                    <>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            aria-controls="flush-collapseOne"
                            aria-expanded="false"
                            className="accordion-button collapsed"
                            data-bs-target={`#flush-collapseOne_${index}`}
                            data-bs-toggle="collapse"
                            type="button"
                          >
                            <span className="d-block me-4">{index + 1}.</span>
                            {data?.question}
                          </button>
                        </h2>
                        <div
                          aria-labelledby="flush-headingOne"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionFlushExample"
                          id={`flush-collapseOne_${index}`}
                        >
                          <div className="accordion-body"> {data?.answer}</div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
