import React from "react";
import images from "../../assets";

interface MediaPropsType {
  imageUrl: string;
  mediaName: string;
  person: {
    name: string | undefined;
    avatar: string | undefined;
  };
  countCopies: number;
  price?: number;
  version: "new" | "";
}

const Media = ({
  imageUrl,
  mediaName,
  person,
  countCopies,
  price,
  version,
}: MediaPropsType) => {
  return (
    <div
      className={
        "flex flex-col font-poppins m-auto my-1 " +
        (version == "new" ? "w-[256px]" : "")
      }
    >
      <img src={imageUrl} alt="NFT" className="rounded-2xl h-[303px] w-full" />
      <div className="flex justify-between items-center my-3">
        <p className="text-base text-[#23262f] m-0">{mediaName}</p>
        <div className="price text-[#45B36B] text-xs border-2 border-[#45B36B] rounded-md p-1">
          {price} Ans
        </div>
      </div>
      <div className="flex justify-between items-center pb-2 mb-2 border-b-[1px]">
        <div className="user flex items-center">
          <img
            src={person.avatar}
            alt="User"
            className="w-[24px] h-[24px] rounded-full mr-1"
          />
          <p className="text-sm text-[#9197A6] m-0">{person.name}</p>
        </div>
        <p className="text-sm text-[#353945] m-0">{countCopies} copies</p>
      </div>
      <div className="flex justify-end">
        {version == "new" ? (
          <p className="text-xs text-[#777E91]  m-0">New 🔥</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Media;
