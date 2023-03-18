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
//routes
import { Routes } from "../../../routes/Routes";
import { Account } from "@near-wallet-selector/core";
import { logoutBusiness } from "../../../store/features/authentication/authentication.actions";
import { useWalletSelector } from "../../../contexts/WalletSelectorContext";

import "./index.css";
import Popper from "popper.js";

import { baseURL as serverBaseURL } from "../../../axiosConfig";

export default function NavbarQstn() {
  const { businessAuthenticated } = useAppSelector(
    (state) => state.businessReducer.business
  );
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
    console.log("ok");
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
                <div className="relative userNameBox">
                  <img
                    src={
                      businessAuthenticated.avatar
                        ? `${serverBaseURL}/${businessAuthenticated.avatar}`
                        : images.user
                    }
                    className="rounded-full"
                  />
                </div>
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
                {businessAuthenticated.account_status === 1 && (
                  <div className="border-b-[1px] flex flex-col gap-2 font-poppins">
                    <p className="text-[24px] text-[#23262F] m-0 mt-3">
                      {businessAuthenticated.display_name}
                    </p>
                    {/* <div
                          className="flex gap-2 w-max my-2 cursor-pointer"
                          onClick={() => handleSignIn()}
                        >
                          <img
                            className="w-[22px]"
                            src={images.nearLogin}
                          />
                          {accountId ? accountId : <span className="text-[#f00] text-sm">Not Connected</span>}
                        </div> */}
                    <div className="border-t-2 mt-2" />
                    <button
                      className="dropdown-item gap-2 border-b-[1px]"
                      onClick={() => {
                        navigate(Routes.SURVEY_LIST, {
                          state: {
                            surveyCreated: true,
                          },
                        });
                      }}
                    >
                      <BsFillMegaphoneFill size={24} />
                      My campaign
                    </button>
                    <Link
                      className="dropdown-item gap-2 border-b-[1px]"
                      to={Routes.SURVEYS_PAYMENTMETHOD_SELECTION}
                    >
                      <BiWallet size={24} />
                      Payment
                    </Link>
                    <Link
                      className="dropdown-item gap-2 border-b-[1px]"
                      to={Routes.SETTINGS}
                    >
                      <GoSettings size={24} />
                      Settings
                    </Link>
                    <Link
                      className="dropdown-item gap-2 border-b-[1px]"
                      to={Routes.MEMBERSHIP}
                    >
                      <FaMedal size={24} />
                      Membership
                    </Link>
                    <Link
                      className="dropdown-item gap-2 border-b-[1px]"
                      to={Routes.EARNINGS}
                    >
                      <HiCurrencyDollar size={24} />
                      Earnings
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => {
                    dispatch(logoutBusiness());
                    handleSignOut();
                    window.location.replace("/");
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

        <div className="gird">
          <div className="justify-self-right flex max-md:justify-end items-center w-full gap-4">
            <div className="max-md:hidden pl-3">
              <input
                className="py-2 px-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none text-sm rounded-xl relative right-[-5px] w-full"
                id="business_search"
                placeholder="Search"
              />
            </div>
            <div className="flex gap-1 items-center mr-2">
              {!loading && <DisplayNavBasedOnAuthStatus />}
              <button className="bg-[#3772FF] text-base mr-2 border-none px-3 py-2 text-white font-segoe-ui font-bold rounded-full w-max m-auto justify-center flex custom-dropdown">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
