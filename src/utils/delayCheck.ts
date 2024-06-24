export function delayCheck(lastSeen: string) {
    const lastSeenDate = new Date(lastSeen);
    const now = new Date();

    const differenceInMilliseconds = now.getTime() - lastSeenDate.getTime();
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    if (differenceInMinutes >= 60) {
        return true
    } else {
        return false
    }
}