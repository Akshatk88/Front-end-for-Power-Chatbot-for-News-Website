import React from 'react';
import '../styles/SessionControls.scss';

interface SessionControlsProps {
  onResetSession: () => void;
  sessionId: string | null;
  loading?: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  onResetSession,
  sessionId,
  loading = false
}) => {
  return (
    <div className="session-controls">
      <div className="session-info">
        <span className="session-label">Session ID:</span>
        <span className="session-id">{sessionId || 'Loading...'}</span>
      </div>
      <button
        onClick={onResetSession}
        disabled={loading}
        className="reset-button"
        title="Clear chat history and start new session"
      >
        Reset Session
      </button>
    </div>
  );
};

export default SessionControls;