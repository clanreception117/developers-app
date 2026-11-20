"use client";

import React, { useState } from "react";
import { X, Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Support");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(880, "triangle", 0.05, 0.2);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D6FF]/10 border border-[#00D6FF]/30 text-[11px] font-mono text-[#00D6FF]">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT CONNECT</span>
          </div>
          <h3 className="text-xl font-bold text-white pt-1">Contact Developers App</h3>
          <p className="text-xs text-zinc-400">
            Reach out to our developer relations, hackathon partnerships, or institutional support teams.
          </p>
        </div>

        {sent ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
            <p className="text-xs text-zinc-400">
              Thank you for reaching out. A Developers App team member will reply within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivers"
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-mono">Topic / Category</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0F1420] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
              >
                <option value="General Support">General Developer Support</option>
                <option value="Hackathon Host">Host or Sponsor a Hackathon</option>
                <option value="Enterprise Recruitment">Enterprise Recruiter Access</option>
                <option value="SME Inquiry">Small Business Digital Transformation</option>
                <option value="Bug Report">Sandbox Telemetry / Bug Report</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-mono">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our engineering team support your goals?"
                className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
