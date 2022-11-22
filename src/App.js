import styled from "styled-components";
import OverView from "./Overview";
import TransactionView from "./Transactionview";

import react, { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 22px;
  justify-content: space-between;

  height: 100vh;
  width: 98%;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 22px;
  justify-content: space-between;
  width: 360px;
`;

export default function App() {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  function Calculate() {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      payload.type === "Expense"
        ? (exp = exp + payload.Amount)
        : (inc = inc + payload.Amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  }
  useEffect(() => Calculate(), [transactions]);
  function addTxn(payload) {
    const txnarray = [...transactions];
    txnarray.push(payload);
    updateTransaction(txnarray);
  }

  return (
    <Container>
      <Container2>
        {" "}
        <OverView addtxn={addTxn} expense={expense} income={income} />
        {transactions?.length ? <TransactionView txns={transactions} /> : ""}
      </Container2>
    </Container>
  );
}
