export function validateAndNormalizeUrl(input) {
    if (!input)
        throw new Error('URL is required');
    let url = input.trim();
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            throw new Error('Invalid URL protocol');
        }
        // Remove fragment
        parsed.hash = '';
        return parsed.toString();
    }
    catch (err) {
        throw new Error('Invalid URL');
    }
}
export default validateAndNormalizeUrl;
