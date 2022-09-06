const milesToNauticalMiles = 0.868976;
const statuteMilesInNauticalMile = 1.15078;

module.exports = {
  calcNauticalMiles: (lat1, lon1, lat2, lon2) => {
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    dist = Math.acos(dist);
    dist *= 180 / Math.PI;
    dist *= 60 * statuteMilesInNauticalMile;
    dist *= milesToNauticalMiles;
    return dist;
  },

  calcKilometers: (lat1, lon1, lat2, lon2) => {
    const toRad = (param) => {
      return (param * Math.PI) / 180;
    };

    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    //Kilometers:
    return d;
  },
};
