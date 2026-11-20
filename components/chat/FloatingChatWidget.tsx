"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

interface ChatMessage {
    id: string;
    role: "user" | "model";
    text: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function AvatarPlaceholder({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const [imgError, setImgError] = useState(false);

    const sizeClasses = {
        sm: "w-7 h-7 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
    }[size];

    if (imgError) {
        return (
            <div
                className={`${sizeClasses} rounded-full bg-gradient-to-tr from-g-blue to-g-green text-white font-black flex items-center justify-center shrink-0 shadow-sm select-none`}
            >
                G
            </div>
        );
    }

    return (
        <img
            src="/avatar-gerald.png"
            alt="Gerald Avatar"
            onError={() => setImgError(true)}
            className={`${sizeClasses} rounded-full object-cover border-2 border-white/80 shrink-0 shadow-sm bg-g-bg-secondary`}
        />
    );
}

export function FloatingChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "model",
            text: "Halo! Saya kembaran AI-nya Gerald 👋 Mau kepoin projek apa nih? Tanya aja soal tech stack, aplikasi yang pernah dibuat, atau cara kontaknya!",
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            text: trimmed,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Kirim maksimal 6 riwayat chat terakhir sebagai konteks percakapan
            const recentHistory = messages
                .filter((m) => m.id !== "welcome")
                .slice(-6)
                .map((m) => ({ role: m.role, text: m.text }));

            const res = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    history: recentHistory,
                }),
            });

            const data = await res.json();

            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "model",
                text: res.ok
                    ? data.reply
                    : data.message || "Waduh, ada gangguan sebentar nih. Coba lagi ya!",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "model",
                    text: "Server lokal Express-nya kayaknya lagi tidur nih (port 5000 belum nyala). Coba cek terminal dulu ya!",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {/* Jendela Pop-Up Chat */}
            {isOpen && (
                <div className="mb-3 w-[340px] sm:w-[380px] rounded-2xl border border-g-subtle bg-g-bg-surface shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
                    {/* Header Pop-Up dengan Foto Muka Gerald */}
                    <div className="p-4 bg-g-blue text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <AvatarPlaceholder size="md" />
                                <span
                                    title="Online"
                                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-g-green border-2 border-g-blue"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-bold text-sm leading-tight">
                                        Gerald AI Twin
                                    </h3>
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                                </div>
                                <p className="text-[11px] text-white/80">
                                    Tanya seputar projek & tech stack
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Tutup chat"
                            className="p-1.5 rounded-full hover:bg-white/15 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Area Balon Percakapan */}
                    <div className="p-4 h-80 overflow-y-auto space-y-3.5 bg-g-bg-secondary/30">
                        {messages.map((msg) => {
                            const isUser = msg.role === "user";
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {!isUser && <AvatarPlaceholder size="sm" />}

                                    <div
                                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${isUser
                                                ? "bg-g-blue text-white rounded-br-sm"
                                                : "bg-g-bg-surface border border-g-subtle text-g-text-main rounded-bl-sm shadow-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}

                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <AvatarPlaceholder size="sm" />
                                <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-g-bg-surface border border-g-subtle text-xs text-g-text-muted animate-pulse">
                                    Lagi mikir sebentar...
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Form Input Pesan */}
                    <form
                        onSubmit={handleSendMessage}
                        className="p-3 border-t border-g-subtle bg-g-bg-surface flex items-center gap-2"
                    >
                        <input
                            type="text"
                            maxLength={400}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tanya soal projek Gerald..."
                            className="flex-1 px-3.5 py-2 rounded-full border border-g-subtle bg-g-bg-secondary/50 text-xs sm:text-sm text-g-text-main focus:outline-none focus:border-g-blue"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            aria-label="Kirim pesan"
                            className="p-2.5 rounded-full bg-g-blue hover:bg-g-blue-hover disabled:opacity-50 text-white transition-all active:scale-95 shrink-0"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Tombol Bubble Melayang di Kanan Bawah */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Buka chat dengan Gerald AI"
                className="group relative flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-g-blue hover:bg-g-blue-hover text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
                <div className="relative">
                    <AvatarPlaceholder size="md" />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-g-green border-2 border-g-blue animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-g-green border-2 border-g-blue" />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5">
                    {isOpen ? (
                        "Tutup Chat"
                    ) : (
                        <>
                            Chat Gerald
                            <MessageSquare className="w-3.5 h-3.5 opacity-90" />
                        </>
                    )}
                </span>
            </button>
        </div>
    );
}