// import React from "react";

// // Importing React Icons
// import { HiUsers } from "react-icons/hi";
// import { ImTree } from "react-icons/im";


// const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
//   return (
//     <div
//       className={`w-[360px] lg:w-[30%] ${currentCard === cardData?.heading
//         ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
//         : "bg-richblack-800"
//         }  text-richblack-25 h-[300px] box-border cursor-pointer`}
//       onClick={() => setCurrentCard(cardData?.heading)}
//     >
//       <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
//         <div className={` ${currentCard === cardData?.heading && "text-richblack-800"} font-semibold text-[20px]`}
//         >
//           {cardData?.heading}
//         </div>

//         <div className="text-richblack-400">{cardData?.description}</div>
//       </div>

//       <div
//         className={`flex justify-between ${currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
//           } px-6 py-3 font-medium`}
//       >
//         {/* Level */}
//         <div className="flex items-center gap-2 text-[16px]">
//           <HiUsers />
//           <p>{cardData?.level}</p>
//         </div>

//         {/* Flow Chart */}
//         <div className="flex items-center gap-2 text-[16px]">
//           <ImTree />
//           <p>{cardData?.lessionNumber} Lession</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData?.heading)}
      className={`
        relative w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer
        rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${isActive
          ? "bg-white text-richblack-900 shadow-[0_20px_60px_rgba(255,214,76,0.25),0_0_0_2px_rgba(255,214,76,0.6)] scale-[1.02]"
          : "bg-richblack-800 text-richblack-25 border border-richblack-700/50 hover:border-richblack-500/60 hover:bg-richblack-700/80 hover:scale-[1.01]"
        }
      `}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-300
        ${isActive ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500" : "bg-richblack-700"}`}
      />

      {/* Card body */}
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6 flex flex-col gap-3 border-b border-dashed border-richblack-300/30">
          <div className={`font-bold text-[18px] leading-snug transition-colors duration-200
            ${isActive ? "text-richblack-900" : "text-richblack-5"}`}>
            {cardData?.heading}
          </div>

          <div className={`text-[14px] leading-relaxed line-clamp-3
            ${isActive ? "text-richblack-500" : "text-richblack-400"}`}>
            {cardData?.description}
          </div>
        </div>

        {/* Card footer */}
        <div className={`flex justify-between px-6 py-4 font-semibold text-[14px]
          ${isActive ? "text-blue-600" : "text-richblack-300"}`}>
          <div className="flex items-center gap-2">
            <HiUsers className="text-lg" />
            <span>{cardData?.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <ImTree className="text-lg" />
            <span>{cardData?.lessionNumber} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;