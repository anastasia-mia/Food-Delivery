import {getRandomCoordinates} from "../getRandomCoordinates.ts";

test('should return an object with lat and lng as numbers', () => {
    const centerLat = 48.85816464940564;
    const centerLng = 2.2945117950439458;
    const minRadius = 1;
    const maxRadius = 4;

    const result = getRandomCoordinates(centerLat, centerLng, minRadius, maxRadius);

    expect(result).toHaveProperty('lat');
    expect(result).toHaveProperty('lng');
    expect(typeof result.lat).toBe('number');
    expect(typeof result.lng).toBe('number');
});