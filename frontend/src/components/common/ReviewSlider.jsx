
import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import Img from './Img';

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Autoplay } from "swiper/modules"   // ✅ FIX: was commented out

// Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// Icons
import { FaStar } from "react-icons/fa"

// API
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"


function ReviewSlider() {
    const [reviews, setReviews] = useState([])      // ✅ FIX: default [] not null
    const [loading, setLoading] = useState(true)    // ✅ FIX: loading state
    const [error, setError]     = useState(null)    // ✅ FIX: error state
    const truncateWords = 15

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true)
                setError(null)

                const { data } = await apiConnector(
                    "GET",
                    ratingsEndpoints.REVIEWS_DETAILS_API
                )

                // ✅ helpful: log so you can see exactly what the API returns
                console.log("Reviews API response:", data)

                if (data?.success) {
                    setReviews(data?.data || [])
                } else {
                    setError(data?.message || "Failed to fetch reviews")
                }
            } catch (err) {
                console.error("Error fetching reviews:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [])


    // ✅ FIX: animated skeleton while loading — was returning null before
    if (loading) {
        return (
            <div className="my-[50px] flex gap-5 overflow-hidden">
                {[1, 2, 3, 4].map((n) => (
                    <div
                        key={n}
                        className="min-w-[250px] h-[180px] rounded-lg bg-richblack-800 animate-pulse"
                    />
                ))}
            </div>
        )
    }

    // ✅ FIX: show error instead of blank screen
    if (error) {
        return (
            <p className="my-8 text-center text-pink-200 text-sm">
                Could not load reviews: {error}
            </p>
        )
    }

    // ✅ FIX: show message instead of blank screen when DB has no reviews
    if (reviews.length === 0) {
        return (
            <p className="my-8 text-center text-richblack-400 text-sm">
                No reviews yet — be the first to leave one!
            </p>
        )
    }

    return (
        <div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    modules={[FreeMode, Autoplay]}   // ✅ FIX: was commented out — Swiper needs this
                    breakpoints={{
                        640:  { slidesPerView: 1 },
                        768:  { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="w-full"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px]
                                            text-richblack-25 min-h-[180px] max-h-[180px]">

                                {/* User info row */}
                                <div className="flex items-center gap-4">
                                    <Img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                        }
                                        alt={`${review?.user?.firstName} avatar`}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-richblack-5 capitalize">
                                            {`${review?.user?.firstName} ${review?.user?.lastName}`}
                                        </h1>
                                        <h2 className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </h2>
                                    </div>
                                </div>

                                {/* Review text — truncated */}
                                <p className="font-medium text-richblack-25">
                                    {review?.review?.split(" ").length > truncateWords
                                        ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                                        : review?.review
                                    }
                                </p>

                                {/* Rating row */}
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-yellow-100">
                                        {isNaN(review?.rating)
                                            ? "N/A"
                                            : Number(review?.rating).toFixed(1)
                                        }
                                    </h3>
                                    <ReactStars
                                        count={5}
                                        value={parseInt(review?.rating) || 0}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider