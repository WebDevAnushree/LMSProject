import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllStudentsData, updateUserApproval } from '../../../services/operations/adminApi'
import { toast } from "react-hot-toast";

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

const AllStudents = () => {
  const { token } = useSelector(state => state.auth);
  const [allStudents, setAllStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // ── search & filter state ──────────────────────────────────────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");   // all | active | inactive
  const [approvalFilter, setApprovalFilter] = useState("all"); // all | approved | pending
  // ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      const { allStudentsDetails, studentsCount } = await getAllStudentsData(token);
      setAllStudents(allStudentsDetails || []);
      setStudentsCount(studentsCount || 0);
      setLoading(false);
    };
    fetchAllStudents();
  }, [token]);

  // ── approve / reject handler ───────────────────────────────────
  const handleApprovalToggle = async (e, student) => {
    e.stopPropagation();
    const newApproved = !student.approved;
    const result = await updateUserApproval(token, student._id, newApproved);
    if (result?.success) {
      setAllStudents(prev =>
        prev.map(s => s._id === student._id ? { ...s, approved: newApproved } : s)
      );
      toast.success(`Student ${newApproved ? "approved" : "rejected"} successfully`);
    }
  };
  // ──────────────────────────────────────────────────────────────

  // ── filtered list ─────────────────────────────────────────────
  const filtered = allStudents.filter(s => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const matchSearch = !search || fullName.includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || (statusFilter === "active" ? s.active : !s.active);
    const matchApproval = approvalFilter === "all" || (approvalFilter === "approved" ? s.approved : !s.approved);
    return matchSearch && matchStatus && matchApproval;
  });
  // ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-8 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .table-row-hover:hover { background: rgba(255,255,255,0.02); }
        .toggle-btn { transition: background 0.2s ease, transform 0.1s ease; }
        .toggle-btn:active { transform: scale(0.95); }
      `}</style>

      {/* ── Header (no Add button) ────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-[#4a5568] mb-1">Admin Panel</p>
        <h1 className="text-2xl font-semibold text-white">Students</h1>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: studentsCount },
          { label: 'Active',         value: allStudents.filter(s => s?.active).length },
          { label: 'Approved',       value: allStudents.filter(s => s?.approved).length },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-[#1e2535] bg-[#0d1117] px-4 py-3">
            <p className="text-xs text-[#4a5568] mb-1">{stat.label}</p>
            <p className="text-xl font-semibold text-white">{loading ? '—' : stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search + Filters ───────────────────────────────────────── */}
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

        <select
          value={approvalFilter}
          onChange={e => setApprovalFilter(e.target.value)}
          className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
        >
          <option value="all">All Approvals</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>

        {(search || statusFilter !== "all" || approvalFilter !== "all") && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); setApprovalFilter("all"); }}
            className="rounded-lg border border-[#1e2535] bg-[#0d1117] px-3 py-2 text-xs text-[#4a5568] hover:text-white transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-[#1e2535] bg-[#0d1117] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e2535]">
              {['Student', 'Contact', 'DOB', 'Status', 'Approval', 'Courses'].map(h => (
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
                  {allStudents.length ? "No students match your filters" : "No students found"}
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <>
                  <tr
                    key={s._id}
                    className="table-row-hover cursor-pointer"
                    onClick={() => setExpanded(expanded === s._id ? null : s._id)}
                  >
                    {/* Student info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={s.image} name={`${s.firstName} ${s.lastName}`} />
                        <div>
                          <p className="font-medium text-white text-sm">{s.firstName} {s.lastName}</p>
                          <p className="text-xs text-[#4a5568]">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3 text-[#6b7280]">
                      {s.additionalDetails?.contactNumber || <span className="text-[#2d3748]">—</span>}
                    </td>

                    {/* DOB */}
                    <td className="px-4 py-3 text-[#6b7280]">
                      {s.additionalDetails?.dateOfBirth || <span className="text-[#2d3748]">—</span>}
                    </td>

                    {/* Active/Inactive badge */}
                    <td className="px-4 py-3">
                      <Badge active={s.active} label={s.active ? 'Active' : 'Inactive'} />
                    </td>

                    {/* ── Approve / Reject toggle button ──────────── */}
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleApprovalToggle(e, s)}
                        className={`toggle-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border
                          ${s.approved
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20'
                          }`}
                        title={s.approved ? "Click to reject" : "Click to approve"}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${s.approved ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {s.approved ? 'Approved' : 'Pending'}
                      </button>
                    </td>
                    {/* ─────────────────────────────────────────────── */}

                    {/* Courses */}
                    <td className="px-4 py-3">
                      {s.courses?.length ? (
                        <span className="inline-flex items-center rounded-full bg-[#6366f1]/10 px-2.5 py-0.5 text-xs font-medium text-[#818cf8]">
                          {s.courses.length} course{s.courses.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[#2d3748] text-xs">None</span>
                      )}
                    </td>
                  </tr>

                  {/* Expanded enrolled courses */}
                  {expanded === s._id && s.courses?.length > 0 && (
                    <tr key={`${s._id}-expanded`} className="bg-[#0a0d14]">
                      <td colSpan={6} className="px-4 py-3">
                        <p className="text-xs font-medium text-[#4a5568] uppercase tracking-wider mb-2">Enrolled Courses</p>
                        <div className="flex flex-wrap gap-2">
                          {s.courses.map(course => (
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

        {/* Row count footer */}
        {!loading && filtered.length > 0 && (
          <div className="border-t border-[#1e2535] px-4 py-2 text-xs text-[#4a5568]">
            Showing {filtered.length} of {studentsCount} student{studentsCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudents;