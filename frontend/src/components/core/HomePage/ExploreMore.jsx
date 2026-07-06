// import React, { useState } from "react";
// import { HomePageExplore } from "../../../../data/homepage-explore";
// import CourseCard from "./CourseCard";
// import HighlightText from "./HighlightText";

// const tabsName = [
//   "Free",
//   "New to coding",
//   "Most popular",
//   "Skills paths",
//   "Career paths",
// ];


// const ExploreMore = () => {
//   const [currentTab, setCurrentTab] = useState(tabsName[0]);
//   const [courses, setCourses] = useState(HomePageExplore[0].courses);
//   const [currentCard, setCurrentCard] = useState(
//     HomePageExplore[0].courses[0].heading
//   );

//   const setMyCards = (value) => {
//     setCurrentTab(value);
//     const result = HomePageExplore.filter((course) => course.tag === value);
//     setCourses(result[0].courses);
//     setCurrentCard(result[0].courses[0].heading);
//   };

//   return (
//     <div>
//       {/* Explore more section */}
//       <div>
//         <div className="text-3xl lg:text-4xl font-semibold text-center my-10">
//           Unlock the
//           <HighlightText text={"Power of Code"} />
//           <p className="text-center text-richblack-300 text-base lg:text-lg font-semibold mt-1">
//             Learn to Build Anything You Can Imagine
//           </p>
//         </div>
//       </div>

//       {/* Tabs Section */}
//       <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
//         {tabsName.map((ele, index) => {
//           return (
//             <div
//               className={` text-[16px] flex flex-row items-center gap-2 ${currentTab === ele
//                 ? "bg-richblack-900 text-richblack-5 font-medium"
//                 : "text-richblack-200"
//                 } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
//               key={index}
//               onClick={() => setMyCards(ele)}
//             >
//               {ele}
//             </div>
//           );
//         })}
//       </div>

//       <div className="hidden lg:block lg:h-[200px]"></div>

//       {/* Cards Group */}
//       <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
//         {courses.map((ele, index) => {
//           return (
//             <CourseCard
//               key={index}
//               cardData={ele}
//               currentCard={currentCard}
//               setCurrentCard={setCurrentCard}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default ExploreMore;
import React, { useState } from "react";
import { HomePageExplore } from "../../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-3xl lg:text-4xl font-bold text-center my-10 leading-tight">
        Unlock the
        <HighlightText text={"Power of Code"} />
        <p className="text-center text-richblack-400 text-base lg:text-lg font-medium mt-3">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs */}
      <div className="hidden lg:flex gap-2 -mt-5 mx-auto w-max
                      bg-richblack-800/80 backdrop-blur-sm
                      border border-richblack-700/50
                      text-richblack-200 p-1.5 rounded-2xl font-medium
                      shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {tabsName.map((ele, index) => (
          <button
            key={index}
            onClick={() => setMyCards(ele)}
            className={`
              text-[14px] px-6 py-2 rounded-xl transition-all duration-200 cursor-pointer font-medium
              ${currentTab === ele
                ? "bg-richblack-900 text-yellow-50 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                : "text-richblack-300 hover:text-richblack-100 hover:bg-richblack-700/50"
              }
            `}
          >
            {ele}
          </button>
        ))}
      </div>

      {/* Spacer for absolute-positioned cards */}
      <div className="hidden lg:block lg:h-[200px]" />

      {/* Cards */}
      <div className="lg:absolute gap-8 lg:gap-0 flex flex-wrap justify-center lg:justify-between w-full
                      lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]
                      text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;