import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCakeCandles,
  faHouseChimney,
  faPlateWheat,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const aboutList = [
    {
      id: 1,
      title: "Natural Ingredients",
      icon: faPlateWheat,
      text: "Learn more",
      text2:
        "We use flour from bio-grain grown without harmful chemical fertilizers",
    },
    {
      id: 2,
      title: "Home Production",
      icon: faHouseChimney,
      text: "Learn more",
      text2: "Our bakers prepared bread by hands with soul and love.",
    },
    {
      id: 3,
      title: "Variety of Flavor",
      icon: faCakeCandles,
      text: "Learn more",
      text2:
        "Large assortment of bread, unusual toppings and new items every week.",
    },
    {
      id: 4,
      title: "Easy Order",
      icon: faBasketShopping,
      text: "Learn more",
      text2:
        "We provide online services which can be accessed easily through our website.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  function isActive(index) {
    return index === activeIndex;
  }

  return (
    <div id="about">
      <div className="md:mt-5 py-5">
        <h1 className="text-2xl text-[#1B7B59] font-bold mx-auto flex justify-center">
          About Us
        </h1>
        <p className="text-xl font-semibold mx-auto flex justify-center py-2">
          We bake with love since 2018
        </p>
      </div>
      <div
        className="mt-[50px] flex justify-center flex-col sm:flex-row md:flex-row "
        id="about"
      >
        {aboutList.map((aboutItem, index) => (
          <div
            key={index}
            className={`${
              isActive(index)
                ? "bg-orange-500 text-white ease-in duration-500 "
                : "bg-[#1B7B59] text-white "
            } py-3 px-5  text-center `}
            onClick={() => handleClick(index)}
          >
            <FontAwesomeIcon
              icon={aboutItem.icon}
              className={`${
                isActive(index) ? " text-white " : "bg-[#1B7B59] text-white"
              } text-9xl mx-auto`}
            />
            <p className="font-bold text-3md  ">{aboutItem.title}</p>
            {isActive(index) ? (
              <div className="w-1/2 mx-auto">
                <p className="">{aboutItem.text2}</p>
              </div>
            ) : (
              <>
                <p>
                  {aboutItem.text}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-md mx-1"
                  />
                </p>
              </>
            )}
            {/* <p className="text-center">
              {isActive(index) ? aboutItem.text2 : aboutItem.text}
              <FontAwesomeIcon icon={faArrowRight} className="text-md px-1" />
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
