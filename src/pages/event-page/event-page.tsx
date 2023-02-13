import React from 'react';

export function EventPage() {
  const id = window.location.href.slice(-8);

  return <div className="EventPage">{id}</div>;
}
