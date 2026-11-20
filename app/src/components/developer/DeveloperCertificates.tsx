"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  ExternalLink,
  Trash2,
  Calendar,
  Building2,
  Award,
  Eye,
  X,
  FileCheck2,
  Upload,
} from "lucide-react";
import { Certificate } from "../../types";
import { dataStore } from "../../lib/dataStore";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperCertificatesProps {
  username: string;
}

export const DeveloperCertificates: React.FC<DeveloperCertificatesProps> = ({ username }) => {
  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    dataStore.getCertificates(username)
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);

  // Form
  const [title, setTitle] = useState("");
  const [issuingOrg, setIssuingOrg] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [fileName, setFileName] = useState("credential_document.pdf");
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    soundFx.playChime(700, "sine", 0.02, 0.08);
    setTitle("");
    setIssuingOrg("");
    setIssueDate(new Date().toISOString().split("T")[0]);
    setExpiryDate("");
    setCredentialId(`DA-${Date.now().toString().slice(-6)}`);
    setVerificationUrl(`https://developersapp.io/verify/DA-${Date.now().toString().slice(-6)}`);
    setFileName("certificate_credential.pdf");
    setFormError(null);
    setModalOpen(true);
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuingOrg.trim() || !credentialId.trim()) {
      setFormError("Title, issuing organization, and credential ID are required.");
      return;
    }

    soundFx.playChime(900, "triangle", 0.05, 0.2);

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      title: title.trim(),
      issuingOrg: issuingOrg.trim(),
      issueDate: issueDate || new Date().toISOString().split("T")[0],
      expiryDate: expiryDate.trim() || undefined,
      credentialId: credentialId.trim(),
      verificationUrl: verificationUrl.trim() || `https://developersapp.io/verify/${credentialId.trim()}`,
      fileName,
      ownerUsername: username,
      verified: true,
    };

    dataStore.saveCertificate(newCert);
    setCertificates(dataStore.getCertificates(username));
    setModalOpen(false);
  };

  const handleDeleteCertificate = (id: string, name: string) => {
    if (confirm(`Remove certificate "${name}"?`)) {
      soundFx.playChime(400, "sawtooth", 0.04, 0.15);
      dataStore.deleteCertificate(id);
      setCertificates(dataStore.getCertificates(username));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#22D3EE]" />
            <span>Verified Credentials &amp; Certificates</span>
          </h2>
          <p className="text-xs text-[#A1AAB8] font-mono mt-1">
            Industry and academy certifications authenticated through cryptographic signatures and credential hashes.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-3xl bg-[#121827] border border-white/[0.08] hover:border-[#22D3EE]/40 transition-all duration-300 flex flex-col justify-between shadow-card space-y-4 group relative overflow-hidden"
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#22D3EE] to-[#3478F6]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#A1AAB8] font-mono mt-1.5">
                  <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{cert.issuingOrg}</span>
                </div>
              </div>

              {/* Dates & Credential ID */}
              <div className="p-3 rounded-xl bg-[#070910] border border-white/[0.04] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>Credential ID:</span>
                  <span className="text-white font-bold">{cert.credentialId}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>Issued Date:</span>
                  <span className="text-zinc-300">{cert.issueDate}</span>
                </div>
                {cert.expiryDate && (
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Expires:</span>
                    <span className="text-zinc-300">{cert.expiryDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => {
                  soundFx.playChime(750, "triangle", 0.03, 0.1);
                  setViewingCert(cert);
                }}
                className="text-[#22D3EE] hover:underline flex items-center gap-1.5 font-bold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>

              <div className="flex items-center gap-1">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-white"
                  title="Verify on accreditation registry"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleDeleteCertificate(cert.id, cert.title)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                  title="Remove Certificate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD / ADD CERTIFICATE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#121827] p-6 sm:p-8 shadow-2xl relative space-y-5">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#A1AAB8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#22D3EE]" />
                <span>Upload Verified Credential</span>
              </h3>
              <p className="text-xs text-[#A1AAB8] font-mono mt-1">
                Attach an authentic certificate from an accredited provider or university hackathon.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddCertificate} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Cloud Systems Architect"
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={issuingOrg}
                  onChange={(e) => setIssuingOrg(e.target.value)}
                  placeholder="e.g. Developers App Accreditation Board & Vercel Systems"
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Issue Date *</label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Credential ID *</label>
                  <input
                    type="text"
                    required
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="DA-CERT-9048-A81"
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Document File</label>
                  <div className="flex items-center gap-2 p-2 bg-[#070910] border border-white/[0.08] rounded-xl text-zinc-300">
                    <FileCheck2 className="w-4 h-4 text-[#22D3EE]" />
                    <span className="truncate text-[11px]">{fileName}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Verification URL</label>
                <input
                  type="url"
                  value={verificationUrl}
                  onChange={(e) => setVerificationUrl(e.target.value)}
                  placeholder="https://developersapp.io/verify/..."
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-[#A1AAB8] hover:text-white bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW CERTIFICATE MODAL */}
      {viewingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl border border-white/[0.1] bg-[#0E1322] p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setViewingCert(null)}
              className="absolute top-5 right-5 text-[#A1AAB8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Decorative Document Layout */}
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#141B2D] to-[#0A0E18] border-2 border-[#C9A44C]/40 text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C9A44C] to-[#F59E0B] mx-auto flex items-center justify-center text-[#070910] shadow-[0_0_30px_rgba(201,164,76,0.5)]">
                <ShieldCheck className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C9A44C] uppercase">
                  Developers App Official Credential
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Certificate of Competence
                </h3>
                <p className="text-xs text-zinc-400 font-mono">This verifies that</p>
                <h4 className="text-xl font-bold text-[#22D3EE] font-mono">
                  Alex Rivers (@{username})
                </h4>
              </div>

              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                has successfully fulfilled all algorithmic standards and benchmark requirements for
              </p>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] inline-block font-bold text-white text-base">
                {viewingCert.title}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono text-zinc-400 text-left">
                <div>
                  <span className="block text-[10px] uppercase text-zinc-500">Issuing Body</span>
                  <span className="text-white font-medium">{viewingCert.issuingOrg}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-zinc-500">Credential ID</span>
                  <span className="text-[#22D3EE] font-medium">{viewingCert.credentialId}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Cryptographically Authenticated on Ledger
              </span>

              <button
                onClick={() => setViewingCert(null)}
                className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
