import { Toaster, ToastBar, toast } from "react-hot-toast";

import styled from "styled-components";
import {
  IoCloseCircleOutline,
  IoCloseOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";

const DEFAULT_TOAST_DURATION = 5000;

const defaultConfig = { duration: DEFAULT_TOAST_DURATION };

const ToastLoader = styled.div`
  height: 5px;
  background-color: ${(props) =>
    props.type === "error"
      ? "#F97066"
      : props.type === "success"
      ? "#10B981"
      : props.type === "warning"
      ? "#F59E0B"
      : "#3B82F6"};
  position: absolute;
  left: -200%;
  bottom: 0;
  width: 200%;
  animation: slide-right ${(props) => props.duration / 1000}s ease forwards;

  @keyframes slide-right {
    0% {
    }
    50% {
    }
    100% {
      left: -100%;
    }
  }
`;
const ToastSide = styled.div`
  height: 200%;
  background-color: ${(props) =>
    props.type === "error"
      ? "#F43F5E"
      : props.type === "success"
      ? "#10B981"
      : props.message === "warning"
      ? "#F59E0B"
      : "#3B82F6"};
  position: absolute;
  left: 0;
  width: 5px;
  animation: slide-down ${(props) => props.duration / 1000}s ease forwards;
  top: -200%;

  @keyframes slide-down {
    0% {
    }
    50% {
    }
    100% {
      top: -100%;
    }
  }
`;

const Toast = () => {
  return (
    <Toaster position="top-right z-[1000101]">
      {(t) => (
        <ToastBar
          toast={t}
          position="top-right"
          style={{
            zIndex: "100000",
            width: "396px",
            minHeight: "105px",
            background: "#FFFFFF",
            boxShadow: "0px 0px 10px rgba(225, 231, 242, 0.8)",
            borderRadius: "8px",
            padding: "10px 20px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {({ icon, message }) => {
            const toastIcon =
              t.type === "error" ? (
                <IoCloseCircleOutline size={24} color="#F43F5E" />
              ) : t.type === "success" ? (
                <BiCheckCircle size={24} color="#10B981" />
              ) : message.props.role === "warning" ? (
                <IoWarningOutline size={24} color="#F59E0B" />
              ) : (
                icon
              );
            return (
              <div className="bani-toast w-full z-[1000000]">
                <ToastSide
                  type={t.type}
                  duration={t.duration}
                  message={message.props.role}
                />
                <div className="flex justify-between align-start w-full gap-x-3 items-center">
                  <div className="flex justify-between align-start ">
                    <div className="bani-toast-icon mr-[20px]">{toastIcon}</div>
                    <div className="bani-toast-message">
                      <span className="bani-toast-header helv-medium text-[14px] text-[#334155] font-medium">
                        {message.props.title}
                      </span>
                      <p className="helv-regular text-[#64748B] bani-toast-content text-sm mt-[2px]">
                        {message.props.children}
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <p
                      onClick={() => toast.dismiss(t.id)}
                      className="text-blue helv-medium text-[12px] cursor-pointer"
                    >
                      <IoCloseOutline size={32} color="#334155" />
                    </p>
                  </div>
                </div>
                {/* <ToastLoader type={t.type} duration={t.duration} /> */}
              </div>
            );
          }}
        </ToastBar>
      )}
    </Toaster>
  );
};

export const warningToast = (title, message) => {
  toast(message, {
    ...defaultConfig,
    ariaProps: {
      role: "warning",
      title,
    },
  });
};

export const successToast = (title, message) => {
  toast.success(message, {
    ...defaultConfig,
    ariaProps: {
      role: "success",
      title,
    },
  });
};

export const errorToast = (title, message) => {
  toast.error(message, {
    ...defaultConfig,
    ariaProps: {
      role: "error",
      title,
    },
  });
};

export default Toast;
