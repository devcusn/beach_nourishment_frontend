const haversineDistance = (coord1: Array<number>, coord2: Array<number>) => {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // Distance in meters
  return d;
};

export const polylineDistance = (arr: Array<Array<number>>) => {
  let totalLength = 0;
  if (arr.length < 2) {
    return totalLength;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const distanceBetweenTwoCoord = haversineDistance(arr[i], arr[i + 1]);
    totalLength += distanceBetweenTwoCoord;
  }
  return totalLength;
};
