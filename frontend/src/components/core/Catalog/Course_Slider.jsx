import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import { FreeMode } from "swiper/modules"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  if (!Courses || Courses.length === 0) {
    return (
      <p className="text-richblack-400 text-sm py-4">No courses available.</p>
    )
  }

  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={12}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        480:  { slidesPerView: 2.2, spaceBetween: 12 },
        768:  { slidesPerView: 3.2, spaceBetween: 14 },
        1024: { slidesPerView: 4,   spaceBetween: 16 },
      }}
      className="w-full"
    >
      {Courses.map((course, i) => (
        <SwiperSlide key={i}>
          <Course_Card course={course} Height="h-[140px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Course_Slider