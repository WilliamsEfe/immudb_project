import React from "react";
import PropTypes from "prop-types";

export const Input = ({
  type,
  placeholder,
  Icon,
  withLabel,
  label,
  inputClass,
  onClick,
  name,
  value,
  onFocus,
  onChange,
  className,
  iconClass,
  labelClassName,
  subText,
  subTextClass,
  IconLeft,
  style,
}) => {
  return (
    <div
      className={`${inputClass}flex flex-col space-y-3 transition-all ${
        withLabel ? "flex flex-col justify-between" : ""
      }`}
    >
      {withLabel && (
        <span className={`${labelClassName} text-base font-medium  `}>
          {label}{" "}
        </span>
      )}

      <div className="relative">
        <input
          className={`${
            IconLeft ? "pl-8" : ""
          } ${className} w-full h-10 placeholder:text-[#A1A1A1] placeholder:text-base border rounded  focus:outline-none focus:border-[#253D4E] focus:ring-offset-[#253D4E] bg-white-100 text:base `}
          type={type}
          placeholder={placeholder}
          onClick={onClick}
          onChange={onChange}
          name={name}
          value={value}
          onFocus={onFocus}
          style={style}
        />
        <div className="absolute flex items-center top-[50%] -translate-y-1/2 gap-1 right-2 ">
          {Icon && <div className={`${iconClass} cursor-pointer `}>{Icon}</div>}
          {subText && (
            <div
              className={`${subTextClass} cursor-pointer text-gray-100 text-sm `}
            >
              {subText}
            </div>
          )}
        </div>
        <div className="absolute flex items-center top-[50%] -translate-y-1/2 gap-1 left-2 ">
          {IconLeft && (
            <div className={`${iconClass} cursor-pointer `}>{IconLeft}</div>
          )}
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  Icon: PropTypes.any,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  inputClass: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  onFocus: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  labelClassName: PropTypes.string,
  subText: PropTypes.string,
  subTextClass: PropTypes.string,
  IconLeft: PropTypes.any,
  style: PropTypes.any,
};
