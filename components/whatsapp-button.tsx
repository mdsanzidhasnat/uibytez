"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/content";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
