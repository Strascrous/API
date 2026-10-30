export const encodeRestaurantId = (restaurant: number, academy: string): string =>
    Buffer.from(`${restaurant}:${academy}`, "ascii")
        .toString("base64url");

export const decodeRestaurantId = (token: string): { restaurantId: number; academy: string; } | null => {
    let decoded = Buffer.from(token, "base64url").toString("ascii");

    let separator = decoded.indexOf(":");
    if (separator === -1) return null;

    let rawId = decoded.slice(0, separator);
    let academy = decoded.slice(separator + 1);

    let restaurantId = Number(rawId);
    if (!/^\d+$/.test(rawId) || !Number.isSafeInteger(restaurantId)) return null;

    return { restaurantId, academy };
}
