import React from 'react';
import styles from './pending-approval-timeline.module.css';

interface PendingApprovalTimelineProps {
    events: { date: string; description: string; }[];
}

const PendingApprovalTimeline: React.FC<PendingApprovalTimelineProps> = ({ events }) => {
    return (
        <div className={styles.timelineContainer}>
            <h3 className={styles.timelineTitle}>Histórico de Aprovação</h3>
            {events.map((event, index) => (
                <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDate}>{event.date}</div>
                    <div className={styles.timelineDescription}>{event.description}</div>
                </div>
            ))}
        </div>
    );
};

export default PendingApprovalTimeline;
