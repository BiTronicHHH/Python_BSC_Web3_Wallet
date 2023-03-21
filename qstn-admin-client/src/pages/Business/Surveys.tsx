import { useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiArrowLongLeft, HiOutlineMegaphone } from "react-icons/hi2";
import { AiOutlineFlag, AiOutlineInfoCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../routes/Routes";
import images from "../../assets";
import {
  fetchSurveysByUser,
  inviteToSurvey,
  publishSurvey,
} from "../../store/features/survey/Survey.actions";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks/hooks";
import "./index.css";
import { CiCircleChevDown, CiEdit } from "react-icons/ci";
import { IoClose, IoCopyOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

import { Survey as SurveyType } from "../../store/features/types";
import { clearSurveyState } from "../../store/features/survey/Survey.slice";

export interface FilterType {
  industry: "all" | "trending" | "recommend";
  category: "all" | "commerical";
  type: "all" | "paid" | "unpaid";
  creator: "all" | "verified-only" | "not-verified-only";
  blockchain: "bitcoin" | "ethereum" | "bsc" | "near";
}

export interface TagifyType {
  value: string;
}

export type ModalType = {
  show: boolean;
  type: "publish" | "invite" | "delete" | "";
  surveyId: String;
};

const Surveys = () => {
  const {
    loading,
    surveysList,
    surveyPublished,
    surveyDeleted,
    invitationSuccess,
  } = useAppSelector((state) => state.surveyReducer.survey);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [surveyList, setSurveyList] = useState<SurveyType[]>([]);
  const [active, setActive] = useState<FilterType["industry"]>("all");
  const [isSurveyCopied, setIsSurveyCopied] = useState(-1);
  const [surveyPublish, setIsSurveyPublish] = useState(-1);
  const [surveyInvite, setIsSurveyInvite] = useState(-1);
  const [surveyDelete, setIsSurveyDelete] = useState(-1);
  const [toagifyValue, setToagigyValue] = useState<string>("");
  const [emailsList, setEmailsList] = useState<Array<String> | []>([]);
  const [countInviatedUsers, setCountInviatedUsers] = useState(0);
  const tagifyRef = useRef();
  const [modal, setModal] = useState<ModalType>({
    type: "",
    show: false,
    surveyId: "",
  });

  const dispatchAction = () => {
    switch (modal.type) {
      case "publish":
        dispatch(publishSurvey(modal.surveyId));
        setModal({
          show: false,
          type: "",
          surveyId: "",
        });
        setIsSurveyPublish(-1);
        break;
      case "invite":
        dispatch(inviteToSurvey({ surveyId: modal.surveyId, emailsList }));
        setModal({
          show: false,
          type: "",
          surveyId: "",
        });
        setIsSurveyInvite(-1);
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchSurveysByUser());
  }, [surveyPublished, surveyDeleted]);

  useEffect(() => {
    dispatch(fetchSurveysByUser());
  }, []);

  useEffect(() => {
    setSurveyList(surveysList);
  }, [loading]);

  useEffect(() => {
    if (surveyPublished || surveyDeleted || invitationSuccess) {
      setModal({
        type: "",
        show: false,
        surveyId: "",
      });
      setEmailsList([]);
    }
    return () => {
      if (surveyPublished || surveyDeleted || invitationSuccess) {
        dispatch(clearSurveyState());
      }
    };
  }, [surveyPublished, surveyDeleted, invitationSuccess]);

  useEffect(() => {
    if (isSurveyCopied != -1) {
      setTimeout(() => {
        setIsSurveyCopied(-1);
      }, 1000);
    }
  }, [isSurveyCopied]);

  const handleTagifyChange = (values: string) => {
    let _values: TagifyType[] = values ? JSON.parse(values) : [];
    if (!validateEmail(_values[_values.length - 1]?.value)) _values.pop();
    setCountInviatedUsers(_values.length);
    setEmailsList(_values.map((_value) => _value.value));
    let _toagifyValue = "";
    _toagifyValue += _values.map((email) => email.value) + ",";
    setToagigyValue(_toagifyValue);
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (toagifyValue.length && toagifyValue[toagifyValue.length - 1] == ",") {
      let _toagifyValue = toagifyValue.slice(0, -1);
      setToagigyValue(_toagifyValue);
    }
  }, [toagifyValue]);

  return (
    <>
      <div className="container mx-auto py-2">
        {/* <button
          className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
          onClick={() => navigate("/onboarding")}
        >
          <HiArrowLongLeft />
          Back
        </button> */}
      </div>
      {!loading ? (
        <div>
          <div className="flex container mx-auto py-2 justify-between items-center">
            <button
              className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
              onClick={() => navigate(Routes.HOME)}
            >
              <HiArrowLongLeft />
              Back to home
            </button>
            <div className="gap-1 items-center mr-2">Home - My Surveys</div>
          </div>
          <div className="filter-section container mx-auto py-10">
            <div className="flex justify-between mb-10">
              <p className="text-4xl font-bold tracking-[-1px]  mb-10">
                Surveys
              </p>
              <button
                className="top-[-10px] max-sm:top-[-60px] right-5 bg-[#3772FF] px-5 py-3 text-white rounded-full font-bold font-segoe-ui border-none"
                onClick={() => {
                  navigate(Routes.CREATE_SURVEY);
                }}
              >
                + create survey
              </button>
            </div>

            <div className="relative">
              <div className="flex flex-wrap gap-3 font-bold text-xs mb-10 w-max max-sm:w-full">
                <button
                  className={
                    (active === "all"
                      ? "bg-[#353945] text-[white]"
                      : "bg-transparent text-[#777E90]") +
                    " rounded-full px-3 py-1"
                  }
                  onClick={() => setActive("all")}
                >
                  All
                </button>
                <button
                  className={
                    (active === "trending"
                      ? "bg-[#353945] text-[white]"
                      : "bg-transparent text-[#777E90]") +
                    " rounded-full px-3 py-1"
                  }
                  onClick={() => setActive("trending")}
                >
                  Trending
                </button>
                <button
                  className={
                    (active === "recommend"
                      ? "bg-[#353945] text-[white]"
                      : "bg-transparent text-[#777E90]") +
                    " rounded-full px-3 py-1"
                  }
                  onClick={() => setActive("recommend")}
                >
                  Recommended
                </button>
              </div>
              <button className=" absolute top-[-10px] max-sm:top-[-60px] right-5 bg-[#3772FF] px-4 py-2 text-white rounded-3xl font-bold border-none">
                Filter &times;
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <div>
                <label
                  htmlFor="price"
                  className="pl-2 text-xs font-poppins font-bold text-[#B1B5C4]"
                >
                  Category
                </label>
                <div id="price" className="relative mb-2 mr-5 w-[250px] mt-1">
                  <select
                    defaultValue="high"
                    className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                  >
                    <option value="high">Commercial</option>
                    <option value="low">All</option>
                  </select>
                  <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="pl-2 text-xs font-poppins font-bold text-[#B1B5C4]"
                >
                  Type
                </label>
                <div id="status" className="relative mb-2 mr-5 w-[250px] mt-1">
                  <select
                    defaultValue="verified"
                    className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                  >
                    <option value="all">All</option>
                    <option value="verified">Paid</option>
                    <option value="not-verified">Unpaid</option>
                  </select>
                  <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="creator"
                  className="pl-2 text-xs font-poppins font-bold text-[#B1B5C4]"
                >
                  Creator
                </label>
                <div id="creator" className="relative mb-2 mr-5 w-[250px] mt-1">
                  <select
                    defaultValue="verified-only"
                    className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                  >
                    <option value="all">All</option>
                    <option value="verified-only">Verified only</option>
                    <option value="not-verified-only">Not Verified only</option>
                  </select>
                  <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="update"
                  className="pl-2 text-xs font-poppins font-bold text-[#B1B5C4]"
                >
                  Blockchain
                </label>
                <div id="update" className="relative mb-2 mr-5 w-[250px] mt-1">
                  <select
                    defaultValue="recent"
                    className="p-3 border-2 max-sm:!w-[100vw] focus:ring-blue-500 focus:border-blue-500 border-3 outline-none rounded-xl relative right-[-5px] w-full"
                  >
                    <option value="recent">Bitcoin</option>
                    <option value="old">Ethereum</option>
                    <option value="old">BSC</option>
                    <option value="old">Near</option>
                  </select>
                  <CiCircleChevDown className="w-[32px] h-[32px] bg-white absolute bottom-2 right-0 text-[#777E91]" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative ">
            <div className="flex items-center container mx-auto h-[620px]">
              <div className="custom-scrollbar flex flex-col max-sm:w-full max-h-[620px] overflow-x-hidden overflow-y-auto absolute z-20 scroll-smooth">
                {surveyList.map((survey: SurveyType, index) => {
                  let createdDay = Math.floor(
                    (new Date().getTime() -
                      new Date(survey.created_at).getTime()) /
                      (1000 * 3600 * 24)
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between m-1 p-4 rounded-xl border-2 w-[640px] max-sm:w-full bg-[#fffffff3]"
                    >
                      <div className="flex gap-2 items-center relative">
                        <img
                          src={images.survey}
                          alt="Profile Avatar"
                          className="w-[96px] h-[96px] rounded-full"
                        />
                        {/* <div className="roll absolute top-0 left-[66px]">
                        {survey.role == 'editable' ? <div className="w-[29px] h-[29px] bg-[#777E91] p-2 rounded-full text-white"><CiEdit size={'sm'} /></div> : <></>}
                        {survey.role == 'premium' ? <div className="w-[29px] h-[29px] bg-[#EF466F] p-2 rounded-full text-white"><AiOutlineFlag size={'sm'} /></div> : <></>}
                        {survey.role == 'common' ? <div className="w-[29px] h-[29px] bg-[#45B36B] p-2 rounded-full text-white"><HiOutlineMegaphone size={'sm'} /></div> : <></>}
                      </div> */}
                        <div className="flex flex-col font-normal">
                          <p className="text-2xl">
                            {survey.title
                              ? survey.title
                              : "Survey " + (index + 1)}
                          </p>
                          <p className="text-base text-[#353945] mt-1">
                            {survey.description}
                          </p>
                          <p className="text-xs text-[#777E91] mt-1">
                            {createdDay ? createdDay + " days ago" : "Just ago"}
                          </p>
                        </div>
                      </div>
                      {!survey.status ? (
                        <div className="flex justify-center items-center gap-3">
                          <div className="flex flex-col items-center">
                            <label className="toggle-switch my-1">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  if (surveyPublish == -1) {
                                    setIsSurveyPublish(index);
                                    setModal({
                                      show: true,
                                      type: "publish",
                                      surveyId: survey._id,
                                    });
                                  } else setIsSurveyPublish(-1);
                                }}
                                checked={surveyPublish == index ? true : false}
                              />
                              <span className="switch" />
                            </label>
                            <p className="text-[9px] font-normal">Publish</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className="w-[29px] h-[29px] bg-[#3772FF] p-2 rounded-full text-white">
                              <BsPencil size={"sm"} />
                            </button>
                            <p className="text-[9px] font-normal">Edit</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <button
                              className="w-[29px] h-[29px] bg-[#EF466F] p-2 rounded-full text-white"
                              onClick={() => {
                                setIsSurveyDelete(index);
                                setModal({
                                  show: true,
                                  type: "delete",
                                  surveyId: survey._id,
                                });
                              }}
                            >
                              <RiDeleteBin6Line size={"sm"} />
                            </button>
                            <p className="text-[9px] font-normal">Delete</p>
                          </div>
                        </div>
                      ) : survey.type == 1 ? (
                        <div className="flex flex-col items-center relative">
                          <div
                            className="w-[29px] h-[29px] rounded-full bg-[#3772FF] flex justify-center items-center cursor-pointer"
                            onClick={() => setIsSurveyCopied(index)}
                          >
                            <IoCopyOutline
                              color="white"
                              className="text-[20px]"
                            />
                          </div>
                          <p className="text-[9px] font-normal">Copy Link</p>
                          {isSurveyCopied == index ? (
                            <div className="absolute flex items-center gap-1 p-3 border-[1px] rounded-lg bg-white z-100 -bottom-12 -right-1">
                              <div className="w-[10px] h-[10px] bg-[#45B36B] rounded-full" />
                              <p className="text-[11px] text-[#777E91] w-max">
                                Survey Link copied !
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div className="w-max flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-[29px] h-[29px] rounded-full bg-[#3772FF] flex justify-center items-center cursor-pointer"
                              onClick={() => {
                                setIsSurveyInvite(index);
                                setModal({
                                  show: true,
                                  type: "invite",
                                  surveyId: survey._id,
                                });
                              }}
                            >
                              <FaUser color="white" className="text-[18px]" />
                            </div>
                            <p className="text-[9px] font-normal">Invite</p>
                          </div>
                          <div className="flex flex-col items-center relative">
                            <div
                              className="w-[29px] h-[29px] rounded-full bg-[#3772FF] flex justify-center items-center cursor-pointer"
                              onClick={() => setIsSurveyCopied(index)}
                            >
                              <IoCopyOutline
                                color="white"
                                className="text-[20px]"
                              />
                            </div>
                            <p className="text-[9px] font-normal">Copy Link</p>
                            {isSurveyCopied == index ? (
                              <div className="absolute flex items-center gap-1 p-3 border-[1px] rounded-lg bg-white z-100 -bottom-12 -right-1">
                                <div className="w-[10px] h-[10px] bg-[#45B36B] rounded-full" />
                                <p className="text-[11px] text-[#777E91] w-max">
                                  Survey Link copied !
                                </p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <img
                src={images.onboardingImg}
                alt="Auth"
                className="max-md:hidden h-[562px] absolute z-10 right-0"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {modal.show ? (
        <div className="w-screen h-screen bg-[#000000cb] fixed z-50 top-0 left-0">
          <div className="flex flex-col items-center justify-center h-full">
            {modal.type == "publish" && surveyPublish != -1 ? (
              <div className="flex flex-col relative items-center w-[448px] h-[367px] rounded-3xl bg-white p-8">
                <button
                  className="flex justify-center items-center border-2 w-[40px] h-[40px] rounded-full absolute right-6 top-6"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyPublish(-1);
                  }}
                >
                  <IoClose size={"25px"} />
                </button>
                <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#9757D7] rounded-full mt-16">
                  <AiOutlineInfoCircle color="white" size={"20px"} />
                </div>
                <p className="text-base text-center font-semibold my-6">
                  Are you sure you want to publish this survey?
                </p>
                <button
                  className="absolute bottom-24 bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={dispatchAction}
                >
                  Confirm
                </button>
                <button
                  className="absolute bottom-8 bg-white font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyPublish(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : modal.type == "invite" && surveyInvite != -1 ? (
              <div className="flex flex-col relative items-center w-[448px] min-h-[471px] rounded-3xl bg-white p-8">
                <button
                  className="flex justify-center items-center border-2 w-[40px] h-[40px] rounded-full absolute right-6 top-6"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyPublish(-1);
                  }}
                >
                  <IoClose size={"25px"} />
                </button>
                <p className="text-xl text-left w-full ">Send Invitations</p>
                <p className="text-[15px] mt-12 mb-6">
                  Enter users emails you eant to invite to take the survey.
                </p>
                <div className="w-full min-h-[96px] border-2 border-[#3772FF] rounded-lg">
                  <Tags
                    tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
                    value={toagifyValue}
                    className="customLook"
                    onChange={(e) => {
                      handleTagifyChange(e.detail.value);
                    }}
                    autoFocus
                  />
                </div>
                <p className="text-[15px] text-right w-full mt-1">
                  {countInviatedUsers}/
                  <span className="font-poppins-bold">100</span> Users Invited
                </p>
                <button
                  className="bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={dispatchAction}
                >
                  Send Invite
                </button>
                <button
                  className="bg-white font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyInvite(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : modal.type == "delete" && surveyDelete != -1 ? (
              <div className="flex flex-col relative items-center w-[448px] min-h-[367px] rounded-3xl bg-white p-8">
                <button
                  className="flex justify-center items-center border-2 w-[40px] h-[40px] rounded-full absolute right-6 top-6"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyDelete(-1);
                  }}
                >
                  <IoClose size={"25px"} />
                </button>
                <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#EF466F] rounded-full mt-16">
                  <AiOutlineInfoCircle color="white" size={"20px"} />
                </div>
                <p className="text-base text-center font-semibold my-6">
                  Are you sure you want to delete this survey?
                </p>
                <button
                  className="bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={dispatchAction}
                >
                  Confirm
                </button>
                <button
                  className="bg-white font-segoe-ui text-sm border-2 py-3 font-bold rounded-3xl w-[384px] gap-2 mt-5"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyDelete(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col relative items-center w-[448px] min-h-[471px] rounded-3xl bg-white p-8">
                <p className="text-5xl font-bold font-segoe-ui -tracking-wider">
                  Yay! 🎉
                </p>
                <p className="text-center font-[500] mt-20">
                  Congratulations,
                  <br /> you successfully invited {countInviatedUsers} users
                </p>
                <div className="bg-[#ECF7F0] p-4 my-12 m-2">
                  <p className="text-base text-[#45B36B] text-center">
                    You can always invite more users later within your audience
                    range
                  </p>
                </div>
                <button
                  className=" bg-[#3772FF] border-none font-segoe-ui text-sm text-white border-2 py-3 font-bold rounded-3xl w-[384px] gap-2"
                  onClick={() => {
                    setModal({
                      show: false,
                      type: "",
                      surveyId: "",
                    });
                    setIsSurveyPublish(-1);
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Surveys;
