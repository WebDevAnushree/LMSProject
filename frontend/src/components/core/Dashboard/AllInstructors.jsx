// // import { useEffect, useState } from "react";
// // import { VscAdd } from "react-icons/vsc";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

// // import { getAllInstructorDetails } from "../../../services/operations/adminApi";

// // import IconBtn from "../../common/IconBtn";




// // // loading skeleton
// // const LoadingSkeleton = () => {
// //   return (<div className="flex p-5 flex-col gap-6 border-b border-2 border-b-richblack-500">
// //     <div className="flex flex-col sm:flex-row gap-5 items-center mt-7">
// //       <p className='h-[150px] w-[150px] rounded-full skeleton'></p>
// //       <div className="flex flex-col gap-2 ">
// //         <p className='h-4 w-[160px] rounded-xl skeleton'></p>
// //         <p className='h-4 w-[270px] rounded-xl skeleton'></p>
// //         <p className='h-4 w-[100px] rounded-xl skeleton'></p>
// //       </div>
// //     </div>
// //     <div className='flex gap-5'>
// //       <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
// //       <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
// //       <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
// //     </div>
// //   </div>)
// // }


// // function AllInstructors() {
// //   const { token } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();
// //   const [allInstructorDetails, setAllInstructorDetails] = useState([]);
// //   const [instructorsCount, setInstructorsCount] = useState();
// //   const [loading, setLoading] = useState(false)



// //   useEffect(() => {
// //     const fetchInstructorsData = async () => {
// //       setLoading(true)
// //       const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
// //       if (allInstructorsDetails) {
// //         setAllInstructorDetails(allInstructorsDetails);
// //         setInstructorsCount(instructorsCount)
// //       }
// //       setLoading(false)
// //     };

// //     fetchInstructorsData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   return (
// //     <div>
// //       <div className="mb-14 flex items-center justify-between text-white">
// //         <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">All Instructors Details</h1>

// //         <IconBtn text="Add Instructor" onclick={() => navigate("")}>
// //           <VscAdd />
// //         </IconBtn>
// //       </div>

// //       <Table className="rounded-xl border-2 border-richblack-500 ">
// //         <Thead>
// //           <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-500 px-6 py-2">
// //             <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
// //               Instructors : {instructorsCount}
// //             </Th>

// //             <Th className=" ml-4 text-sm font-medium uppercase text-richblack-100">
// //               Status
// //             </Th>
// //           </Tr>
// //         </Thead>
// //         <Tbody>
// //           {
// //             loading ? <>
// //               <LoadingSkeleton />
// //               <LoadingSkeleton />
// //               <LoadingSkeleton />
// //             </>
// //               // if No Data Available
// //               :
// //               !allInstructorDetails ? <div className='text-5xl py-5 bg-yellow-800 text-white text-center'>No Data Available</div>
// //                 :
// //                 allInstructorDetails?.map((instructor) => (
// //                   <div
// //                     key={instructor._id}
// //                     className='border-x border-2 border-richblack-500 '
// //                   >
// //                     <Tr className="flex gap-x-10 px-6 py-8">
// //                       <Td className="flex flex-1 gap-x-2">
// //                         <img
// //                           src={instructor.image}
// //                           alt="student"
// //                           className="h-[150px] w-[150px] rounded-full "
// //                         />
// //                         <div className="flex flex-col justify-between">
// //                           <p className="text-lg font-semibold text-richblack-5">
// //                             <div className='text-sm font-normal'>
// //                               <p className='text-base font-bold capitalize'>{instructor.firstName + " " + instructor.lastName}</p>
// //                               <p>{instructor.email}</p>

// //                               <p>
// //                                 Gender:{" "}
// //                                 {instructor.additionalDetails.gender
// //                                   ? instructor.additionalDetails.gender
// //                                   : "Not define"}
// //                               </p>
// //                               <p>
// //                                 Mobile No:{" "}
// //                                 {instructor.additionalDetails.contactNumber
// //                                   ? instructor.additionalDetails.contactNumber
// //                                   : "No Data"}
// //                               </p>
// //                               <p>
// //                                 DOB:{" "}
// //                                 {instructor.additionalDetails.dateOfBirth
// //                                   ? instructor.additionalDetails.dateOfBirth
// //                                   : "No Data"}
// //                               </p>
// //                             </div>
// //                           </p>
                          
