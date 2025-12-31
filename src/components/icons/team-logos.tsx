import React from 'react';

interface TeamLogoProps {
  teamName: string;
  className?: string;
}

export const TeamLogo = ({ teamName, className }: TeamLogoProps) => {
  // This is a placeholder component. In a real application, you would
  // dynamically load team logos based on the teamName.
  // For now, we'll just display the first letter of the team name.

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold ${className}`}
      style={{ width: '24px', height: '24px', fontSize: '12px' }}
    >
      {getInitials(teamName)}
    </div>
  );
};
