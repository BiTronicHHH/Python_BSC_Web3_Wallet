import "./index.css";

import { useEffect, useRef, useState } from "react";

import images from "../../../assets";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/redux-hooks/hooks";
import { uploadImage } from "../../../store/features/media/media.actions";
import { useLocation, useNavigate } from "react-router-dom";
import { clearMediaState } from "../../../store/features/media/media.slice";
import { TbFileUpload } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsArrowRightShort } from "react-icons/bs";
// import Media from "../../../components/Media";
import Media from "../../../assets/components/Media";
import { Routes } from "../../../routes/Routes";

export type MediaType = {
  image: Array<any>;
  title: string;
  description: string;
  copies: number;
  price: number;
  private: Boolean;
};

// validation schema

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
  title: yup.string().required("Please enter a title for your media."),
  description: yup
    .string()
    .required("Please enter a description for your media."),
  copies: yup
    .string()
    .required("enter number of copies for your media.")
    .test(
      "Is positive?",
      "copies number must be greater than 0!",
      (value: any) => parseInt(value) > 0
    ),
  price: yup
    .string()
    .required("setting a price is required.")
    .test(
      "Is positive?",
      "please enter a valid price for your media",
      (value: any) => parseInt(value) > 0
    ),
  private: yup.boolean(),
});

export type ToastType = {
  show: boolean;
  title: "" | "success" | "error";
  body:
    | ""
    | "your Media is uploaded successfully!"
    | "Something Went Wrong Please try again";
  type: "success" | "danger" | "";
  class: "custom-toast-success " | "custom-toast-error" | "" | "d-none";
};

const UploadMedia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [uploadedMedia, setUploadedMedia] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [asPrivate, setAsPublish] = useState<Boolean>(false);
  const [isNFTPrize, setIsNFTPrize] = useState<Boolean>(false);

  const { mediaUploaded, loading, MediaErrors } = useAppSelector(
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

  // const [toast, seToast] = useState<ToastType>({
  //   type: "",
  //   show: false,
  //   body: "",
  //   title: "",
  //   class: "",
  // });

  const submitForm: SubmitHandler<MediaType> = async (formData) => {
    setIsLoading(true);
    // await dispatch(uploadImage({ ...formData, private: asPrivate }));
    if (isNFTPrize) navigate(Routes.SURVEY_CREATOR_WIDGET);
    else navigate(Routes.MARKETPLACE);
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

  return (
    <>
      <div className="top-header"></div>
      <div className="container mx-auto pt-20">
        {!isNFTPrize ? (
          <p className="text-5xl font-bold -tracking-wider font-segoe-ui ">
            Upload Media
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

        <div className="flex flex-wrap-reverse justify-between py-5">
          <div className="flex flex-col w-[640px] max-sm:w-full relative">
            <form onSubmit={handleSubmit(submitForm)} noValidate>
              <div className="mb-3">
                <p className="text-base">Upload file</p>
                <label className="text-xs text-[#777E91] font-normal">
                  Drag or choose your file to upload
                </label>
                <div className="relative mt-2 h-[182px]">
                  <input
                    className="custom-input w-full h-[182px] absolute opacity-0 z-20 cursor-pointer"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    placeholder="please select media to upload"
                    {...register("image")}
                    onChange={(e: any) => {
                      setUploadedMedia(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <div className="flex flex-col items-center justify-center w-full h-[182px] bg-[#f4f5f6] text-[#777E91] border-2 rounded-md absolute z-10 ">
                    {uploadedMedia ? (
                      <img
                        src={uploadedMedia}
                        alt="Media"
                        className="w-auto h-[120px] m-auto"
                      />
                    ) : (
                      <div className="text-center">
                        <TbFileUpload className="mx-auto" />
                        <p className="text-xs font-normal'">
                          PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-base">Media Details</p>
              <div className="mb-3">
                <label className="label-custom text-[#B1B5C4]">
                  Media Name
                </label>
                <div className="relative">
                  <input
                    className="custom-input w-full"
                    type="text"
                    placeholder='e. g. "Smocking monkey"'
                    {...register("title")}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="label-custom">Description</label>
                <div className="relative">
                  <input
                    type="text"
                    className="custom-input w-full"
                    placeholder="e. g. “After purchasing you will able to recived the logo...”"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className="flex gap-2 max-sm:flex-wrap mb-3">
                <div>
                  <label className="label-custom">Copies</label>
                  <div className="relative">
                    <input
                      className="custom-input"
                      type="number"
                      placeholder="Number of copies available"
                      {...register("copies")}
                    />
                  </div>
                </div>
                <div>
                  <label className="label-custom">Price</label>
                  <div className="relative">
                    <input
                      className="custom-input"
                      type="number"
                      placeholder="Price"
                      {...register("price")}
                    />
                    <p className="absolute text-sm right-10 top-3">Ans</p>
                  </div>
                </div>
              </div>

              <div className="my-10 pt-10 flex gap-10 max-sm:flex-wrap items-center border-t-[1px]">
                <div>
                  <p className="text-base">Publish as a private media</p>
                  <p className="text-xs text-[#777E91] font-normal ">
                    Only invited users can access this private media
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    {...register("private")}
                    onChange={(e) => setAsPublish(e.target.checked)}
                  />
                  <span className="switch" />
                </label>
              </div>

              <div className="flex justify-start gap-3 pt-3">
                <button
                  className={
                    (!isValid ? "bg-[#92A9DE]" : "bg-[#3772FF]") +
                    " text-base border-none px-5 py-2 text-white font-bold font-segoe-ui rounded-full"
                  }
                  disabled={!isValid ? true : false}
                  type="submit"
                >
                  <p className="flex gap-1 items-center">
                    Create item <BsArrowRightShort />{" "}
                  </p>
                </button>
                <button className="text-[#777E91] text-sm border-none px-3 py-2 font-bold font-segoe-ui rounded-full w-max flex gap-2 justify-between items-center">
                  <IoIosCloseCircleOutline />
                  Clear all
                </button>
              </div>
            </form>
          </div>
          <div className="max-sm:w-max max-sm:mx-auto my-10">
            <Media
              imageUrl={images.nft5}
              mediaName="Amazing digital art"
              person={{
                name: "Edd Harris",
                avatar: images.Survey[0],
              }}
              countCopies={3}
              price={2.45}
              version=""
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="w-screen h-screen bg-[#fcfcfdda] fixed top-0 z-30">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-t-4 border-4 border-[#B1B5C3] border-t-[#3C76FF] rounded-full animate-spin ease-linear"></div>
            <p className="text-xs text-[#777E91] font-400 pt-2">
              Uploading your Media
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UploadMedia;