// //                         </div>
// //                       </Td>
// //                       <Td className="mr-[11.5%] text-sm font-medium text-richblack-100">
// //                         {instructor.active ? "Active" : "Inactive"}
// //                       </Td>
// //                       <Td className="mr-[8%] text-sm font-medium text-richblack-100">
// //                         {instructor.approved ? "Approved" : "Not Approved"}
// //                       </Td>
// //                     </Tr>


// //                     {instructor.courses.length ? (
// //                       <Tr className="flex gap-x-10 px-6 pb-5">
// //                         <p className="text-yellow-50 ">Built Courses</p>
// //                         <div className='grid grid-cols-5 gap-y-5'>
// //                           {instructor.courses.map((course) => (
// //                             <div className="text-white text-sm" key={course._id}>
// //                               <p>{course.courseName}</p>
// //                               <p className="text-sm font-normal">Price: ₹{course.price}</p>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </Tr>)
// //                       :
// //                       <div className="px-6 text-white mb-4">Not Purchased any course</div>
// //                     }
// //                   </div>

// //                 ))}
// //         </Tbody>
// //       </Table>
// //     </div>
// //   );
// // }

// // export default AllInstructors;
// import { useEffect, useState } from "react";
// import { VscAdd } from "react-icons/vsc";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAllInstructorDetails } from "../../../services/operations/adminApi";

// const LoadingSkeleton = () => (
//   <tr className="border-b border-[#1e2535]">
//     {[...Array(5)].map((_, i) => (
//       <td key={i} className="px-4 py-3">
//         <div className="h-4 rounded bg-[#1e2535] animate-pulse" style={{ width: `${60 + i * 10}%` }} />
//       </td>
//     ))}
//   </tr>
// );

// const Badge = ({ active, label }) => (
//   <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium
//     ${active
//       ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
//       : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'}`}>
//     <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-rose-400'}`} />
//     {label}
//   </span>
// );

// const Avatar = ({ src, name }) => {
//   const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
//   const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
//   const color = colors[name?.charCodeAt(0) % colors.length] || colors[0];

//   if (src && src !== '/') {
//     return <img src={src} alt={name} className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10" />;
//   }
//   return (
//     <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
//       style={{ background: color }}>
//       {initials}
//     </div>
//   );
// };

// function AllInstructors() {
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [allInstructorDetails, setAllInstructorDetails] = useState([]);
//   const [instructorsCount, setInstructorsCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     const fetchInstructorsData = async () => {
//       setLoading(true);
//       const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
//       if (allInstructorsDetails) {
//         setAllInstructorDetails(allInstructorsDetails);
//         setInstructorsCount(instructorsCount || 0);
//       }
//       setLoading(false);
//     };
//     fetchInstructorsData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-8 font-['DM_Sans',sans-serif]">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         .table-row-hover:hover { background: rgba(255,255,255,0.02); }
//       `}</style>

//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-widest text-[#4a5568] mb-1">Admin Panel</p>
//           <h1 className="text-2xl font-semibold text-white">Instructors</h1>
//         </div>
//         <button
//           onClick={() => navigate("")}
//           className="inline-flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5254cc] transition-colors"
//         >
//           <VscAdd size={14} />
//           Add Instructor
//         </button>
//       </div>

