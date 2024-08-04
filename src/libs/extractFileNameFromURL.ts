// Function to extract the file name from the S3 URL
export const extractFileNameFromURL = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 1];
};