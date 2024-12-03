import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Loading from "../../Components/Loading";
import React, { useEffect } from "react";
import CreatedExpense from "../loggedInUser/CreateExpense";
import PurchaseRequest from "../loggedInUser/Purchase";
import RaiseClaim from "../loggedInUser/RaiseClaim";
const LazyLogin = React.lazy(() => import("../login"));
const LazyDashboardCopy = React.lazy(() =>
  import("../loggedInUser/Dashboard/DashboardCopy")
);

const milestoneDetail = React.lazy(() =>
  import("../loggedInUser/MilestoneDetail")
);

const lazyClaim = React.lazy(() => import("../loggedInUser/RaiseClaim"));

const lazyTerms = React.lazy(() => import("../../Layout/Terms"));

const lazyPurchaseDetail = React.lazy(() =>
  import("../loggedInUser/PurchaseReleaseDetail")
);

const lazyDemand = React.lazy(() => import("../loggedInUser/DemandInvoice"));

const lazyNavigation = React.lazy(() => import("../loggedInUser/Navigation"));

const LazyRentAgreementReport = React.lazy(() =>
  import("../loggedInUser/RentAgreementReport")
);

const LazyPaymentRequest = React.lazy(() =>
  import("../loggedInUser/PaymentReleaseRequest")
);

const LazyPaymentDetail = React.lazy(() =>
  import("../loggedInUser/PaymentDetail")
);
const LazyProfile = React.lazy(() => import("../loggedInUser/Profile"));
const LazyFaQ = React.lazy(() => import("../loggedInUser/FAQ"));
const LazyBulk = React.lazy(() => import("../loggedInUser/BulkUpload"));
const LazyForgetpass = React.lazy(() =>
  import("../loggedInUser/ForgetPassword")
);
const LazyFeedBack = React.lazy(() => import("../loggedInUser/Feedback"));
const LazyFiles = React.lazy(() => import("../loggedInUser/ExpenseFiles"));
const LazyApprovalsRepo = React.lazy(() =>
  import("../loggedInUser/ApprovalsReport")
);
const LazyExpenseDetailFile = React.lazy(() =>
  import("../loggedInUser/ExpenseDetailFile")
);
const LazyExpense = React.lazy(() => import("../loggedInUser/Expense"));
const LazyExpenseDetail = React.lazy(() =>
  import("../loggedInUser/ExpenseDetail")
);
const LazySearch = React.lazy(() => import("../loggedInUser/SearchExpense"));
const lazyDash = React.lazy(() =>
  import("../loggedInUser/Dashboard/Dashboard")
);
const lazyForgetPage = React.lazy(() => import("../loggedInUser/ForgetPage"));
const index = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("password") == 0) {
  //     document.getElementById("confirm-button1").click();
  //   }
  // }, []);

  return localStorage.getItem("token") ? (
    <Switch>
      <Route path="/" exact component={LazyLogin} />
      {/* <Route path="/new" component={NewLogin} /> */}
      <Route path="/dashboard" exact component={lazyDash} />
      <Route path="/dashboardcopy" exact component={LazyDashboardCopy} />
      <Route path="/expense" component={LazyExpense} />
      <Route path="/detail/:expenseId" component={LazyExpenseDetail} />

      <Route path="/detail" component={LazyExpenseDetail} />
      {/* <Route path="/detail2" component={ExpenseHistory2} /> */}
      <Route path="/profile" component={LazyProfile} />
      <Route path="/create" component={CreatedExpense} />
      <Route path="/search" component={LazySearch} />
      <Route path="/purchase" component={PurchaseRequest} />
      <Route path="/approvals" component={LazyApprovalsRepo} />
      <Route path="/FAQ" component={LazyFaQ} />
      <Route path="/expensefiles" component={LazyFiles} />
      <Route path="/utr" component={LazyBulk} />
      <Route path="/expensefile/:id" component={LazyExpenseDetailFile} />
      <Route path="/loader" component={Loading} />
      <Route path="/feedback" component={LazyFeedBack} />
      <Route path="/agreements" component={LazyRentAgreementReport} />
      <Route path="/mDetail/:id" component={milestoneDetail} />
      {/* <Route path="/template" component={PdfTemplate} /> */}
      <Route path="/navigation" component={lazyNavigation} />
      <Route path="/paymentRelease" exact component={LazyPaymentRequest} />
      <Route path="/demand" exact component={lazyDemand} />
      <Route path="/payDetail" exact component={LazyPaymentDetail} />
      <Route path="/terms" exact component={lazyTerms} />
      <Route path="/raiseClaim" exact component={RaiseClaim} />
      <Route path="/releaseDetail/:id" exact component={lazyPurchaseDetail} />
      <Route path="**" exact component={LazyExpense} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/forgotpassword" component={LazyForgetpass} />
      <Route path="/forgetPage" component={lazyForgetPage} />
      <Route path="/" exact component={LazyLogin} />
      <Route path="/feedback" component={LazyFeedBack} />
      <Route path="**" exact component={LazyLogin} />
    </Switch>
  );
};
export default index;
