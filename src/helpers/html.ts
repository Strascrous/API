import sanitize from "sanitize-html";
import { decode } from "entities";

export const decodeHTML = (raw: string): string => {
    raw = raw.replace(/<br\s*\/?>/gi, "\n");
    let sanitized = sanitize(raw, { allowedTags: [], allowedAttributes: {} });
    return decode(sanitized).trim();
}
