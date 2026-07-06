
import React, { useEffect, useState } from "react"
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
} from "react-icons/ti"


function RatingStars({ Review_Count, Star_Size }) {
    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 5,    // ✅ FIX: default 5 empty so something renders before useEffect fires
    })

    useEffect(() => {
        // ✅ FIX: guard undefined/NaN/out-of-range — old code crashed on undefined Review_Count
        const count = Math.min(Math.max(parseFloat(Review_Count) || 0, 0), 5)

        const wholeStars = Math.floor(count)
        // ✅ FIX: only show half star when decimal part is >= 0.5
        // Old code showed half star for ANY decimal (e.g. 3.1 showed half star incorrectly)
        const hasHalf = !Number.isInteger(count) && (count - wholeStars) >= 0.5

        setStarCount({
            full:  wholeStars,
            half:  hasHalf ? 1 : 0,
            // ✅ FIX: always ensures full + half + empty === 5 exactly
            empty: 5 - wholeStars - (hasHalf ? 1 : 0),
        })
    }, [Review_Count])


    return (
        <div className="flex gap-1 text-yellow-100">

            {/* Full stars */}
            {[...Array(starCount.full)].map((_, i) => (
                <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
            ))}

            {/* Half star — only render if half === 1 */}
            {starCount.half === 1 && (
                <TiStarHalfOutline key="half" size={Star_Size || 20} />
            )}

            {/* Empty stars */}
            {[...Array(starCount.empty)].map((_, i) => (
                <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
            ))}

        </div>
    )
}

export default RatingStars