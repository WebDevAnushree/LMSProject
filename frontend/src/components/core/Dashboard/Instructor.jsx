// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
// import { getInstructorData } from "../../../services/operations/profileAPI"
// import InstructorChart from "./InstructorDashboard/InstructorChart"
// import Img from './../../common/Img';



// export default function Instructor() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)

//   const [loading, setLoading] = useState(false)
//   const [instructorData, setInstructorData] = useState(null)
//   const [courses, setCourses] = useState([])


//   // get Instructor Data
//   useEffect(() => {
//     ; (async () => {
//       setLoading(true)
//       const instructorApiData = await getInstructorData(token)
//       const result = await fetchInstructorCourses(token)
//       // console.log('INSTRUCTOR_API_RESPONSE.....', instructorApiData)
//       if (instructorApiData.length) setInstructorData(instructorApiData)
//       if (result) {
//         setCourses(result)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

//   const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


//   // skeleton loading
//   const skItem = () => {
//     return (
//       <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
//         <div className="flex border p-4 border-richblack-600 ">
//           <div className="w-full">
//             <p className="w-[100px] h-4 rounded-xl skeleton"></p>
//             <div className="mt-3 flex gap-x-5">
//               <p className="w-[200px] h-4 rounded-xl skeleton"></p>
//               <p className="w-[100px] h-4 rounded-xl skeleton"></p>
//             </div>

//             <div className="flex justify-center items-center flex-col">
//               <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
//               {/* circle */}
//               <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
//             </div>
//           </div>
//           {/* right column */}
//           <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
//         </div>

//         {/* bottom row */}
//         <div className="flex flex-col gap-y-6  mt-5">
//           <div className="flex justify-between">
//             <p className="text-lg font-bold text-richblack-5 pl-5">Your Courses</p>
//             <Link to="/dashboard/my-courses">
//               <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">View All</p>
//             </Link>
//           </div>

//           <div className="flex flex-col sm:flex-row  gap-6 ">
//             <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
//             <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
//             <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
//           </div>
//         </div>
//       </div>
//     )
//   }


//   return (
//     <div>
//       <div className="space-y-2">
//         <h1 className="text-2xl font-bold text-richblack-5 text-center sm:text-left">
//           Hii {user?.firstName} 👋
//         </h1>
//         <p className="font-medium text-richblack-200 text-center sm:text-left">
//           Let's start something new
//         </p>
//       </div>


//       {loading ? (
//         <div>
//           {skItem()}
//         </div>
//       )
//         :
//         courses.length > 0 ? (
//           <div>
//             <div className="my-4 flex h-[450px] space-x-4">
//               {/* Render chart / graph */}
//               {totalAmount > 0 || totalStudents > 0 ? (
//                 <InstructorChart courses={instructorData} />
//               ) : (
//                 <div className="flex-1 rounded-md bg-richblack-800 p-6">
//                   <p className="text-lg font-bold text-richblack-5">Visualize</p>
//                   <p className="mt-4 text-xl font-medium text-richblack-50">
//                     Not Enough Data To Visualize
//                   </p>
//                 </div>
//               )}

//               {/* left column */}
//               {/* Total Statistics */}
//               <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
//                 <p className="text-lg font-bold text-richblack-5">Statistics</p>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Courses</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {courses.length}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Students</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {totalStudents}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Income</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       Rs. {totalAmount}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Render 3 courses */}
//             <div className="rounded-md bg-richblack-800 p-6">
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-bold text-richblack-5">Your Courses</p>
//                 <Link to="/dashboard/my-courses">
//                   <p className="text-xs font-semibold text-yellow-50 hover:underline">View All</p>
//                 </Link>
//               </div>

//               <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">
//                 {courses.slice(0, 3).map((course) => (
//                   <div key={course._id} className="sm:w-1/3 flex flex-col items-center justify-center">
//                     <Img
//                       src={course.thumbnail}
//                       alt={course.courseName}
//                       className="h-[201px] w-full rounded-2xl object-cover"
//                     />

//                     <div className="mt-3 w-full">
//                       <p className="text-sm font-medium text-richblack-50">
//                         {course.courseName}
//                       </p>
//                       <div className="mt-1 flex items-center space-x-2">
//                         <p className="text-xs font-medium text-richblack-300">
//                           {course.studentsEnrolled.length} students
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           |
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           Rs. {course.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
//             <p className="text-center text-2xl font-bold text-richblack-5">
//               You have not created any courses yet
//             </p>

//             <Link to="/dashboard/add-course">
//               <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
//                 Create a course
//               </p>
//             </Link>
//           </div>
//         )}
//     </div>
//   )
// }



import { useEffect, useState } from "react";
import { useSelector }         from "react-redux";
import { Link }                from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { getInstructorData }      from "../../../services/operations/profileAPI";
import InstructorChart            from "./InstructorDashboard/InstructorChart";
import Img                        from "./../../common/Img";


// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="w-full sm:w-1/3 flex flex-col gap-2">
    <div className="h-[201px] w-full rounded-2xl skeleton" />
    <div className="h-3 w-3/4 rounded-xl skeleton" />
    <div className="h-3 w-1/2 rounded-xl skeleton" />
  </div>
);

