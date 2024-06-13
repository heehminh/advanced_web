import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

const Type = ({ setTypeIndex, setClick }) => {
  const [activeTypeItemId, setActiveTypeItemId] = useState(null);

  const handleTypeItemClick = (typeIdx) => {
    setActiveTypeItemId(typeIdx);
    setTypeIndex(typeIdx);
    setClick(false);
  };

  const { isLoading, isError, data, error } = useQuery(
    "typeList",
    async () => {
      try {
        const response = await axios.get("/typeList");
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Wrapper>
      <TypeWrapper>
        {data.map((type, index) => (
          <TypeItem
            key={index}
            className={activeTypeItemId === type.type_idx ? "active" : ""}
            onClick={() => handleTypeItemClick(type.type_idx)}
          >
            <TypeItemIcon src={type.type_imgSrc} alt="type" />
            <TypeItemDescription>{type.type_description}</TypeItemDescription>
          </TypeItem>
        ))}
      </TypeWrapper>

      <TypeFilter>
        <TypeFilterIcon src="./assets/room-filter.png" alt="room filter" />
        <TypeFilterDescription>필터</TypeFilterDescription>
      </TypeFilter>
    </Wrapper>
  );
};

export default Type;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 85px 30px 0px 30px;
  padding: 30px 0px 10px 0px;
  top: 0;
  background-color: white;
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TypeItem = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 30px;
  padding-bottom: 20px;
  border: 2px solid white;
  transition: border-bottom-color 0.2s ease-in-out;
  background-color: white;
  cursor: pointer;

  &:hover {
    border-bottom-color: gray;
    cursor: pointer;
  }

  &.active {
    border-bottom-color: black;
  }
`;

const TypeItemIcon = styled.img`
  width: 30px;
  opacity: 0.5;

  ${TypeItem}:hover &,
  ${TypeItem}.active & {
    opacity: 1;
  }
`;

const TypeItemDescription = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  color: gray;
  transition: color 0.2s ease-in-out;

  ${TypeItem}:hover &,
  ${TypeItem}.active & {
    color: black;
  }
`;

const TypeFilter = styled.div`
  width: 78px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 10px;
  flex-direction: row;
  border-radius: 12px;
  border: 1px solid lightgray;
`;

const TypeFilterIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TypeFilterDescription = styled.div``;
