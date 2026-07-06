
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { adminEndPoints } from './../apis';

const {
  GET_ALL_STUDENTS_DATA_API,
  GET_ALL_INSTRUCTORS_DATA_API,
  UPDATE_USER_APPROVAL_API,
} = adminEndPoints


// ================ get all Students Data ================
export async function getAllStudentsData(token) {
  let result = { allStudentsDetails: [], studentsCount: 0 }
  try {
    const response = await apiConnector("GET", GET_ALL_STUDENTS_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (response?.data?.success) {
      result = {
        allStudentsDetails: response.data.allStudentsDetails || [],
        studentsCount:      response.data.studentsCount      || 0,
      }
    } else {
      toast.error(response?.data?.message || "Could not load students data")
    }
  } catch (error) {
    console.log("GET_ALL_STUDENTS_DATA_API ERROR............", error)
    toast.error("Could not load students data")
  }
  return result
}


// ================ get all Instructor Data ================
export async function getAllInstructorDetails(token) {
  let result = { allInstructorsDetails: [], instructorsCount: 0 }
  try {
    const response = await apiConnector("GET", GET_ALL_INSTRUCTORS_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (response?.data?.success) {
      result = {
        allInstructorsDetails: response.data.allInstructorsDetails || [],
        instructorsCount:      response.data.instructorsCount      || 0,
      }
    } else {
      toast.error(response?.data?.message || "Could not load instructors data")
    }
  } catch (error) {
    console.log("GET_ALL_INSTRUCTORS_DATA_API ERROR............", error)
    toast.error("Could not load instructors data")
  }
  return result
}


// ================ update User Approval (Admin) ================
export async function updateUserApproval(token, userId, approved) {
  try {
    const response = await apiConnector(
      "POST",               // ✅ Changed PATCH → POST to avoid CORS preflight blocking
      UPDATE_USER_APPROVAL_API,
      { userId, approved },
      { Authorization: `Bearer ${token}` }
    )
    return response?.data
  } catch (error) {
    console.log("UPDATE_USER_APPROVAL_API ERROR", error)
    toast.error(error?.response?.data?.message || "Failed to update approval")
    return null
  }
}