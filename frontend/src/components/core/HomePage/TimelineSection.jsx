// import React from 'react'

// import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
// import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
// import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
// import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
// import timelineImage from '../../../assets/Images/TimelineImage.png'

// import Img from './../../common/Img';

// import { motion } from 'framer-motion'
// import { fadeIn } from '../../common/motionFrameVarients';



// const timeline = [
//     {
//         Logo: Logo1,
//         heading: "Leadership",
//         Description: "Fully committed to the success company",
//     },
//     {
//         Logo: Logo2,
//         heading: "Responsibility",
//         Description: "Students will always be our top priority",
//     },
//     {
//         Logo: Logo3,
//         heading: "Flexibility",
//         Description: "The ability to switch is an important skills",
//     },

//     {
//         Logo: Logo4,
//         heading: "Solve the problem",
//         Description: "Code your way to a solution",
//     },
// ];

// const TimelineSection = () => {
//     return (
//         <div>
//             <div className='flex flex-col lg:flex-row gap-15 items-center'>

//                 <motion.div
//                     variants={fadeIn('right', 0.1)}
//                     initial='hidden'
//                     whileInView={'show'}
//                     viewport={{ once: false, amount: 0.1 }}
//                     className='w-full lg:w-[45%] flex flex-col gap-5'>
//                     {
//                         timeline.map((element, index) => {
//                             return (
//                                 <div className='flex flex-row gap-6' key={index}>

//                                     <div className='w-[50px] h-[50px] rounded-full bg-richblue-500 flex justify-center items-center'>
//                                         <img src={element.Logo} />
//                                     </div>

//                                     <div>
//                                         <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
//                                         <p className='text-base'>{element.Description}</p>
//                                     </div>

//                                 </div>
//                             )
//                         })
//                     }
//                 </motion.div>

//                 <motion.div
//                     variants={fadeIn('left', 0.1)}
//                     initial='hidden'
//                     whileInView={'show'}
//                     viewport={{ once: false, amount: 0.1 }}
//                     className='relative shadow-blue-200'>

//                     <Img src={timelineImage}
//                         alt="timelineImage"
//                         className='shadow-white object-cover h-fit scale-x-[-1] w-[550px] '
//                     />

//                     <div className=' absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
//                             left-[50%] translate-x-[-50%] translate-y-[-70%] rounded-3xl'>
//                         <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
//                             <p className='text-2xl lg:text-3xl font-bold'>10</p>
//                             <p className='text-caribbeangreen-300 text-xs lg:text-sm'>Years of Experience</p>
//                         </div>

//                         <div className='flex gap-5 items-center px-7'>
//                             <p className='text-2xl lg:text-3xl font-bold'>250</p>
//                             <p className='text-caribbeangreen-300 text-xs lg:text-sm'>TYpe of Courses</p>
//                         </div>

//                     </div>

//                 </motion.div>
//             </div>
//         </div>
//     )
// }

// export default TimelineSection
import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from '../../../assets/Images/TimelineImage.png'

import Img from './../../common/Img';

import { motion } from 'framer-motion'
import { fadeIn } from '../../common/motionFrameVarients';

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skill",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimelineSection = () => {
    return (
        <div className="w-full">
            <div className='flex flex-col lg:flex-row gap-16 items-center'>

                {/* Left — Timeline items */}
                <motion.div
                    variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='w-full lg:w-[45%] flex flex-col gap-1'
                >
                    {timeline.map((element, index) => (
                        <div key={index} className="flex flex-row gap-5 group">
                            {/* Icon + connecting line */}
                            <div className="flex flex-col items-center">
                                <div className='w-12 h-12 rounded-2xl bg-richblue-500/20 border border-richblue-400/30
                                                flex items-center justify-center
                                                group-hover:bg-richblue-500/30 group-hover:border-richblue-400/50
                                                transition-all duration-300 shrink-0'>
                                    <img src={element.Logo} alt={element.heading} className="w-5 h-5" />
                                </div>
                                {/* Vertical connector (not on last item) */}
                                {index < timeline.length - 1 && (
                                    <div className="w-px flex-1 my-2 bg-gradient-to-b from-richblue-400/40 to-transparent" style={{ minHeight: '28px' }} />
                                )}
                            </div>

                            <div className="pb-6">
                                <h2 className='font-bold text-[17px] text-richblack-5'>{element.heading}</h2>
                                <p className='text-richblack-400 text-sm mt-1 leading-relaxed'>{element.Description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Right — Image */}
                <motion.div
                    variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='relative w-full lg:w-[55%]'
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-6 bg-blue-500/10 rounded-3xl blur-3xl pointer-events-none" />

                    <div className="relative rounded-2xl overflow-hidden
                                    border border-white/5
                                    shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                        <Img
                            src={timelineImage}
                            alt="timelineImage"
                            className='w-full object-cover scale-x-[-1]'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Stats overlay card */}
                    <div className='absolute -bottom-6 left-1/2 -translate-x-1/2
                                    bg-caribbeangreen-700/95 backdrop-blur-md
                                    flex flex-row text-white uppercase
                                    py-5 px-2 rounded-2xl
                                    shadow-[0_12px_48px_rgba(0,0,0,0.5)]
                                    border border-caribbeangreen-500/30
                                    w-[90%] lg:w-auto'
                    >
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300/30 px-8'>
                            <div>
                                <p className='text-3xl font-black'>10</p>
                                <p className='text-caribbeangreen-200 text-xs font-medium mt-0.5 whitespace-nowrap'>Years of Experience</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 items-center px-8'>
                            <div>
                                <p className='text-3xl font-black'>250</p>
                                <p className='text-caribbeangreen-200 text-xs font-medium mt-0.5 whitespace-nowrap'>Types of Courses</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TimelineSection