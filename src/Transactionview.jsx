import react, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  align-items: center;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 50%;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  width: 50%;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload.type === "Expense"}>
      <span>{props.payload.Desc}</span>
      <span>{props.payload.Amount}</span>
    </Cell>
  );
};
function TransactionView(props) {
  const [txn, setTxn] = useState(props.txns);
  const [searchtxt, setSearchTxt] = useState("");

 function FilterData(searchtxt) {
    if (!searchtxt || !searchtxt.trim().length) {
      setTxn(props.txns);
      return;
    }
    let transac = [...txn];

    transac = transac.filter((payload) =>
      payload.Desc.toLowerCase().includes(searchtxt.toLowerCase().trim())
    );
    setTxn(transac);
  }

  useEffect(() => FilterData(searchtxt), [props.txns]);

  return (
    <Container>
      <h3> Transactions</h3>
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => {
          setSearchTxt(e.target.value);
          FilterData(e.target.value);
        }}
        value={searchtxt}
      />
      {txn?.map((payload, index) => (
        <TransactionCell payload={payload} key={index} id={index} />
      ))}
    </Container>
  );
}

export default TransactionView;
