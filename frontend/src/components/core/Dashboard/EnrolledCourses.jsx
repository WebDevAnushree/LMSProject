import { useEffect, useState } from "react";
import ProgressBar              from "@ramonak/react-progress-bar";
import { useSelector }          from "react-redux";
import { useNavigate }          from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Img                        from "./../../common/Img";


// ─── Loading Skeleton ─────────────────────────────────────────────────────────
const SkeletonItem = () => (
  <div className="flex border border-richblack-700 px-5 py-3 w-full items-center gap-4">
    <div className="h-14 w-14 rounded-lg skeleton flex-shrink-0" />
    <div className="flex flex-1 flex-col gap-2">
      <p className="h-3 w-[50%] rounded-xl skeleton" />
      <p className="h-3 w-[70%] rounded-xl skeleton" />
    </div>
    <div className="flex flex-col gap-2 min-w-[120px]">
      <p className="h-3 w-[60%] rounded-xl skeleton" />
      <p className="h-3 w-[80%] rounded-xl skeleton" />
    </div>
  </div>
);


export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate  = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [search, setSearch]                   = useState("");


  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ── Empty state ──────────────────────────────────────────────────────────
  if (enrolledCourses?.length === 0) {
    return (
      <div className="grid h-[50vh] w-full place-content-center text-center">
        <p className="text-richblack-300 text-3xl font-boogaloo">
          You haven't enrolled in any course yet.
        </p>
        <button
          onClick={() => navigate("/catalog")}
          className="mt-4 mx-auto px-6 py-2 bg-yellow-500 text-richblack-900
                     rounded-full text-sm font-semibold hover:bg-yellow-400 transition-colors"
        >
          Browse Courses
        </button>
      </div>
    );
  }


  // ── Filter by search ─────────────────────────────────────────────────────
  const visible = enrolledCourses?.filter((c) =>
    !search || c.courseName.toLowerCase().includes(search.toLowerCase())
  );


  // ── Derived stats ─────────────────────────────────────────────────────────
  const completed = enrolledCourses?.filter((c) => (c.progressPercentage || 0) === 100).length ?? 0;
  const avgProgress =
    enrolledCourses?.length
      ? Math.round(
          enrolledCourses.reduce((acc, c) => acc + (c.progressPercentage || 0), 0) /
            enrolledCourses.length
        )
      : 0;


  return (
    <div>
      <h1 className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left mb-6">
        Enrolled Courses
      </h1>


      {/* ── Stats row ── */}
      {enrolledCourses && (
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { label: "Total Enrolled",   value: enrolledCourses.length,          color: "text-richblack-5" },
            { label: "Completed",         value: completed,                       color: "text-green-400" },
            { label: "In Progress",       value: enrolledCourses.length - completed, color: "text-yellow-400" },
            { label: "Avg Progress",      value: `${avgProgress}%`,              color: "text-blue-400" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col gap-1 bg-richblack-700 rounded-xl px-5 py-4 flex-1 min-w-[120px]"
            >
              <p className="text-xs text-richblack-300 uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}


      {/* ── Search ── */}
      {enrolledCourses && (
        <input
          type="text"
          placeholder="Search courses…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 mb-6 bg-richblack-700 text-richblack-5 placeholder-richblack-400
                     border border-richblack-500 rounded-xl px-4 py-2 text-sm outline-none
                     focus:border-yellow-500 transition-colors"
        />
      )}


      <div className="text-richblack-5">
        {/* Table header */}
        <div className="flex rounded-t-2xl bg-richblack-800 border border-richblack-700">
          <p className="w-[45%] px-5 py-3 text-sm font-semibold text-richblack-200 uppercase tracking-wide">
            Course Name
          </p>
          <p className="w-1/4 px-2 py-3 text-sm font-semibold text-richblack-200 uppercase tracking-wide">
            Duration
          </p>
          <p className="flex-1 px-2 py-3 text-sm font-semibold text-richblack-200 uppercase tracking-wide">
            Progress
          </p>
        </div>

        {/* Loading skeleton */}
        {!enrolledCourses && (
          <div>
            {Array(5).fill(0).map((_, i) => <SkeletonItem key={i} />)}
          </div>
        )}

        {/* Rows */}
        {visible?.map((course, i, arr) => {
          const progress = course.progressPercentage || 0;
          const isComplete = progress === 100;

          return (
            <div
              key={i}
              className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700
                          hover:bg-richblack-700 transition-colors
                          ${i === arr.length - 1 ? "rounded-b-2xl" : ""}`}
            >
              {/* Course info */}
              <div
                className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }
              >
                <Img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm hover:text-yellow-400 transition-colors">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription?.length > 50
                      ? `${course.courseDescription.slice(0, 50)}…`
                      : course.courseDescription}
                  </p>
                  {isComplete && (
                    <span className="text-xs text-green-400 font-semibold">✓ Completed</span>
                  )}
                </div>
              </div>

              {/* Duration + Progress – mobile */}
              <div className="sm:hidden px-5 pb-3 flex flex-col gap-2">
                <p className="text-sm text-richblack-300">{course?.totalDuration}</p>
                <p className="text-xs text-richblack-300">Progress: {progress}%</p>
                <ProgressBar
                  completed={progress}
                  height="8px"
                  isLabelVisible={false}
                  bgColor={isComplete ? "#4ade80" : "#F7C948"}
                  baseBgColor="#2C333F"
                />
              </div>

              {/* Duration – desktop */}
              <div className="hidden sm:flex w-1/4 px-2 py-3 text-sm text-richblack-300 items-center">
                {course?.totalDuration}
              </div>

              {/* Progress – desktop */}
              <div className="hidden sm:flex flex-1 flex-col gap-2 px-2 py-3">
                <p className="text-xs text-richblack-300">Progress: {progress}%</p>
                <ProgressBar
                  completed={progress}
                  height="8px"
                  isLabelVisible={false}
                  bgColor={isComplete ? "#4ade80" : "#F7C948"}
                  baseBgColor="#2C333F"
                />
              </div>
            </div>
          );
        })}

        {/* No results after search */}
        {enrolledCourses && visible?.length === 0 && (
          <div className="py-8 text-center text-richblack-400 rounded-b-2xl border border-t-0 border-richblack-700">
            No courses match your search.
          </div>
        )}
      </div>
    </div>
  );
}