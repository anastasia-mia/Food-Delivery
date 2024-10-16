
export const getRandomCoordinates = (centerLat: number, centerLng: number, minRadius: number, maxRadius: number) => {
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;
    const randomAngle = Math.random() * 2 * Math.PI;

    const offsetLat = radius * Math.cos(randomAngle) / 111.32;
    const offsetLng = radius * Math.sin(randomAngle) / (111.32 * Math.cos(centerLat * Math.PI / 180));

    return {
        lat: centerLat + offsetLat,
        lng: centerLng + offsetLng,
    };
};