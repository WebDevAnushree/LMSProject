import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from "./../../common/Img"

function Course_Card({ course, Height, compact = false }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  // ── COMPACT MODE (Frequently Bought) ──
  if (compact) {
    return (
      <Link to={`/courses/${course._id}`}>
        <div className="flex gap-4 items-center bg-richblack-800 border border-richblack-700/40 rounded-xl p-4 hover:border-richblack-600 hover:-translate-y-0.5 transition-all duration-150">

          <div className="flex-shrink-0 w-[120px] h-[80px] rounded-lg overflow-hidden">
            <Img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-richblack-5 leading-snug line-clamp-2">
              {course?.courseName}
            </p>
            <p className="text-[12px] text-richblack-400">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-yellow-50">
                {avgReviewCount || 0}
              </span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={13} />
              <span className="text-[12px] text-richblack-400">
                ({course?.ratingAndReviews?.length})
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[15px] font-bold text-richblack-5">
                Rs. {course?.price}
              </p>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-50 border border-yellow-400/20">
                Bestseller
              </span>
            </div>
          </div>

        </div>
      </Link>
    )
  }

  // ── DEFAULT MODE (Slider cards) ──
  return (
    <Link to={`/courses/${course._id}`}>
      <div className="bg-richblack-800 border border-richblack-700/40 rounded-xl overflow-hidden hover:border-richblack-600 hover:-translate-y-1 transition-all duration-200 cursor-pointer">

        <div className="relative w-full h-[140px] overflow-hidden">
          <Img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-[2px] rounded-full bg-yellow-50 text-richblack-900 tracking-wide">
            Bestseller
          </span>
        </div>

        <div className="p-3 flex flex-col gap-1">
          <p className="text-[12px] font-medium text-richblack-5 leading-snug line-clamp-2">
            {course?.courseName}
          </p>
          <p className="text-[10px] text-richblack-400">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-semibold text-yellow-50">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={10} />
            <span className="text-[10px] text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="text-[13px] font-semibold text-richblack-5 mt-0.5">
            Rs. {course?.price}
          </p>
        </div>

      </div>
    </Link>
  )
}

export default Course_Card