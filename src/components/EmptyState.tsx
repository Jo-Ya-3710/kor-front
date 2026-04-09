interface EmptyStateProps {
    message: string;
}

function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="state-box">
            <p className="state-text">{message}</p>
        </div>
    );
}

export default EmptyState;
