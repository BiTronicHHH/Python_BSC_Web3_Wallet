import { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { BsArrowRightShort, BsCheckCircleFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbFileUpload } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import BusinessCard from "../../assets/components/BusinessCard";
import { Routes } from "../../../src/routes/Routes";
import { uploadImage } from "../../../src/store/features/media/media.actions";
import { clearMediaState } from "../../../src/store/features/media/media.slice";
import * as hooks from "../../../src/store/redux-hooks/hooks";

export type MediaType = {
  image: Array<any>;
  display_name: string;
  email: string;
  bio: number;
};

const schema = yup.object().shape({
  image: yup
    .mixed()
    .required("please select a media file")
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg, .png",
      (value) => {
        return (
          value &&
          (value[0]?.type === "image/jpeg" ||
            value[0]?.type === "image/png" ||
            value[0]?.type === "image/png")
        );
      }
    ),
  display_name: yup
    .string()
    .required("Please enter a display_name for your media."),
  email: yup.string().required("Please enter a email for your media."),
  bio: yup.string().required("enter number of bio for your media."),
});

const Badd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = hooks.useAppDispatch();

  const [uploadedMedia, setUploadedMedia] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [asPrivate, setAsPublish] = useState<Boolean>(false);
  const [isNFTPrize, setIsNFTPrize] = useState<Boolean>(false);
  const [open, setOpen] = useState<Boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { mediaUploaded, loading, MediaErrors } = hooks.useAppSelector(
    (state) => state.mediaReducer.media
  );

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<MediaType>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const submitForm: SubmitHandler<MediaType> = async (formData) => {
    setIsLoading(true);
    await dispatch(uploadImage({ ...formData }));
    if (isNFTPrize) navigate(Routes.SURVEY_CREATOR_WIDGET);
    else navigate(Routes.BUSINESS);
  };

  useEffect(() => {
    //clean up
    return () => {
      if (MediaErrors !== null || mediaUploaded) {
        dispatch(clearMediaState());
      }
    };
  }, [mediaUploaded, MediaErrors]);

  useEffect(() => {
    if (location.state && location.state.nftPrize == true) {
      setIsNFTPrize(true);
    }
  }, []);

  useEffect(() => {
    // console.log("------>", { ...register("bio") });
  }, [register]);

  return (
    <>
      <div className="">
        <div className="flex container mx-auto py-2 justify-between items-center ">
          <button
            className="border-[#e6e8ec]  text-sm border-2 px-3 py-2 my-2 font-bold rounded-3xl w-max flex gap-2 justify-between items-center"
            onClick={() => navigate(Routes.HOME)}
          >
            <HiArrowLongLeft />
            Back to home
          </button>
          <div className="gap-1 items-center mr-2">
            Home - Manage Businesses
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-20">
        <div className="flex flex-wrap-reverse justify-between py-5 mx-auto w-9/12">
          <div className="flex flex-col w-[680px] max-sm:w-full relative">
            <div className="my-5">
              <label className="text-xs text-[#777E91] font-normal">
                You can invite businesses to join the platform.
              </label>
              {/* <div className="mt-2 w-full h-full">
                  <input
                    className="custom-input w-full absolute opacity-0 rounded-full"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    placeholder="please select media to upload"
                    {...register("image")}
                    onChange={(e: any) => {
                      setUploadedMedia(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <div className="flex items-center justify-center w-[180px] h-[180px] bg-[#f4f5f6] text-[#777E91] border-2 rounded-full ">
                    {uploadedMedia && (
                      <img
                        src={uploadedMedia}
                        alt="BusinessCard"
                        className="w-auto h-[120px] m-auto"
                      />
                    )}
                  </div>
                </div> */}
            </div>
            <form
              onSubmit={handleSubmit(submitForm)}
              noValidate
              className="flex"
            >
              <div className="mt-2 flex w-1/2">
                <div className="bg-emerald-600 mr-5 flex items-center justify-center w-[6rem] h-[6rem]  border-2 rounded-full">
                  {uploadedMedia && (
                    <img
                      src={uploadedMedia}
                      alt="BusinessCard"
                      className="h-[6rem] w-full m-auto rounded-full"
                    />
                  )}
                </div>
                <div className="w-1/2">
                  <label className="mb-4 font-bold">Business logo</label>
                  <div className="mb-4">
                    <p>We recommend an image of at least 400x400.</p>
                    <button
                      className="bg-green border-[#e6e8ec] z-1 relative text-sm border-2 px-3 py-3 my-6 font-bold rounded-3xl w-max flex gap-2 justify-center items-center"
                      placeholder="please select media to upload"
                      // onClick={(e: any) => {
                      //   setUploadedMedia(
                      //     URL.createObjectURL(e.target.files[0])
                      //   );
                      // }}
                    >
                      uplaod
                      <input
                        className="ml-[41px] absolute h-[45px] w-[40px] left-[-40px] opacity-0 rounded-full z-0"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        placeholder="please select media to upload"
                        {...register("image")}
                        onChange={(e: any) => {
                          setUploadedMedia(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                {open && (
                  <div className="bg-[#45B26B14] flex justify-center items-center rounded-[5px] w-[384px] h-[93px] text-[#45B26B] mb-[10px]">
                    <BsCheckCircleFill className="mr-[20px] text-[30px]" />
                    <div>
                      <p className="text-[16px]">Invitation successfull</p>
                      <p className="text-[12px]">Business invitation is sent</p>
                    </div>
                  </div>
                )}
                <p className="text-base mb-4">Account info</p>
                <div className="mb-3">
                  <label className="label-custom text-[#B1B5C4]">
                    DISPLAY NAME
                  </label>
                  <div className="relative">
                    <input
                      className="custom-input w-full"
                      type="text"
                      // onChange={(e) => {
                      //   setName(e.target.value);
                      // }}
                      placeholder='e. g. "Cocaccoa"'
                      {...register("display_name")}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="label-custom text-[#B1B5C4]">Email</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="custom-input w-full"
                      placeholder="e. g. Cocaccoa@gmail.com"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="label-custom text-[#B1B5C4]">BIO</label>
                  <div className="relative">
                    <input
                      type="area"
                      className="h-32 custom-input w-full"
                      placeholder="write a brief bio about the company"
                      {...register("bio")}
                    />
                  </div>
                </div>

                <div className="my-10 flex gap-10 max-sm:flex-wrap items-center border-t-[1px]"></div>

                <div className="flex justify-start gap-3 pt-1">
                  <button
                    className={
                      !isValid
                        ? "bg-[#e2e1e4] text-base border-none px-5 py-2 text-white font-bold font-segoe-ui rounded-full mb-2"
                        : "bg-[#3772FF] text-base border-none px-5 py-2 text-white font-bold font-segoe-ui rounded-full mb-2"
                    }
                    // className={
                    //   (!isValid ? "bg-[#92A9DE]" : "bg-[#3772FF]") +
                    //   " text-base border-none px-5 py-2 text-white font-bold font-segoe-ui rounded-full"
                    // }
                    disabled={!isValid ? true : false}
                    onClick={() => {
                      setOpen(true);
                    }}
                    type="submit"
                  >
                    <p className="flex gap-1 items-center">
                      Invite <BsArrowRightShort />
                    </p>
                  </button>
                  <button className="text-[#777E91] text-sm border-none px-3 py-2 font-bold font-segoe-ui rounded-full w-max flex gap-2 justify-between items-center">
                    <IoIosCloseCircleOutline />
                    Clear all
                  </button>
                </div>
              </div>
            </form>
          </div>
          {!isNFTPrize ? (
            <p className="text-5xl font-bold -tracking-wider font-segoe-ui">
              Add a Business
            </p>
          ) : (
            <div>
              <p className="text-5xl font-bold -tracking-wider font-segoe-ui ">
                Upload nft prize
              </p>
              <p className="text-sm text-[#777E91] font-normal mt-3">
                upload a nft prize for your users once they complete survey
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Badd;
