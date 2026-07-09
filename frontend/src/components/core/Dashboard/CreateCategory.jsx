
import { useEffect, useState }  from "react";
import { IoIosAdd }             from "react-icons/io";
import { RiDeleteBin6Line }     from "react-icons/ri";
import { useSelector }          from "react-redux";

import {
  createNewCategory,
  deleteCategory,
  fetchCourseCategories,
} from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";


// ─── Loading Skeleton ─────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="flex flex-col gap-4">
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="h-8 w-full sm:w-2/3 rounded-xl skeleton" />
    ))}
  </div>
);


// ─── Component ────────────────────────────────────────────────────────────────
const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [subLinks,    setSubLinks]    = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error,       setError]       = useState("");


  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res || []);
    } catch (err) {
      console.log("Could not fetch the category list:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCreateCategory = async () => {
    if (!newCategory.trim() || !description.trim()) {
      setError("Both name and description are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    await createNewCategory(newCategory.trim(), description.trim(), token);
    setNewCategory("");
    setDescription("");
    await fetchSublinks();          // refresh list
    setSubmitting(false);
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId, token);
    setSubLinks((prev) => prev.filter((s) => s._id !== categoryId));
  };


  return (
    <div className="border border-richblack-700 rounded-2xl bg-richblack-800 p-8 sm:px-12">

      {/* ── Header ── */}
      <h1 className="mb-2 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Create Category
      </h1>
      <p className="text-richblack-300 text-sm mb-10 text-center sm:text-left">
        Categories help students discover courses. Add or remove them here.
      </p>


      {/* ── Form ── */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-richblack-300 uppercase tracking-wide">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              placeholder="e.g. Web Development"
              onChange={(e) => { setNewCategory(e.target.value); setError(""); }}
              className="text-richblack-5 pl-4 w-full h-11 bg-richblack-700 border border-richblack-500
                         focus:border-yellow-500 outline-none rounded-xl transition-colors
                         placeholder-richblack-400 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-richblack-300 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              placeholder="Briefly describe what this category covers…"
              onChange={(e) => { setDescription(e.target.value); setError(""); }}
              rows={3}
              className="text-richblack-5 pl-4 pt-3 w-full bg-richblack-700 border border-richblack-500
                         focus:border-yellow-500 outline-none rounded-xl transition-colors
                         placeholder-richblack-400 text-sm resize-none"
            />
          </div>

          {error && (
            <p className="text-pink-300 text-xs">{error}</p>
          )}
        </div>

        <IconBtn
          text={submitting ? "Adding…" : "Add"}
          onclick={handleCreateCategory}
          disabled={!newCategory.trim() || !description.trim() || submitting}
          customClasses="mt-6 sm:mt-0 self-center sm:self-end"
        >
          <IoIosAdd />
        </IconBtn>
      </div>


      {/* ── Category list ── */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-richblack-200 uppercase tracking-wide">
            All Categories
          </p>
          <span className="text-xs text-richblack-400">
            {subLinks.length} total
          </span>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : subLinks.length === 0 ? (
          <p className="text-richblack-400 text-sm italic">
            No categories yet. Add one above.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {subLinks.map((subLink, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 bg-richblack-700
                           border border-richblack-600 rounded-xl px-5 py-3
                           hover:border-richblack-400 transition-colors group"
              >
                <div>
                  <p className="text-richblack-5 text-sm font-medium">{subLink.name}</p>
                  {subLink.description && (
                    <p className="text-richblack-400 text-xs mt-0.5 line-clamp-1">
                      {subLink.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteCategory(subLink._id)}
                  className="text-richblack-400 hover:text-pink-400 transition-colors flex-shrink-0"
                  title="Delete category"
                >
                  <RiDeleteBin6Line className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default CreateCategory;