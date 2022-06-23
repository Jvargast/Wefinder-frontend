import React, { useState } from "react";
import styled from "styled-components";

const FiltersCard = styled.div`
  padding-bottom: 1.25rem;
  padding-top: 1.25rem;
  border-bottom: 2px solid black;

  h3 {
    margin-bottom: -0.75rem;
    margin-top: -0.75rem;
    display: flow-root;

    button {
      font-size: 0.875rem;
      padding-bottom: 0.75rem;
      padding-top: 0.75rem;
      justify-content: space-between;
      align-items: center;
      display: flex;
      width: 100%;
      background-color: transparent;
      background-image: none;
      cursor: pointer;
      border: none;

      span {
        color: #038d84;
        font-weight: 700;
        font-size: 16px;
        &:hover {
          color: #ffb900;
        }
      }
      span {
        a {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }
        svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }

  div {
    padding-top: 0.75rem;
  }
`;

const Lista = styled.li`
  list-style: none;

  input {
    border-radius: 0.25rem;
    width: 1rem;
    height: 1rem;
  }
`;

const FilterCard = (props) => {
  const [visible, setVisible] = useState(true);

  const toggle = () => {
    setVisible(!visible);
    console.log(visible);
  };

  return (
    <FiltersCard>
      <h3>
        <button onClick={toggle}>
          <span>{props.name}</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "0.5rem",
            }}
          >
            {visible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                data-supported-dps="16x16"
                fill="currentColor"
                width="1.25rem"
                height="1.25rem"
                focusable="false"
                style={{height:"1.25rem", width:"1.25rem"}}
              >
                <path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path>
              </svg>
            )}
          </span>
        </button>
        {visible && (
          <div>
            {props.data.map((item, i) => (
              <Lista key={i}>
                <input type="checkbox" />
                <label> {item}</label>
              </Lista>
            ))}
          </div>
        )}
      </h3>
    </FiltersCard>
  );
};

export default FilterCard;