//       {/* Stats bar */}
//       <div className="mb-6 grid grid-cols-3 gap-4">
//         {[
//           { label: 'Total Instructors', value: instructorsCount },
//           { label: 'Active', value: allInstructorDetails.filter(i => i?.active).length },
//           { label: 'Approved', value: allInstructorDetails.filter(i => i?.approved).length },
//         ].map(stat => (
//           <div key={stat.label} className="rounded-xl border border-[#1e2535] bg-[#0d1117] px-4 py-3">
//             <p className="text-xs text-[#4a5568] mb-1">{stat.label}</p>
//             <p className="text-xl font-semibold text-white">{loading ? '—' : stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border border-[#1e2535] bg-[#0d1117] overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-[#1e2535]">
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">Instructor</th>
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">Contact</th>
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">DOB</th>
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">Status</th>
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">Approval</th>
//               <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">Courses Built</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#1e2535]">
//             {loading ? (
//               [...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)
//             ) : !allInstructorDetails?.length ? (
//               <tr>
//                 <td colSpan={6} className="px-4 py-12 text-center text-[#4a5568]">No instructors found</td>
//               </tr>
//             ) : (
//               allInstructorDetails.map((inst) => (
//                 <>
//                   <tr
//                     key={inst._id}
//                     className="table-row-hover cursor-pointer"
//                     onClick={() => setExpanded(expanded === inst._id ? null : inst._id)}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <Avatar src={inst.image} name={`${inst.firstName} ${inst.lastName}`} />
//                         <div>
//                           <p className="font-medium text-white text-sm capitalize">{inst.firstName} {inst.lastName}</p>
//                           <p className="text-xs text-[#4a5568]">{inst.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-[#6b7280]">
//                       {inst.additionalDetails?.contactNumber || <span className="text-[#2d3748]">—</span>}
//                     </td>
//                     <td className="px-4 py-3 text-[#6b7280]">
//                       {inst.additionalDetails?.dateOfBirth || <span className="text-[#2d3748]">—</span>}
//                     </td>
//                     <td className="px-4 py-3">
//                       <Badge active={inst.active} label={inst.active ? 'Active' : 'Inactive'} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <Badge active={inst.approved} label={inst.approved ? 'Approved' : 'Pending'} />
//                     </td>
//                     <td className="px-4 py-3">
//                       {inst.courses?.length ? (
//                         <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-2.5 py-0.5 text-xs font-medium text-[#818cf8]">
//                           {inst.courses.length} course{inst.courses.length > 1 ? 's' : ''}
//                         </span>
//                       ) : (
//                         <span className="text-[#2d3748] text-xs">None</span>
//                       )}
//                     </td>
//                   </tr>

//                   {/* Expanded courses row */}
//                   {expanded === inst._id && inst.courses?.length > 0 && (
//                     <tr key={`${inst._id}-expanded`} className="bg-[#0a0d14]">
//                       <td colSpan={6} className="px-4 py-3">
//                         <p className="text-xs font-medium text-[#4a5568] uppercase tracking-wider mb-2">Built Courses</p>
//                         <div className="flex flex-wrap gap-2">
//                           {inst.courses.map(course => (
//                             <div key={course._id} className="flex items-center gap-2 rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2">
//                               <div>
//                                 <p className="text-xs font-medium text-white">{course.courseName}</p>
//                                 <p className="text-xs text-[#4a5568]">₹{course.price}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AllInstructors;
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getAllInstructorDetails, updateUserApproval } from "../../../services/operations/adminApi";
// import { toast } from "react-hot-toast";

// const LoadingSkeleton = () => (
//   <tr className="border-b border-[#1e2535]">
//     {[...Array(6)].map((_, i) => (
//       <td key={i} className="px-4 py-3">
//         <div className="h-4 rounded bg-[#1e2535] animate-pulse" style={{ width: `${60 + i * 10}%` }} />
//       </td>
//     ))}
//   </tr>
// );

// const Badge = ({ active, label }) => (
//   <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium
//     ${active
//       ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
//       : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'}`}>
//     <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-rose-400'}`} />
//     {label}
//   </span>
// );

// const Avatar = ({ src, name }) => {
//   const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
//   const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
//   const color = colors[name?.charCodeAt(0) % colors.length] || colors[0];
//   if (src && src !== '/') {
//     return <img src={src} alt={name} className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10" />;
//   }
//   return (
//     <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
//       style={{ background: color }}>
//       {initials}
//     </div>
//   );
// };

// function AllInstructors() {
//   const { token } = useSelector((state) => state.auth);
//   const [allInstructorDetails, setAllInstructorDetails] = useState([]);
//   const [instructorsCount, setInstructorsCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [expanded, setExpanded] = useState(null);

//   // ── new state for search / filter ──────────────────────────────
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive
//   const [approvalFilter, setApprovalFilter] = useState("all"); // all | approved | pending
//   // ──────────────────────────────────────────────────────────────

