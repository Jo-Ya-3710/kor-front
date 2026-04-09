export function getVisitorId(): string {
    const key = "keg_visitor_id";
    const saved = localStorage.getItem(key);

    if (saved) {
        return saved;
    }

    const newId = `visitor_${crypto.randomUUID()}`;
    localStorage.setItem(key, newId);
    return newId;
}