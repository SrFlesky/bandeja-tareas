export const statusColors = {
  PENDING: { dot: 'bg-status-pending', line: 'bg-status-pending', border: 'border-status-pending' },
  PROGRESS: { dot: 'bg-tag-purple', line: 'bg-tag-purple', border: 'border-tag-purple' },
  FINISHED: { dot: 'bg-status-finished', line: 'bg-status-finished', border: 'border-status-finished' },
};

export const defaultStatusColor = { dot: 'bg-ink-muted', line: 'bg-ink-muted', border: 'border-ink-muted' };

export const statusPosition = {
  PENDING: 'left-0',
  PROGRESS: 'left-1/2 -translate-x-1/2',
  FINISHED: 'right-0',
};