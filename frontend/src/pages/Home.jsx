import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';

import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
import Course_Slider from '../components/core/Catalog/Course_Slider'

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI'

import { MdOutlineRateReview } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa"

import { motion } from 'framer-motion'
import { fadeIn } from './../components/common/motionFrameVarients';

import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'

const randomImges = [
    backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, backgroundImg5,
    backgroundImg6, backgroundImg7, backgroundImg8, backgroundImg9, backgroundImg10, backgroundImg111,
];

const PLACEHOLDER_THUMBNAIL = "https://via.placeholder.com/400x225?text=No+Thumbnail";

const Home = () => {
    // ── Background image ───────────────────────────────────────────────
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
        setBackgroundImg(bg);
    }, []);

    // ── Catalog data ────────────────────────────────────────────────────
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const [categoryID, setCategoryID] = useState(null);   // ← dynamic now
    const [loadingCatalog, setLoadingCatalog] = useState(false);
    const dispatch = useDispatch();

    // Step 1 — fetch real category IDs from DB instead of using a hardcoded ID
    useEffect(() => {
        (async () => {
            try {
                const categories = await fetchCourseCategories();
                if (categories?.length > 0) {
                    // pick the first available category
                    setCategoryID(categories[0]._id);
                }
            } catch (err) {
                console.error("Could not fetch course categories:", err);
            }
        })();
    }, []);

    // Step 2 — fetch catalog page data once we have a real categoryID
    useEffect(() => {
        if (!categoryID) return;

        const fetchCatalogPageData = async () => {
            setLoadingCatalog(true);
            try {
                const result = await getCatalogPageData(categoryID, dispatch);
                setCatalogPageData(result);
            } catch (err) {
                console.error("Could not fetch catalog page data:", err);
            } finally {
                setLoadingCatalog(false);
            }
        };

        fetchCatalogPageData();
    }, [categoryID]);

    // ── Helpers ─────────────────────────────────────────────────────────
    const popularCourses   = CatalogPageData?.selectedCategory?.courses  ?? [];
    const topSelling       = CatalogPageData?.mostSellingCourses          ?? [];

    return (
        <React.Fragment>
            {/* ── Hero Background ─────────────────────────────────────────── */}
            <div className="w-full h-[550px] md:h-[750px] absolute top-0 left-0 overflow-hidden">
                <img
                    src={backgroundImg}
                    alt="Background"
                    className="w-full h-full object-cover scale-105 transition-transform duration-[8000ms]"
                    style={{ filter: 'brightness(0.18) saturate(1.4)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-richblack-900/60 via-transparent to-richblack-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-richblack-900/40 via-transparent to-richblack-900/40" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div>
                {/* ── Section 1 — Hero ──────────────────────────────────────── */}
                <div className='relative h-[500px] md:h-[600px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white'>

                    {/* Pill badge */}
                    <Link to={"/signup"}>
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className='z-10 group mx-auto rounded-full font-bold text-richblack-100
                                        transition-all duration-200 hover:scale-95 w-fit mb-6
                                        border border-richblack-600/60 bg-richblack-800/70 backdrop-blur-sm
                                        shadow-[0_0_24px_rgba(255,214,76,0.08)]'
                        >
                            <div className='flex flex-row items-center gap-2 px-6 py-2 rounded-full text-sm
                              transition-all duration-200 group-hover:bg-richblack-700/80'>
                                <span className="w-2 h-2 rounded-full bg-yellow-50 animate-pulse" />
                                <p>Become an Instructor</p>
                                <FaArrowRight className="text-yellow-50 text-xs" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Main headline */}
                    <motion.div
                        variants={fadeIn('up', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-4xl lg:text-5xl xl:text-6xl font-bold mt-2 leading-tight tracking-tight'
                    >
                        Empower Your Future with
                        <br />
                        <HighlightText text={"Coding Skills"} />
                    </motion.div>

                    {/* Subheadline */}
                    <motion.div
                        variants={fadeIn('up', 0.15)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='mt-5 w-[85%] md:w-[65%] text-center text-base lg:text-lg text-richblack-300 leading-relaxed'
                    >
                        With our online coding courses, you can learn at your own pace, from anywhere in
                        the world, and get access to a wealth of resources, including hands-on projects,
                        quizzes, and personalized feedback from instructors.
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        variants={fadeIn('up', 0.2)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='flex flex-row gap-5 mt-10'
                    >
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                    </motion.div>

                    {/* Floating stat chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="hidden md:flex gap-6 mt-12 text-sm"
                    >
                        {[
                            { val: '250+', label: 'Courses' },
                            { val: '50K+', label: 'Learners' },
                            { val: '4.8★', label: 'Rating' },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-full
                                           bg-richblack-800/60 border border-richblack-600/40 backdrop-blur-sm"
                            >
                                <span className="text-yellow-50 font-bold">{s.val}</span>
                                <span className="text-richblack-300">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Code blocks + Course sliders ──────────────────────────── */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

                    {/* Code block 1 */}
                    <div>
                        <CodeBlocks
                            position={"lg:flex-row"}
                            heading={
                                <div className='text-3xl lg:text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlightText text={"coding potential "} />
                                    with our online courses
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            ctabtn1={{ btnText: "try it yourself", linkto: "/signup", active: true }}
                            ctabtn2={{ btnText: "learn more",       linkto: "/login",  active: false }}
                            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                            codeColor={"text-yellow-25"}
                            backgroundGradient={"code-block1-grad"}
                        />
                    </div>

                    {/* Code block 2 */}
                    <div>
                        <CodeBlocks
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                                    Start
                                    <HighlightText text={"coding in seconds"} />
                                </div>
                            }
                            subheading={
                                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                            }
                            ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
                            ctabtn2={{ btnText: "Learn More",      link: "/signup", active: false }}
                            codeColor={"text-white"}
                            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                            backgroundGradient={"code-block2-grad"}
                        />
                    </div>

                    {/* ── Popular Picks slider ───────────────────────────────── */}
                    <div className='mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent'>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-7 rounded-full bg-yellow-50" />
                            <h2 className='text-white text-2xl font-semibold'>Popular Picks for You 🏆</h2>
                        </div>

                        {loadingCatalog ? (
                            <SliderSkeleton />
                        ) : popularCourses.length > 0 ? (
                            <Course_Slider Courses={popularCourses} />
                        ) : (
                            <EmptySlider message="No popular courses available right now." />
                        )}
                    </div>

                    {/* ── Top Enrollments slider ─────────────────────────────── */}
                    <div className='mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent'>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-7 rounded-full bg-pink-400" />
                            <h2 className='text-white text-2xl font-semibold'>Top Enrollments Today 🔥</h2>
                        </div>

                        {loadingCatalog ? (
                            <SliderSkeleton />
                        ) : topSelling.length > 0 ? (
                            <Course_Slider Courses={topSelling} />
                        ) : (
                            <EmptySlider message="No top enrollments available right now." />
                        )}
                    </div>

                    <ExploreMore />
                </div>

                {/* ── Section 2 ─────────────────────────────────────────────── */}
                <div className='bg-pure-greys-5 text-richblack-700'>
                    <div className='homepage_bg h-[310px]'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                            <div className='h-[150px]' />
                            <div className='flex flex-row gap-7 text-white'>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex items-center gap-3'>
                                        Explore Full Catalog
                                        <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>Learn more</div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                        <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]'>
                            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
                                Get the Skills you need for a
                                <HighlightText text={"Job that is in demand"} />
                            </div>
                            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
                                <div className='text-[16px]'>
                                    The modern StudyNotion dictates its own terms. Today, to be a competitive
                                    specialist requires more than professional skills.
                                </div>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div>Learn more</div>
                                </CTAButton>
                            </div>
                        </div>

                        <TimelineSection />
                        <LearningLanguageSection />
                    </div>
                </div>

                {/* ── Section 3 ─────────────────────────────────────────────── */}
                <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                    <InstructorSection />

                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from other learners
                        <MdOutlineRateReview className='text-yellow-25' />
                    </h1>
                    <ReviewSlider />
                </div>

                <Footer />
            </div>
        </React.Fragment>
    );
};

// ── Small helper components ────────────────────────────────────────────────────

/** Shows 3 grey skeleton cards while catalog data is loading */
const SliderSkeleton = () => (
    <div className="flex gap-6 overflow-hidden">
        {[1, 2, 3].map((n) => (
            <div
                key={n}
                className="min-w-[300px] h-[220px] rounded-xl bg-richblack-700 animate-pulse"
            />
        ))}
    </div>
);

/** Shown when a slider has no courses to display */
const EmptySlider = ({ message }) => (
    <p className="text-richblack-400 text-sm py-6 pl-1">{message}</p>
);

export default Home;