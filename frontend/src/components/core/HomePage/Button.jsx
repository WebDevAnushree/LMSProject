// import React from 'react'
// import {Link} from "react-router-dom"

// const Button = ({children, active, linkto}) => {
//   return (
//     <Link to={linkto}>

//         <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
//         ${active ? "bg-yellow-50 text-black":" bg-richblack-800"}
//         hover:scale-95 transition-all duration-200
//         `}>
//             {children}
//         </div>

//     </Link>
//   )
// }

// export default Button
import React from 'react'
import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`
          relative group overflow-hidden
          text-center text-[13px] px-8 py-3 rounded-xl font-bold
          transition-all duration-300 hover:scale-[0.97]
          ${active
            ? "bg-yellow-50 text-richblack-900 shadow-[0_0_24px_rgba(255,214,76,0.35)] hover:shadow-[0_0_32px_rgba(255,214,76,0.5)]"
            : "bg-richblack-800 text-richblack-50 border border-richblack-600/50 hover:border-richblack-400/60 hover:bg-richblack-700"
          }
        `}
      >
        {/* Shine sweep on active */}
        {active && (
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                        bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </div>
    </Link>
  )
}

export default Button