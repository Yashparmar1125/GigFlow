import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  createdAt: number;
  read: boolean;
  meta?: Record<string, any>;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  subscribe: (event: string, handler: (...args: any[]) => void) => () => void;
  emit: (event: string, ...args: any[]) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  subscribe: () => () => { },
  emit: () => { },
  notifications: [],
  unreadCount: 0,
  markAllRead: () => { },
  removeNotification: () => { },
  clearNotifications: () => { },
});

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, user } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: string; message: string }>
  >([]);

  useEffect(() => {
    // 🔒 If not authenticated → disconnect socket
    if (!isAuthenticated || !user?._id) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setConnected(false);
      setNotifications([]);
      setToasts([]);
      return;
    }

    // ✅ ALWAYS use backend URL explicitly (never window.location.origin)
    const baseUrl =
      import.meta.env.VITE_SOCKET_URL ||
      import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV ? "http://localhost:5000" : "https://gigflow.helloyashparmar.dev");

    console.log("🔌 Socket connecting to:", baseUrl);

    if (!baseUrl) {
      throw new Error("Socket base URL is not defined");
    }

    const socket = io(baseUrl, {
      auth: { userId: user?._id },
      withCredentials: true, // 🔥 REQUIRED for cookies
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setConnected(true);
      console.log("✅ Socket connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      setConnected(false);
      console.error("❌ Socket connect_error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      setConnected(false);
      console.log("⚠️ Socket disconnected:", reason);
    });

    socket.on("notification", (payload: any) => {
      const message =
        payload.message ||
        (payload.gigTitle
          ? payload.type === "hire"
            ? `You have been hired for ${payload.gigTitle}!`
            : `New update on ${payload.gigTitle}`
          : "Notification received");

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((prev) => [
        ...prev,
        { id, type: payload.type, message },
      ]);

      setNotifications((prev) => {
        const next: NotificationItem = {
          id,
          type: payload.type,
          message,
          createdAt: Date.now(),
          read: false,
          meta: {
            gigId: payload.gigId,
            gigTitle: payload.gigTitle,
            bidderId: payload.bidderId,
            bidderName: payload.bidderName,
            price: payload.price,
          },
        };
        return [next, ...prev].slice(0, 20);
      });

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 6000);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, user?._id]);

  const subscribe = (event: string, handler: (...args: any[]) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => { };
    socket.on(event, handler);
    return () => socket.off(event, handler);
  };

  const emit = (event: string, ...args: any[]) => {
    socketRef.current?.emit(event, ...args);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      connected,
      subscribe,
      emit,
      notifications,
      unreadCount,
      markAllRead,
      removeNotification,
      clearNotifications,
    }),
    [connected, notifications, unreadCount]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}

      {/* Toasts - Enhanced UI in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => {
          const isHire = t.type === "hire";
          return (
            <div
              key={t.id}
              className={`
                pointer-events-auto
                w-80 p-4 rounded-lg shadow-2xl bg-white
                border-l-4 ${isHire ? "border-green-500" : "border-blue-500"}
                transform transition-all duration-300 ease-out
                flex items-start gap-3
                hover:translate-x-[-4px]
              `}
              role="alert"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isHire ? (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">
                  {isHire ? "Congratulations!" : "New Update"}
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-snug">
                  {t.message}
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors -mr-1 -mt-1 p-1"
              >
                <span className="sr-only">Close</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
