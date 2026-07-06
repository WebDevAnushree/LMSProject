import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useNavigate } from "react-router-dom"
import { MdOutlineReceiptLong } from "react-icons/md"
import { FaRupeeSign } from "react-icons/fa"
import { BsCheckCircleFill } from "react-icons/bs"

export default function PurchaseHistory() {
    const { token } = useSelector((state) => state.auth)
    const [purchasedCourses, setPurchasedCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            setLoading(true)
            try {
                const res = await getUserEnrolledCourses(token)
                if (res) setPurchasedCourses(res)
            } catch (err) {
                console.log("Error fetching purchase history", err)
            }
            setLoading(false)
        }
        fetchEnrolledCourses()
    }, [])

    // Calculate total amount spent
    const totalSpent = purchasedCourses.reduce((acc, course) => acc + (course?.price || 0), 0)

    return (
        <div>
            <h1 className="mb-2 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
                Purchase History
            </h1>
            <p className="mb-10 text-richblack-400 text-sm text-center sm:text-left">
                All your course purchases and payment records
            </p>

            {/* ✅ Summary Card */}
            {!loading && purchasedCourses.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-richblack-800 border border-richblack-700 rounded-xl px-6 py-4 flex-1 min-w-[160px]">
                        <MdOutlineReceiptLong className="text-yellow-100 text-3xl" />
                        <div>
                            <p className="text-richblack-400 text-xs">Total Purchases</p>
                            <p className="text-richblack-5 text-2xl font-bold">{purchasedCourses.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-richblack-800 border border-richblack-700 rounded-xl px-6 py-4 flex-1 min-w-[160px]">
                        <FaRupeeSign className="text-yellow-100 text-2xl" />
                        <div>
                            <p className="text-richblack-400 text-xs">Total Amount Spent</p>
                            <p className="text-yellow-100 text-2xl font-bold">₹{totalSpent}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-richblack-800 border border-richblack-700 rounded-xl px-6 py-4 flex-1 min-w-[160px]">
                        <BsCheckCircleFill className="text-caribbeangreen-300 text-2xl" />
                        <div>
                            <p className="text-richblack-400 text-xs">Payment Status</p>
                            <p className="text-caribbeangreen-300 text-lg font-bold">All Successful</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Skeleton */}
            {loading ? (
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-4 bg-richblack-800 rounded-lg animate-pulse">
                            <div className="h-16 w-24 rounded bg-richblack-600 shrink-0" />
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="h-4 w-48 rounded bg-richblack-600" />
                                <div className="h-3 w-72 rounded bg-richblack-600" />
                                <div className="h-3 w-32 rounded bg-richblack-600" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : purchasedCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-4">
                    <MdOutlineReceiptLong className="text-richblack-500 text-7xl" />
                    <p className="text-center text-2xl text-richblack-100">No purchases yet</p>
                    <p className="text-center text-richblack-400 text-sm">Courses you buy will appear here</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 rounded-lg bg-yellow-50 px-6 py-2 text-richblack-900 font-semibold hover:bg-yellow-25 transition-all"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <>
                    {/* Table Header */}
                    <div className="grid grid-cols-12 rounded-t-lg bg-richblack-500 px-6 py-3 gap-4">
                        <p className="col-span-6 text-sm font-medium uppercase text-richblack-100">Course</p>
                        <p className="col-span-2 text-sm font-medium uppercase text-richblack-100 hidden sm:block">Duration</p>
                        <p className="col-span-2 text-sm font-medium uppercase text-richblack-100 text-center">Amount</p>
                        <p className="col-span-2 text-sm font-medium uppercase text-richblack-100 text-center">Status</p>
                    </div>

                    {/* Course Rows */}
                    <div className="flex flex-col divide-y divide-richblack-700 rounded-b-lg border border-richblack-700">
                        {purchasedCourses.map((course, i) => (
                            <div key={i} className="grid grid-cols-12 items-center gap-4 px-6 py-4 bg-richblack-800 hover:bg-richblack-700 transition-all">

                                {/* Course Info — col 6 */}
                                <div className="col-span-6 flex items-center gap-3">
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.courseName}
                                        className="h-14 w-20 rounded object-cover shrink-0"
                                    />
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <p className="text-sm font-semibold text-richblack-5 truncate">
                                            {course?.courseName}
                                        </p>
                                        <p className="text-xs text-richblack-300 truncate">
                                            {course?.courseDescription?.split(" ").slice(0, 8).join(" ")}...
                                        </p>
                                        <span className="text-xs text-richblack-400">
                                            {course?.category?.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Duration — col 2 */}
                                <div className="col-span-2 hidden sm:flex items-center">
                                    <span className="text-sm text-richblack-100">
                                        {course?.totalDuration || "N/A"}
                                    </span>
                                </div>

                                {/* Amount — col 2 */}
                                <div className="col-span-2 flex flex-col items-center gap-1">
                                    <p className="text-base font-bold text-yellow-100">
                                        ₹{course?.price}
                                    </p>
                                    <p className="text-xs text-richblack-400">paid</p>
                                </div>

                                {/* Status + Action — col 2 */}
                                <div className="col-span-2 flex flex-col items-center gap-2">
                                    <span className="flex items-center gap-1 rounded-full bg-richblack-700 px-3 py-1 text-xs font-medium text-caribbeangreen-300 border border-caribbeangreen-300">
                                        <BsCheckCircleFill size={10} />
                                        Paid
                                    </span>
                                    <button
                                        onClick={() => navigate("/dashboard/enrolled-courses")}
                                        className="text-xs text-blue-300 hover:text-blue-100 underline transition-all"
                                    >
                                        View Course
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ✅ Footer Total */}
                    <div className="flex justify-end mt-4 px-6 py-4 bg-richblack-800 rounded-lg border border-richblack-700">
                        <div className="flex flex-col items-end gap-1">
                            <p className="text-richblack-400 text-sm">Total Amount Paid</p>
                            <p className="text-yellow-100 text-2xl font-bold">₹{totalSpent}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}