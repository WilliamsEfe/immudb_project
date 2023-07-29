import React from "react";
import { Link } from "react-router-dom";
import BG from "assets/images/bg.svg";

import ActionCard from "components/cards/actionCard";

import {
  AiOutlineUserAdd,
  AiOutlineUnorderedList,
  AiOutlineFileSearch,
} from "react-icons/ai";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] gap-10 relative py-8 px-3">
      <h1 className="md:text-[38px] text-[20px] font-bold text-[#F77F00] text-center">
        <span className="text-[#022A5D]">Welcome to</span> MEDICOSURVEILLANCE
      </h1>

      <div className="w-full flex justify-around items-center md:flew-row  flex-wrap gap-4">
        <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
          <ActionCard
            icon={<AiOutlineUserAdd size={64} color="#022A5D" />}
            text={"Create Patient"}
            className={"bg-blue-300"}
          />
        </Link>
        <Link to="/list">
          <ActionCard
            icon={<AiOutlineUnorderedList size={64} color="#022A5D" />}
            text={"Patient List"}
            className={"bg-green-500"}
          />
        </Link>
        <Link to="/search">
          <ActionCard
            icon={<AiOutlineFileSearch size={64} color="#022A5D" />}
            text={"Search Patients"}
            className={"bg-yellow-500"}
          />
        </Link>
      </div>
      <div className="w-screen flex justify-center overflow-x-hidden">
        <img className="min-w-[600px]" src={BG} alt="" />
      </div>
    </div>
  );
};

export default Home;
