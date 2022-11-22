import react, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;

const BalnceBox = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  width: 100%;
  text-align: center;
  justify-content: center;
  gap: 8%;
`;

const Addbutton = styled.button`
  padding: 0.5% 2%;
  font-size: 1rem;
  background-color: white;
  color: black;
  gap: 10%;
  border: 2px solid #555555;
  :hover {
    background-color: #555555;
    color: white;
  }
  border-radius: 4px;
  cursor: pointer;
`;

const AddTxn = styled.div`
  border: solid grey;
  border-radius: 5px;
  border-style: groove;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
  text-align: center;
  justify-content: center;

  & input {
    margin: 2%;
    padding: 2%;
    font-weight: lighter;
  }
`;

const TypeInput = styled.div`
  display: flex;
  flex-direction: row;
  & input {
    margin: 10% 10%;
  }
  align-items: center;
  justify-content: center;
`;

const SumContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  margin-bottom: 0;
`;

const IndiContainer = styled.div`
  border: 1px solid #e6e8e9;
  padding: 10%;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  margin: 10%;
  gap: 10px;
  width: 135 px;
  & span {
    color: ${(props) => (props.Expense ? "red" : "green")};
    font-weight: bold;
    font-size: 20px;
  }
`;

function OverView(props) {
  const [isAdded, setAdd] = useState(false);
  const [amount, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [type, setType] = useState("Expense");

  return (
    <Container>
      <h1>Expense Tracker</h1>
      <BalnceBox>
        Balance: $ {props.income - props.expense}
        <Addbutton
          onClick={() => {
            setAdd(!isAdded);
          }}
        >
          {" "}
          {isAdded ? "Cancel" : "Add"}{" "}
        </Addbutton>
      </BalnceBox>
      {isAdded && (
        <AddTxn>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <input
            type="text"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
          <TypeInput>
            <input
              type="radio"
              name="type"
              id="Expense"
              defaultChecked
              onClick={(e) => setType(e.target.id)}
            />
            <label htmlFor="Expense">Expense</label>
            <input
              type="radio"
              name="type"
              id="Income"
              onClick={(e) => setType(e.target.id)}
            />
            <label htmlFor="Income">Income</label>
          </TypeInput>
          <Addbutton
            onClick={() => {
              setAdd(!isAdded);
              setAmount("");
              setDesc("");
              setType("Expense")
              return props.addtxn({ Amount: Number(amount), Desc, type });
            }}
          >
            Add Transaction
          </Addbutton>
        </AddTxn>
      )}
      <SumContainer>
        <IndiContainer Expense={true}>
          Expense <span>${props.expense}</span>
        </IndiContainer>
        <IndiContainer>
          Income <span>${props.income}</span>
        </IndiContainer>
      </SumContainer>
    </Container>
  );
}

export default OverView;
