import { formatDistanceToNow } from "date-fns";

/**
 * format time ago
 * @param timestamp the timestamp to format
 * @returns the formatted time ago
 */
export const formatTimeAgo = (timestamp: string): string => {
    const date = new Date(timestamp);

    return formatDistanceToNow(date, { addSuffix: true });
};