//   useEffect(() => {
//     const fetchInstructorsData = async () => {
//       setLoading(true);
//       const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
//       if (allInstructorsDetails) {
//         setAllInstructorDetails(allInstructorsDetails);
//         setInstructorsCount(instructorsCount || 0);
//       }
//       setLoading(false);
//     };
//     fetchInstructorsData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ── approve / reject handler ───────────────────────────────────
//   const handleApprovalToggle = async (e, inst) => {
//     e.stopPropagation(); // don't expand/collapse the row
//     const newApproved = !inst.approved;
//     const result = await updateUserApproval(token, inst._id, newApproved);
//     if (result?.success) {
//       setAllInstructorDetails(prev =>
//         prev.map(i => i._id === inst._id ? { ...i, approved: newApproved } : i)
//       );
//       toast.success(`Instructor ${newApproved ? "approved" : "rejected"} successfully`);
//     }
//   };
//   // ──────────────────────────────────────────────────────────────

//   // ── filtered list ─────────────────────────────────────────────
//   const filtered = allInstructorDetails.filter(inst => {
//     const fullName = `${inst.firstName} ${inst.lastName}`.toLowerCase();
//     const matchSearch = !search || fullName.includes(search.toLowerCase()) || inst.email.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = statusFilter === "all" || (statusFilter === "active" ? inst.active : !inst.active);
//     const matchApproval = approvalFilter === "all" || (approvalFilter === "approved" ? inst.approved : !inst.approved);
//     return matchSearch && matchStatus && matchApproval;
//   });
//   // ──────────────────────────────────────────────────────────────

//   return (
//     <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-8 font-['DM_Sans',sans-serif]">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         .table-row-hover:hover { background: rgba(255,255,255,0.02); }
//         .toggle-btn { transition: background 0.2s ease, transform 0.1s ease; }
//         .toggle-btn:active { transform: scale(0.95); }
//       `}</style>

//       {/* ── Header (no Add button) ───────────────────────────────── */}
//       <div className="mb-8">
//         <p className="text-xs font-medium uppercase tracking-widest text-[#4a5568] mb-1">Admin Panel</p>
//         <h1 className="text-2xl font-semibold text-white">Instructors</h1>
//       </div>

//       {/* ── Stats bar ─────────────────────────────────────────────── */}
//       <div className="mb-6 grid grid-cols-3 gap-4">
//         {[
//           { label: 'Total Instructors', value: instructorsCount },
//           { label: 'Active',            value: allInstructorDetails.filter(i => i?.active).length },
//           { label: 'Approved',          value: allInstructorDetails.filter(i => i?.approved).length },
//         ].map(stat => (
//           <div key={stat.label} className="rounded-xl border border-[#1e2535] bg-[#0d1117] px-4 py-3">
//             <p className="text-xs text-[#4a5568] mb-1">{stat.label}</p>
//             <p className="text-xl font-semibold text-white">{loading ? '—' : stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* ── Search + Filters ──────────────────────────────────────── */}
//       <div className="mb-4 flex flex-wrap gap-3">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by name or email…"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="flex-1 min-w-[200px] rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
//         />

//         {/* Status filter */}
//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
//         >
//           <option value="all">All Status</option>
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>

//         {/* Approval filter */}
//         <select
//           value={approvalFilter}
//           onChange={e => setApprovalFilter(e.target.value)}
//           className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
//         >
//           <option value="all">All Approvals</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//         </select>

//         {/* Clear filters */}
//         {(search || statusFilter !== "all" || approvalFilter !== "all") && (
//           <button
//             onClick={() => { setSearch(""); setStatusFilter("all"); setApprovalFilter("all"); }}
//             className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-xs text-[#4a5568] hover:text-white transition-colors"
//           >
//             Clear filters
//           </button>
//         )}
//       </div>

