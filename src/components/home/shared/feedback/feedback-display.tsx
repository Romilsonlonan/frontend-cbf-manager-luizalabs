import React from 'react';

interface FeedbackDisplayProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ message, type }) => {
    const getClassName = () => {
        switch (type) {
            case 'success':
                return 'text-green-500';
            case 'error':
                return 'text-red-500';
            case 'info':
                return 'text-blue-500';
            default:
                return '';
        }
    };

    return (
        <div className={`p-2 rounded ${getClassName()}`}>
            {message}
        </div>
    );
};

export { FeedbackDisplay };
