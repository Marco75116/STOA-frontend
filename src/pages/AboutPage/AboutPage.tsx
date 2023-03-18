import React, { useState } from "react";
import { ReactComponent as Loop } from "../../assets/icons/Loop.svg";

const topics = [
  "Framework",
  "Yield farming",
  "DeFi",
  "Vesting",
  "Mestamask wallet",
  "Ethereum wallet",
  "Streaming",
  "Identity verification",
  "Security information",
  "Licences & Registration",
  "Terms & Conditions",
];

const AboutPage = () => {
  const [selectedPart, setSelectedPart] = useState<number>(0);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-row items-center justify-center bg-bgCardNavbar">
      <div className="flex w-[280px] flex-col gap-[6px] bg-white p-3">
        <form>
          <label className="text-gray-900 sr-only mb-2 text-sm font-medium">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Loop />
            </div>
            <input
              type="search"
              id="default-search"
              className="text-gray-900 border-gray-300 bg-gray-50 block w-full rounded-lg border p-4 pl-10 text-sm"
              placeholder="Search topic..."
              required
            ></input>
          </div>
        </form>

        {topics.map((topic, index) => {
          return (
            <>
              <div
                className={`h-[48px] rounded-lg ${
                  selectedPart === index && "bg-[#0000000D]"
                } p-3 hover:cursor-pointer 
                `}
                onClick={() => {
                  setSelectedPart(index);
                }}
                key={index}
              >
                {topics[index]}
              </div>
              {index === 7 && (
                <div className=" border-t-[0.5px] border-solid border-[#00000033]"></div>
              )}
            </>
          );
        })}
      </div>
      <div>gridInfo</div>
    </div>
  );
};

export default AboutPage;
