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
    const toRad = (Value) => {
      return (Value * Math.PI) / 180;
    };

    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lt1 = toRad(lat1);
    var lt2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lt1) * Math.cos(lt2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  },
};