const SkeletonDashboard = () => (
  <div className="mt-5 flex flex-col gap-5">
    <div className="flex flex-wrap gap-3">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="flex-1 min-w-[120px] h-[80px] rounded-xl skeleton" />
      ))}
    </div>
    <div className="flex border border-richblack-600 rounded-xl p-4 gap-4 h-[300px]">
      <div className="flex-1 rounded-xl skeleton" />
      <div className="hidden sm:block min-w-[220px] rounded-xl skeleton" />
    </div>
    <div className="flex flex-col gap-3">
      <div className="h-5 w-32 rounded-xl skeleton" />
      <div className="flex flex-col sm:flex-row gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  </div>
);


export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user }  = useSelector((state) => state.profile);

  const [loading, setLoading]             = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses]             = useState([]);


  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result            = await fetchInstructorCourses(token);
      if (instructorApiData?.length) setInstructorData(instructorApiData);
      if (result) setCourses(result);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const totalAmount   = instructorData?.reduce((acc, c) => acc + c.totalAmountGenerated, 0)   ?? 0;
  const totalStudents = instructorData?.reduce((acc, c) => acc + c.totalStudentsEnrolled, 0)  ?? 0;


  return (
    <div>
      {/* ── Greeting ── */}
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-bold text-richblack-5 text-center sm:text-left">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-300 text-center sm:text-left">
          Let's start something new
        </p>
      </div>


      {/* ── Loading ── */}
      {loading && <SkeletonDashboard />}


      {/* ── Has courses ── */}
      {!loading && courses.length > 0 && (
        <>
          {/* Stats strip */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { label: "Total Courses",  value: courses.length,    color: "text-richblack-5" },
              { label: "Total Students", value: totalStudents,      color: "text-blue-400" },
              { label: "Total Income",   value: `₹${totalAmount}`, color: "text-green-400" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex flex-col gap-1 bg-richblack-700 rounded-xl px-5 py-4 flex-1 min-w-[130px]"
              >
                <p className="text-xs text-richblack-300 uppercase tracking-wide">{label}</p>
                <p className={`text-3xl font-semibold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Chart + Statistics panel */}
          <div className="my-4 flex flex-col sm:flex-row gap-4 h-auto sm:h-[450px]">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-xl bg-richblack-800 p-6 flex flex-col justify-center items-center">
                <p className="text-lg font-bold text-richblack-5 mb-2">Visualize</p>
                <p className="text-richblack-300 text-center">
                  Not enough data to visualize yet. Enroll more students to see charts.
                </p>
              </div>
            )}

            {/* Statistics panel */}
            <div className="flex sm:min-w-[240px] flex-col rounded-xl bg-richblack-800 p-6 gap-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              {[
                { label: "Total Courses",  value: courses.length,    color: "text-richblack-5" },
                { label: "Total Students", value: totalStudents,      color: "text-blue-400" },
                { label: "Total Income",   value: `₹${totalAmount}`, color: "text-green-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="border-b border-richblack-700 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm text-richblack-300">{label}</p>
                  <p className={`text-3xl font-semibold mt-1 ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your courses panel */}
          <div className="rounded-xl bg-richblack-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50 hover:underline">
                  View All
                </p>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="sm:w-1/3 flex flex-col">
                  <Img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[180px] w-full rounded-xl object-cover"
                  />
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-richblack-50 line-clamp-2">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-richblack-300">
                      <span>{course.studentsEnrolled?.length ?? 0} students</span>
                      <span>·</span>
                      <span>₹{course.price}</span>
                    </div>
                    {/* Mini progress bar for avg student completion */}
                    <div className="mt-2">
                      <div className="h-1 w-full bg-richblack-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${Math.min(100, (course.studentsEnrolled?.length ?? 0) * 10)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}


      {/* ── No courses ── */}
      {!loading && courses.length === 0 && (
        <div className="mt-20 rounded-xl bg-richblack-800 p-6 py-20 text-center">
          <p className="text-2xl font-bold text-richblack-5 mb-2">
            You haven't created any courses yet
          </p>
          <p className="text-richblack-300 mb-6">
            Share your knowledge with the world. Create your first course today.
          </p>
          <Link to="/dashboard/add-course">
            <button className="px-6 py-2 bg-yellow-500 text-richblack-900 rounded-full
                               font-semibold hover:bg-yellow-400 transition-colors">
              Create a Course
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}