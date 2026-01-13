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
  subscribe: () => () => {},
  emit: () => {},
  notifications: [],
  unreadCount: 0,
  markAllRead: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
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
    if (!socket) return () => {};
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

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => {
          const color =
            t.type === "hire"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-blue-50 border-blue-200 text-blue-800";

          return (
            <div
              key={t.id}
              className={`rounded-xl border px-4 py-3 shadow-sm ${color} max-w-sm flex justify-between`}
            >
              <span className="text-sm">{t.message}</span>
              <button
                className="ml-3 text-xs font-medium opacity-70 hover:opacity-100"
                onClick={() =>
                  setToasts((prev) =>
                    prev.filter((x) => x.id !== t.id)
                  )
                }
              >
                Dismiss
              </button>
            </div>
          );
        })}
      </div>
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
