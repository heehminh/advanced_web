import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Article from "./Article";
import Footer from "./Footer";
import Map from "./Map";

const Content = ({ click, typeIndex }) => {
  const { isLoading, isError, data, error } = useQuery(
    "markers",
    async () => {
      try {
        const response = await axios.get("/markers");
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

  if (click) {
    // Map
    return (
      <div>
        <div id="content">
          <Map markers={data} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div id="content">
          <Article className="room" click={click} typeIndex={typeIndex} />
          <Footer id="footer" />
        </div>
      </div>
    );
  }
};

export default Content;
