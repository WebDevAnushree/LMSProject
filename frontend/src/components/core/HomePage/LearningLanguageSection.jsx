// import React from 'react'
// import HighlightText from './HighlightText'
// import know_your_progress from "../../../assets/Images/Know_your_progress.png"
// import compare_with_others from "../../../assets/Images/Compare_with_others.png"
// import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
// import CTAButton from "../HomePage/Button"



// const LearningLanguageSection = () => {
//     return (
//         <div className='mt-[130px] mb-10'>
//             <div className='flex flex-col gap-5 items-center'>

//                 <div className='text-3xl lg:text-4xl font-semibold text-center'>
//                     Your Swiss Knife for
//                     <HighlightText text={" learning any language"} />
//                 </div>

//                 <div className='lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%]'>
//                     Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
//                 </div>

//                 <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
//                     <img
//                         src={know_your_progress}
//                         alt="KNowYourProgressImage"
//                         className='object-contain lg:-mr-32 '
//                     />
//                     <img
//                         src={compare_with_others}
//                         alt="KNowYourProgressImage"
//                         className='object-contain'
//                     />
//                     <img
//                         src={plan_your_lesson}
//                         alt="KNowYourProgressImage"
//                         className='object-contain lg:-ml-36'
//                     />
//                 </div>

//                 <div className='w-fit'>
//                     <CTAButton active={true} linkto={"/signup"}>
//                         <div>
//                             Learn more
//                         </div>
//                     </CTAButton>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default LearningLanguageSection
import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
    return (
        <div className='mt-[130px] mb-10 w-full'>
            <div className='flex flex-col gap-6 items-center'>

                {/* Section label */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-richblack-800 border border-richblack-600/50 text-xs text-richblack-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-caribbeangreen-300" />
                    Multi-language learning platform
                </div>

                <div className='text-3xl lg:text-4xl font-bold text-center leading-tight'>
                    Your Swiss Knife for
                    <HighlightText text={"learning any language"} />
                </div>

                <div className='lg:text-center text-richblack-400 mx-auto text-base leading-relaxed lg:w-[60%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                {/* Image showcase — layered overlap effect */}
                <div className='relative flex flex-col lg:flex-row items-center justify-center mt-8 w-full'>
                    {/* Glow backdrop */}
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col lg:flex-row items-center justify-center">
                        <div className="relative z-10 lg:-mr-32 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500">
                            <img src={know_your_progress} alt="Know Your Progress" className='object-contain' />
                        </div>
                        <div className="relative z-20 drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500 delay-75">
                            <img src={compare_with_others} alt="Compare with Others" className='object-contain' />
                        </div>
                        <div className="relative z-10 lg:-ml-36 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500 delay-150">
                            <img src={plan_your_lesson} alt="Plan Your Lessons" className='object-contain' />
                        </div>
                    </div>
                </div>

                {/* Feature badges */}
                <div className="hidden lg:flex gap-4 flex-wrap justify-center mt-4">
                    {['20+ Languages', 'Voice-over Audio', 'Progress Tracking', 'Custom Schedule', 'Offline Mode'].map((feat, i) => (
                        <span key={i}
                            className="px-4 py-1.5 rounded-full text-sm font-medium
                                       bg-richblack-700/60 border border-richblack-600/40 text-richblack-200">
                            {feat}
                        </span>
                    ))}
                </div>

                <div className='w-fit mt-4'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>Learn more</div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection