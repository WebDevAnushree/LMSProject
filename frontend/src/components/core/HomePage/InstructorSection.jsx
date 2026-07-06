// import React from 'react'
// import Instructor from '../../../assets/Images/teacher3.png'
// import HighlightText from './HighlightText'
// import CTAButton from "../HomePage/Button"
// import { FaArrowRight } from 'react-icons/fa'
// import Img from './../../common/Img';


// import { motion } from 'framer-motion'
// import { scaleUp } from './../../common/motionFrameVarients';


// const InstructorSection = () => {
//   return (
//     <div>
//       <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

//         <motion.div
//           variants={scaleUp}
//           initial='hidden'
//           whileInView={'show'}
//           viewport={{ once: false, amount: 0.1 }}
//           className='lg:w-[50%] '>
//           <Img
//             src={Instructor}
//             alt="Instructor"
//             className='shadow-white rounded-3xl'
//           />
//         </motion.div>

//         <div className='lg:w-[50%] flex flex-col'>
//           <div className='text-3xl lg:text-4xl font-semobold w-[50%] mb-2'>
//             Become an
//             <HighlightText text={"Instructor"} />
//           </div>

//           <p className='font-medium text-[16px] w-[80%] text-richblack-300 mb-12'>
//             Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
//           </p>

//           <div className='w-fit'>
//             <CTAButton active={true} linkto={"/signup"}>
//               <div className='flex flex-row gap-2 items-center'>
//                 Start Learning Today
//                 <FaArrowRight />
//               </div>
//             </CTAButton>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default InstructorSection
import React from 'react'
import Instructor from '../../../assets/Images/teacher3.png'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';

import { motion } from 'framer-motion'
import { scaleUp } from './../../common/motionFrameVarients';

const InstructorSection = () => {
  return (
    <div className="py-16">
      <div className='flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center'>

        {/* Image side */}
        <motion.div
          variants={scaleUp}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] relative'
        >
          {/* Decorative glow ring behind image */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-yellow-400/10 blur-2xl pointer-events-none" />

          {/* Image frame */}
          <div className="relative rounded-3xl overflow-hidden border border-richblack-600/30
                          shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <Img
              src={Instructor}
              alt="Instructor"
              className='w-full object-cover'
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/30 to-transparent pointer-events-none" />
          </div>

          {/* Floating stat badge */}
          <div className="absolute bottom-6 -right-4 lg:-right-8
                          bg-richblack-800/90 backdrop-blur-md
                          border border-richblack-600/40
                          rounded-2xl px-5 py-3
                          shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <p className="text-yellow-50 font-bold text-xl">10,000+</p>
            <p className="text-richblack-400 text-xs mt-0.5">Active Instructors</p>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] flex flex-col gap-6'
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full
                          bg-richblack-700/60 border border-richblack-600/40 text-xs text-richblack-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-50" />
            For educators & experts
          </div>

          <div className='text-4xl lg:text-5xl font-bold leading-tight'>
            Become an
            <br />
            <HighlightText text={"Instructor"} />
          </div>

          <p className='text-[16px] leading-relaxed text-richblack-300 max-w-[420px]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          {/* Feature points */}
          <ul className="flex flex-col gap-3 mt-2">
            {[
              "Set your own schedule and earn on your terms",
              "Access professional production tools & support",
              "Join a community of world-class educators",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-richblack-300 text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-yellow-50/10 border border-yellow-50/30
                                 flex items-center justify-center shrink-0 text-yellow-50 text-[10px] font-bold">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className='w-fit mt-4'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default InstructorSection