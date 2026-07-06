import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import Course_Slider from "../components/core/Catalog/Course_Slider"
import Loading from './../components/common/Loading'

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories } from './../services/operations/courseDetailsAPI'

function Catalog() {
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseCategories()
        const category_id = res.filter(
          (ct) =>
            ct.name
              .split(" ")
              .join("-")
              .replace(/\//g, "-")
              .toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        setLoading(true)
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      })()
    }
  }, [categoryId])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loading />
      </div>
    )
  }

  if (!loading && !catalogPageData) {
    return (
      <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
        No Courses found for selected Category
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 — Courses to get you started */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <Course_Slider
          Courses={
            active === 1
              ? catalogPageData?.selectedCategory?.courses
              : [...(catalogPageData?.selectedCategory?.courses || [])].reverse()
          }
        />
      </div>

      {/* Section 2 — Top courses in different category */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>
        <Course_Slider Courses={catalogPageData?.differentCategory?.courses} />
      </div>

      {/* Section 3 — Frequently Bought */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {catalogPageData?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card course={course} key={i} compact={true} />
            ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog