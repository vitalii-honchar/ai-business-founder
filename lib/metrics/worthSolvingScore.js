export const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 6) return 'bg-blue-600';
    if (score >= 4) return 'bg-yellow-600';
    return 'bg-red-600';
};

export const getScoreTextColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
};

export const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
}; 