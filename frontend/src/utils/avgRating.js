// export default function GetAvgRating(ratingArr) {
//   if (ratingArr?.length === 0) return 0
//   const totalReviewCount = ratingArr?.reduce((acc, curr) => {
//     acc += curr.rating
//     return acc
//   }, 0)

//   const multiplier = Math.pow(10, 1)
//   const avgReviewCount =
//     Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier

//   return avgReviewCount
// }
export default function GetAvgRating(ratingArr) {
    // ✅ FIX: also guard undefined/null, not just empty array
    if (!ratingArr || ratingArr.length === 0) return 0;

    const totalReviewCount = ratingArr.reduce((acc, curr) => {
        acc += Number(curr.rating) || 0;  // ✅ FIX: Number() handles string ratings like "4"
        return acc;
    }, 0);

    const multiplier = Math.pow(10, 1);
    const avgReviewCount =
        Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier;

    return avgReviewCount;
}