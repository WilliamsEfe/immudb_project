import React from "react";

const ActionCard = ({ className, text, icon }) => {
  return (
    <div
      className={`${className} w-[250px] h-[150px] flex flex-col gap-y-3 rounded-[6px] shadow-lg p-4 cursor-pointer hover:opacity-90`}
    >
      <p className="w-full w-full flex justify-center">{icon}</p>
      <p className="text-center font-medium text-[20px] text-gray-200">
        {text}
      </p>
    </div>
  );
};

export default ActionCard;
