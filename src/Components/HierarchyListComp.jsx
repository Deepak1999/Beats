import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function HierarchyListComp(props) {
  const getDesignFunc = (status) => {
    if (status == 5) {
      return "myClass position-relative coor_black";
    } else if (status == 2) {
      return "myClass position-relative greenColor";
    } else if (status == 1) {
      return "myClass position-relative red_color";
    } else {
      return " myClass position-relative grey_color";
    }
  };
  return (
    <>
      <div className="d-block" key={props.index}>
        <div
          className={
            props.data.status == 0 &&
            props.expense &&
            props.data.userId == props.expense.approverId &&
            props.expense.saveStatus == 2
              ? getDesignFunc(5)
              : getDesignFunc(props.data.status)
          }
        >
          {props.data.status == 1 && (
            <p className="text text-danger">
              <CloseIcon style={{ color: "white" }} />{" "}
            </p>
          )}
          {props.data.status == 0 &&
            props.expense &&
            props.data.userId == props.expense.approverId &&
            props.expense.saveStatus == 2 && (
              <AccessTimeIcon style={{ color: "white" }} />
            )}
          {props.data.status == 2 && (
            <p className=" heavy_green text text-success">
              <DoneIcon style={{ color: "white" }} />{" "}
            </p>
          )}
          {props.data.status == 3 && (
            <p className="text text-info">
              <DoDisturbIcon style={{ color: "white" }} />{" "}
            </p>
          )}
        </div>
        <div className="para1">
          {/* {props.expense && (props.data.userId == props.expense.approverId) && props.expense.saveStatus == 2 && <b style={{ fontSize: "smaller", color: '#000' }}> Pending at</b>} */}
          <p
            style={{
              fontSize: "smaller",
              color: "#000",
            }}
          >
            {props.data.userName}
          </p>
          {props.data.status == 0 &&
            props.expense &&
            props.data.userId == props.expense.approverId &&
            props.expense.saveStatus == 2}
        </div>
      </div>
    </>
  );
}
