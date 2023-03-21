import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import images from "../../assets";
import { Routes } from "../../routes/Routes";

export default function AuthModal({
  closeAuthModal,
  authModal,
}: {
  closeAuthModal: () => void;
  authModal: {
    show: boolean;
    type: string;
  };
}) {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#000000cb] fixed top-0 left-0 z-30">
      <div className="bg-white rounded-3xl w-[804px] relative top-10 mx-auto max-[804px]:w-[402px] max-[804px]:h-[calc(100vh-80px)]">
        <div className="flex max-[804px]:absolute max-[804px]:-top-1 custom-scrollbar max-[804px]:my-6 max-[804px]:mr-0 max-[804px]:h-[calc(100%-36px)] max-[804px]:flex-wrap max-[804px]:overflow-y-auto overflow-x-hidden">
          <button onClick={closeAuthModal} className="absolute top-5 right-5">
            <IoIosCloseCircleOutline className="w-[40px] h-auto" />
          </button>
          <div className="min-[804px]:border-r-[1px] max-[804px]:border-b-[1px] max-sm:w-full flex flex-col items-center py-10 p-4 min-w-[354px]">
            <p className="text-[30px] font-segoe-ui font-bold -tracking-wider mb-11">
              User
            </p>
            <p className="text-[13px] text-[#777E91]">
              This is for general users who wish to complete surveys earn
              rewards and spend them within our marketplace
            </p>
            <img
              src={images.authUser}
              alt="User"
              className="w-[150px] h-[150px] rounded-full my-8"
            />
            <button
              className="bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[262px] gap-2 mt-5"
              onClick={() => {
                navigate(
                  authModal.type == "register" ? Routes.REGISTER : Routes.LOGIN
                );
                closeAuthModal();
              }}
            >
              {authModal.type == "register"
                ? "Register as a user"
                : "Login as a user"}
            </button>
          </div>
          <div className="max-sm:w-full flex flex-col items-center py-10 p-4 min-w-[354px]">
            <p className="text-[30px] font-segoe-ui font-bold -tracking-wider mb-11">
              Business
            </p>
            <p className="text-[13px] text-[#777E91]">
              This is for businesses who wish to create surveys reward
              respondents and track their marketing insights
            </p>
            <img
              src={images.authBusiness}
              alt="Business"
              className="w-[150px] h-[150px] rounded-full my-8"
            />
            <button
              className="bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[262px] gap-2 mt-5"
              onClick={() => {
                navigate(
                  authModal.type == "register" ? Routes.REGISTER : Routes.LOGIN
                );
                closeAuthModal();
              }}
            >
              {authModal.type == "register"
                ? "Register as a business"
                : "Login as a business"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
