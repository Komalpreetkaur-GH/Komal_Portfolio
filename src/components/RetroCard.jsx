import '../styles/RetroCard.css';

const RetroCard = ({ title, date, children, onAction }) => {
    return (
        <div className="retro-card">
            <div className="retro-card-header">
                <span className="card-title">{title}</span>
                <span className="card-date">{date}</span>
            </div>
            <div className="retro-card-content">
                {children}
            </div>
            {onAction && (
                <div className="retro-card-footer">
                    <button onClick={onAction}>PRESS START</button>
                </div>
            )}
        </div>
    );
};

export default RetroCard;
