// import React from 'react'

// const HighlightText = ({ text }) => {
//   return (
//     <span className='font-bold text-richblue-200 gradient_color'>
//       {" "}
//       {text}
//     </span>
//   )
// }

// export default HighlightText
import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span
      className='font-extrabold gradient_color'
      style={{
        background: 'linear-gradient(118deg, #1FA2FF 0%, #12D8FA 33%, #A6FFCB 66%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline',
      }}
    >
      {" "}{text}
    </span>
  )
}

export default HighlightText