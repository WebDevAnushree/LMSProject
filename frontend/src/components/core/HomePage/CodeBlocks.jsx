
import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-16 gap-10`}>

            {/* Section 1 — Text */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-6">
                <div className="text-3xl lg:text-4xl font-bold leading-snug">
                    {heading}
                </div>

                <div className="text-richblack-300 text-base leading-relaxed w-[90%]">
                    {subheading}
                </div>

                <div className="flex gap-5 mt-4">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto || ctabtn1.link}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto || ctabtn2.link}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2 — Code Window */}
            <div className="relative w-[100%] lg:w-[480px] rounded-2xl overflow-hidden
                            border border-richblack-600/50
                            bg-richblack-900/80 backdrop-blur-md
                            shadow-[0_8px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">

                {/* Window chrome / title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-richblack-700/60 bg-richblack-800/60">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-richblack-400 font-mono">index.jsx</span>
                </div>

                {/* Code body */}
                <div className="flex flex-row py-5 text-[12px] sm:text-sm leading-[20px] sm:leading-[26px] relative">
                    {/* Background gradient blob */}
                    <div className={`${backgroundGradient} absolute inset-0 opacity-30 pointer-events-none`} />

                    {/* Line numbers */}
                    <div className="text-right flex flex-col w-[40px] select-none text-richblack-600 font-mono text-xs px-2 pt-[2px] shrink-0">
                        {Array.from({ length: 11 }, (_, i) => (
                            <span key={i} className="leading-[26px]">{i + 1}</span>
                        ))}
                    </div>

                    {/* Vertical divider */}
                    <div className="w-px bg-richblack-700/50 mr-4 shrink-0" />

                    {/* Animated code */}
                    <div className={`flex-1 font-bold font-mono ${codeColor} pr-4 overflow-x-hidden`}>
                        <TypeAnimation
                            sequence={[codeblock, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            style={{
                                whiteSpace: "pre-line",
                                display: "block",
                                overflowX: "hidden",
                                fontSize: "13px",
                                lineHeight: "26px",
                            }}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;