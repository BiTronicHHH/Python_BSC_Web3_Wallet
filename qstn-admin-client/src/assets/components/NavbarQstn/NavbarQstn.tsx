import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import React from "react";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import { providers, utils } from "near-api-js";
import images from "../..";
import { createRef, useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/redux-hooks/hooks";
// React Icons
import { HiCurrencyDollar, HiOutlineMegaphone } from "react-icons/hi2";
import { GoSettings } from "react-icons/go";
import { MdPermMedia } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { FaMedal } from "react-icons/fa";
import { BiLogOut, BiWallet } from "react-icons/bi";
import { BsFillMegaphoneFill } from "react-icons/bs";
import AuthModal from "../AuthModal";
//routes
import { Routes } from "../../../routes/Routes";
import { Account } from "@near-wallet-selector/core";
import { logoutBusiness } from "../../../store/features/authentication/authentication.actions";
import { useWalletSelector } from "../../../contexts/WalletSelectorContext";

import "./index.css";
import Popper from "popper.js";

import { baseURL as serverBaseURL } from "../../../axiosConfig";
import businessReducer from "../../../store/features/business/businessSlice";

const NavbarQstn = () => {
  // const { businessAuthenticated } = useAppSelector(
  //   (state) => state.businessReducer.business
  // );
  const businessAuthenticated = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openRoutesList, setOpenRoutesList] = useState(false);
  const [authModal, setAuthModal] = useState<{
    show: boolean;
    type: string;
  }>({
    show: false,
    type: "",
  });

  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data: any) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
    });
  }, [accountId, getAccount]);

  const handleSignIn = () => {
    modal.show();
  };

  const handleSignOut = async () => {
    const wallet = await selector.wallet();
    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  if (loading) {
    return null;
  }

  const DisplayNavBasedOnAuthStatus = () => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState<Number>(0);
    const btnDropdownRef: any = createRef();
    const popoverDropdownRef: any = createRef();
    const location = useLocation();
    const openDropdownPopover = (index: Number) => {
      new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: index == 2 ? "bottom-end" : "bottom-start",
      });
      setDropdownPopoverShow(index);
    };
    const closeDropdownPopover = () => {
      setDropdownPopoverShow(0);
    };
    if (businessAuthenticated) {
      return (
        <div className="flex flex-wrap">
          <div className="w-full px-2">
            <div className="relative inline-flex w-full">
              <button
                className="bg-[#3772FF] text-base mr-2 border-none px-3 py-2 text-white font-segoe-ui font-bold rounded-full w-max m-auto justify-center flex custom-dropdown"
                onClick={() => {
                  dropdownPopoverShow == 1
                    ? closeDropdownPopover()
                    : openDropdownPopover(1);
                }}
              >
                Upload
              </button>
              <button
                className="flex items-center gap-2 border-2 rounded-3xl p-[4px] navdropdown-custom custom-dropdown"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow == 2
                    ? closeDropdownPopover()
                    : openDropdownPopover(2);
                }}
              >
                <div className="relative userNameBox"></div>
              </button>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow == 1 ? "block " : "hidden ") +
                  "z-50 float-left py-2 rounded text-sm font-bold upload dropdown-menu text-[#777E90] absolute"
                }
              >
                <button
                  onClick={() => {
                    navigate(Routes.UPLOAD_MEDIA);
                  }}
                  className="gap-2 flex dropdown-item border-b-[1px]"
                >
                  <MdPermMedia />
                  Create New Media
                </button>
                <button
                  onClick={() => {
                    navigate(Routes.CREATE_SURVEY);
                  }}
                  className="gap-2 flex dropdown-item"
                >
                  <FcSurvey />
                  Create New Survey
                </button>
              </div>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow == 2 ? "block " : "hidden ") +
                  "z-50 float-left py-2 rounded text-sm font-bold dropdown-menu text-[#777E90]"
                }
              >
                <button
                  onClick={() => {
                    dispatch(logoutBusiness());
                    handleSignOut();
                    window.location.replace("/login");
                  }}
                  className="gap-2 flex dropdown-item"
                >
                  <BiLogOut size={24} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="container mx-auto py-2">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          {" "}
          <img
            src={images.logo}
            alt="logo"
            className="lg:border-r-2 pr-4 py-2 mr-4"
          />
        </Link>
        <div className="flex justify-between max-md:justify-end items-center w-full">
          <div className="max-md:hidden pl-3"></div>
          <div className="flex gap-1 items-center mr-2">
            {!loading && <DisplayNavBasedOnAuthStatus />}
            <button
              className="border-2 rounded-md p-2 md:hidden"
              onClick={() => setOpenRoutesList((p) => !p)}
            >
              <svg
                stroke="currentColor"
                fill="#6b7280"
                strokeWidth="0"
                viewBox="0 0 12 16"
                className="h-6 w-6 shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {authModal.show ? (
          <AuthModal
            closeAuthModal={() =>
              setAuthModal({
                show: false,
                type: "",
              })
            }
            authModal={authModal}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NavbarQstn;
