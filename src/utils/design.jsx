export const distanceFromEdge = 18.65;

export const getDistanceFromEdge = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1600) {
    return 16;
  } else {
    return 22;
  }
};