//       {/* ── Table ─────────────────────────────────────────────────── */}
//       <div className="rounded-xl border border-[#1e2535] bg-[#0d1117] overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-[#1e2535]">
//               {['Instructor', 'Contact', 'DOB', 'Status', 'Approval', 'Courses Built'].map(h => (
//                 <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#1e2535]">
//             {loading ? (
//               [...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)
//             ) : !filtered.length ? (
//               <tr>
//                 <td colSpan={6} className="px-4 py-12 text-center text-[#4a5568]">
//                   {allInstructorDetails.length ? "No instructors match your filters" : "No instructors found"}
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((inst) => (
//                 <>
//                   <tr
//                     key={inst._id}
//                     className="table-row-hover cursor-pointer"
//                     onClick={() => setExpanded(expanded === inst._id ? null : inst._id)}
//                   >
//                     {/* Instructor info */}
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <Avatar src={inst.image} name={`${inst.firstName} ${inst.lastName}`} />
//                         <div>
//                           <p className="font-medium text-white text-sm capitalize">{inst.firstName} {inst.lastName}</p>
//                           <p className="text-xs text-[#4a5568]">{inst.email}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Contact */}
//                     <td className="px-4 py-3 text-[#6b7280]">
//                       {inst.additionalDetails?.contactNumber || <span className="text-[#2d3748]">—</span>}
//                     </td>

//                     {/* DOB */}
//                     <td className="px-4 py-3 text-[#6b7280]">
//                       {inst.additionalDetails?.dateOfBirth || <span className="text-[#2d3748]">—</span>}
//                     </td>

//                     {/* Active/Inactive badge */}
//                     <td className="px-4 py-3">
//                       <Badge active={inst.active} label={inst.active ? 'Active' : 'Inactive'} />
//                     </td>

//                     {/* ── Approve / Reject toggle button ──────────── */}
//                     <td className="px-4 py-3">
//                       <button
//                         onClick={(e) => handleApprovalToggle(e, inst)}
//                         className={`toggle-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border
//                           ${inst.approved
//                             ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20'
//                             : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'
//                           }`}
//                         title={inst.approved ? "Click to reject" : "Click to approve"}
//                       >
//                         <span className={`h-1.5 w-1.5 rounded-full ${inst.approved ? 'bg-emerald-400' : 'bg-rose-400'}`} />
//                         {inst.approved ? 'Approved' : 'Pending'}
//                       </button>
//                     </td>
//                     {/* ─────────────────────────────────────────────── */}

//                     {/* Courses count */}
//                     <td className="px-4 py-3">
//                       {inst.courses?.length ? (
//                         <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-2.5 py-0.5 text-xs font-medium text-[#818cf8]">
//                           {inst.courses.length} course{inst.courses.length > 1 ? 's' : ''}
//                         </span>
//                       ) : (
//                         <span className="text-[#2d3748] text-xs">None</span>
//                       )}
//                     </td>
//                   </tr>

//                   {/* Expanded courses row */}
//                   {expanded === inst._id && inst.courses?.length > 0 && (
//                     <tr key={`${inst._id}-expanded`} className="bg-[#0a0d14]">
//                       <td colSpan={6} className="px-4 py-3">
//                         <p className="text-xs font-medium text-[#4a5568] uppercase tracking-wider mb-2">Built Courses</p>
//                         <div className="flex flex-wrap gap-2">
//                           {inst.courses.map(course => (
//                             <div key={course._id} className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2">
//                               <p className="text-xs font-medium text-white">{course.courseName}</p>
//                               <p className="text-xs text-[#4a5568]">₹{course.price}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               ))
//             )}
//           </tbody>
//         </table>

//         {/* Row count footer */}
//         {!loading && filtered.length > 0 && (
//           <div className="border-t border-[#1e2535] px-4 py-2 text-xs text-[#4a5568]">
//             Showing {filtered.length} of {instructorsCount} instructor{instructorsCount !== 1 ? 's' : ''}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllInstructors;





import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllInstructorDetails } from "../../../services/operations/adminApi";

const LoadingSkeleton = () => (
  <tr className="border-b border-[#1e2535]">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 rounded bg-[#1e2535] animate-pulse" style={{ width: `${60 + i * 10}%` }} />
      </td>
    ))}
  </tr>
);

const Badge = ({ active, label }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium
    ${active
      ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
      : 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-rose-400'}`} />
    {label}
  </span>
);

const Avatar = ({ src, name }) => {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const color = colors[name?.charCodeAt(0) % colors.length] || colors[0];
  if (src && src !== '/') {
    return <img src={src} alt={name} className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10" />;
  }
  return (
    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ background: color }}>
      {initials}
    </div>
  );
};

