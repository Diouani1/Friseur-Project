function getTimeDifference(timestamp) {
  const currentTime = new Date();
  const itemTime = new Date(timestamp);

  const timeDiff = Math.abs(currentTime - itemTime);
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months}mo ago`;
  } else {
    return `${years}y ago`;
  }
}

export { getTimeDifference };
