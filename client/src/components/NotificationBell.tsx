import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const NotificationBell = () => {
  const { notifications, unreadCount, markAllRead, removeNotification, clearNotifications } = useSocket();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const renderIcon = (type: string) => {
    if (type === 'hire') {
      return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75" />
          </svg>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5-5m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z" />
        </svg>
      </span>
    );
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        className="relative p-2 rounded-full hover:bg-purple-50 transition"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10V7a4 4 0 10-8 0v3M6 10h12l-1 9H7l-1-9z" />
        </svg>
        {unreadCount > 0 && (
          <>
            <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold shadow-sm">
              {unreadCount}
            </span>
            <span className="absolute -top-0.5 -right-0.5 rounded-full w-5 h-5 animate-ping bg-orange-400 opacity-30"></span>
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900">Notifications</h4>
            <div className="flex items-center gap-2">
              <button className="text-xs text-gray-600 hover:text-purple-700" onClick={markAllRead}>
                Mark all read
              </button>
              <button className="text-xs text-gray-600 hover:text-red-600" onClick={clearNotifications}>
                Clear
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">No notifications yet</div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="px-4 py-3 hover:bg-gray-50 transition flex items-start gap-3 group">
                  {renderIcon(n.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium truncate">{n.message}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      {n.meta?.gigTitle && <span className="truncate">Gig: {n.meta.gigTitle}</span>}
                      {n.meta?.bidderName && <span className="truncate">By: {n.meta.bidderName}</span>}
                      {n.meta?.price && <span>${n.meta.price}</span>}
                      <span>•</span>
                      <span>{new Date(n.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      {n.meta?.gigId && (
                        <Link
                          to={`/gig/${n.meta.gigId}`}
                          className="text-xs font-medium text-purple-600 hover:text-purple-700"
                          onClick={() => setOpen(false)}
                        >
                          View gig
                        </Link>
                      )}
                      {n.type === 'hire' && (
                        <Link
                          to="/my-bids"
                          className="text-xs font-medium text-green-600 hover:text-green-700"
                          onClick={() => setOpen(false)}
                        >
                          View my bids
                        </Link>
                      )}
                    </div>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-gray-600"
                    onClick={() => removeNotification(n.id)}
                    aria-label="Dismiss notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