function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true);
      const { allInstructorsDetails, instructorsCount } = await getAllInstructorDetails(token);
      if (allInstructorsDetails) {
        setAllInstructorDetails(allInstructorsDetails);
        setInstructorsCount(instructorsCount || 0);
      }
      setLoading(false);
    };
    fetchInstructorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = allInstructorDetails.filter(inst => {
    const fullName = `${inst.firstName} ${inst.lastName}`.toLowerCase();
    const matchSearch = !search || fullName.includes(search.toLowerCase()) || inst.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || (statusFilter === "active" ? inst.active : !inst.active);
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-8 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .table-row-hover:hover { background: rgba(255,255,255,0.02); }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-[#4a5568] mb-1">Admin Panel</p>
        <h1 className="text-2xl font-semibold text-white">Instructors</h1>
      </div>

      {/* Stats bar */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: 'Total Instructors', value: instructorsCount },
          { label: 'Active', value: allInstructorDetails.filter(i => i?.active).length },
          { label: 'Total Courses', value: allInstructorDetails.reduce((acc, i) => acc + (i.courses?.length || 0), 0) },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-[#1e2535] bg-[#0d1117] px-4 py-3">
            <p className="text-xs text-[#4a5568] mb-1">{stat.label}</p>
            <p className="text-xl font-semibold text-white">{loading ? '—' : stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {(search || statusFilter !== "all") && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); }}
            className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-xs text-[#4a5568] hover:text-white transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#1e2535] bg-[#0d1117] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e2535]">
              {['Instructor', 'Contact', 'DOB', 'Status', 'Approval', 'Courses Built'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4a5568]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2535]">
            {loading ? (
              [...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)
            ) : !filtered.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[#4a5568]">
                  {allInstructorDetails.length ? "No instructors match your filters" : "No instructors found"}
                </td>
              </tr>
            ) : (
              filtered.map((inst) => (
                <>
                  <tr
                    key={inst._id}
                    className="table-row-hover cursor-pointer"
                    onClick={() => setExpanded(expanded === inst._id ? null : inst._id)}
                  >
                    {/* Instructor info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={inst.image} name={`${inst.firstName} ${inst.lastName}`} />
                        <div>
                          <p className="font-medium text-white text-sm capitalize">{inst.firstName} {inst.lastName}</p>
                          <p className="text-xs text-[#4a5568]">{inst.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3 text-[#6b7280]">
                      {inst.additionalDetails?.contactNumber || <span className="text-[#2d3748]">—</span>}
                    </td>

                    {/* DOB */}
                    <td className="px-4 py-3 text-[#6b7280]">
                      {inst.additionalDetails?.dateOfBirth || <span className="text-[#2d3748]">—</span>}
                    </td>

                    {/* Active/Inactive badge */}
                    <td className="px-4 py-3">
                      <Badge active={inst.active} label={inst.active ? 'Active' : 'Inactive'} />
                    </td>

                    {/* Approval badge — same as students, plain static badge */}
                    <td className="px-4 py-3">
                      <Badge active={inst.approved} label={inst.approved ? 'Approved' : 'Pending'} />
                    </td>

                    {/* Courses count */}
                    <td className="px-4 py-3">
                      {inst.courses?.length ? (
                        <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-2.5 py-0.5 text-xs font-medium text-[#818cf8]">
                          {inst.courses.length} course{inst.courses.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[#2d3748] text-xs">None</span>
                      )}
                    </td>
                  </tr>

                  {/* Expanded courses row */}
                  {expanded === inst._id && inst.courses?.length > 0 && (
                    <tr key={`${inst._id}-expanded`} className="bg-[#0a0d14]">
                      <td colSpan={6} className="px-4 py-3">
                        <p className="text-xs font-medium text-[#4a5568] uppercase tracking-wider mb-2">Built Courses</p>
                        <div className="flex flex-wrap gap-2">
                          {inst.courses.map(course => (
                            <div key={course._id} className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2">
                              <p className="text-xs font-medium text-white">{course.courseName}</p>
                              <p className="text-xs text-[#4a5568]">₹{course.price}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>

        {!loading && filtered.length > 0 && (
          <div className="border-t border-[#1e2535] px-4 py-2 text-xs text-[#4a5568]">
            Showing {filtered.length} of {instructorsCount} instructor{instructorsCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllInstructors;