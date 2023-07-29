import React from "react";
import { ReactComponent as Icon } from "assets/icons/logo.svg";

import { Input } from "components/common/input";
import { Button } from "components/common/buttons";

const Footer = () => {
  const Company = ["Home", "Explore", "Team", "About us", "Activity"];
  const Resources = ["Blog", "Use Cases", "Testimonials", "Insights"];
  return (
    <div className="z-20 flex flex-col gap-y-16 md:py-8 py-4 px-4 md:px-8   bg-[#022A5D] text-white">
      <div className="flex justify-between gap-x-6 gap-y-4 flex-wrap">
        <div className="flex flex-col gap-y-4 lg:max-w-[25%] w-full">
          <p className="text-[28px] font-semibold">Info</p>
          <p className="text-white   md:text-base text-[14px]">
            Introducing MedicoSurveillance, a state-of-the-art Medical Records
            Management App. Designed to optimize healthcare processes,
            MedicoSurveillance offers secure data storage, easy record
            retrieval, and seamless information sharing. Join us in elevating
            patient care and enhancing medical operations with our innovative
            app.
          </p>
        </div>

        <div className="flex flex-col md:gap-y-6 gap-y-2">
          <p className="font-semibold   text-xl ">Company</p>
          {Company.map((item, index) => {
            return (
              <p key={item + index} className=" opacity-60 font-medium">
                {item}
              </p>
            );
          })}
        </div>

        <div className="flex flex-col md:gap-y-6 gap-y-2">
          <p className="font-semibold   text-xl">Resources</p>
          {Resources.map((item, index) => {
            return (
              <p key={item + index} className=" opacity-60 font-medium">
                {item}
              </p>
            );
          })}
        </div>

        <div className="flex flex-col gap-y-6">
          <Icon />
          <p className=" opacity-60 font-light text-[14px]">
            Join our email listing today!
          </p>
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder={"Your Email"}
              subText={"@"}
              subTextClass={"!text-white"}
              className={"!w-full !px-1"}
            />
            <Button
              text={"Subscribe"}
              className={"!h-full !w-fit !px-3 !bg-[#F77F00]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
