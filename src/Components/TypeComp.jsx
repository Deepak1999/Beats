export default function TypeComp(props) {
  return (
    <>
      {props.type == 0 && "Expense"}
      {props.type == 1 && "Purchase Order"}
      {props.type == 2 && "Claim"}
      {props.type == 3 && "Pymt Request"}
    </>
  );
}
