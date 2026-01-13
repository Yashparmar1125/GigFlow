import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

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

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useAuth();
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const [toasts, setToasts] = useState<Array<{ id: string; type: string; message: string }>>([]);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
        if (!isAuthenticated || !user?._id) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            setConnected(false);
            setToasts([]);
            setNotifications([]);
            return;
        }

        const envUrl = (import.meta.env as any).VITE_SOCKET_URL ?? (import.meta.env as any).VITE_API_URL;
        let baseUrl = envUrl as string | undefined;
        if (!baseUrl) {
            if (import.meta.env.DEV) {
                baseUrl = 'http://localhost:5000';
            } else {
                baseUrl = window.location.origin;
            }
        }

        const socket = io(baseUrl, {
            withCredentials: true,
            auth: {
                userId: user._id,
            },
        });

        socket.on('connect', () => {
            setConnected(true);
            console.log('Socket connected', { id: socket.id, userId: user._id });
        });

        socket.on('connect_error', (error) => {
            setConnected(false);
            console.error('Socket connect_error', error.message);
        });

        socket.on('disconnect', (reason) => {
            setConnected(false);
            console.log('Socket disconnected', { reason });
        });

        socket.on('notification', (payload: any) => {
            const msg =
                payload.message ||
                (payload.gigTitle
                    ? payload.type === 'hire'
                        ? `You have been hired for ${payload.gigTitle}!`
                        : `New update on ${payload.gigTitle}`
                    : 'Notification received');
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            setToasts((prev) => [...prev, { id, type: payload.type, message: msg }]);
            setNotifications((prev) => {
                const item: NotificationItem = {
                    id,
                    type: payload.type,
                    message: msg,
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
                const next = [item, ...prev];
                return next.slice(0, 20);
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
        const sock = socketRef.current;
        if (!sock) return () => { };
        sock.on(event, handler);
        return () => {
            sock.off(event, handler);
        };
    };

    const emit = (event: string, ...args: any[]) => {
        socketRef.current?.emit(event, ...args);
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const value = useMemo<SocketContextType>(
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
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((t) => {
                    const color =
                        t.type === 'hire'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-blue-50 border-blue-200 text-blue-800';
                    return (
                        <div
                            key={t.id}
                            className={`rounded-xl border px-4 py-3 shadow-sm ${color} flex items-center justify-between max-w-sm`}
                        >
                            <span className="text-sm">{t.message}</span>
                            <button
                                className="ml-3 text-xs font-medium opacity-70 hover:opacity-100"
                                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
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

