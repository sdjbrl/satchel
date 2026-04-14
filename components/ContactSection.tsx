"use client";

import { useState, useRef, type FormEvent } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { Send, Calendar, CheckCircle, Loader2, Paperclip, X } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/sdjbrl";

function openCalendly() {
  window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
}

type FormState = "idle" | "submitting" | "success";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = { name: "", email: "", phone: "", message: "" };

const ACCEPTED = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg";
const MAX_MB = 5;

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const data = new globalThis.FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    if (file) data.append("file", file);

    const res = await fetch("/api/contact", { method: "POST", body: data });

    if (res.ok) {
      setFormState("success");
      setFormData(initialFormData);
      setFile(null);
    } else {
      setFormState("idle");
      alert("Une erreur est survenue. Réessaie ou contacte-moi directement par email.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFileError(null);
    if (!selected) { setFile(null); return; }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setFileError(`Fichier trop volumineux (max ${MAX_MB} Mo).`);
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3"
            >
              Travaillons ensemble
            </motion.p>
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Démarrons votre{" "}
              <span className="text-gradient">projet dès maintenant</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
            >
              Toute demande reçoit une réponse sous 24h. Le devis est gratuit et sans engagement.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-7 h-full">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Envoyez-moi un message</h3>

                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                    role="alert" aria-live="polite"
                  >
                    <CheckCircle size={48} className="text-emerald-500" aria-hidden="true" />
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold text-lg mb-1">Message envoyé !</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Merci pour votre message. Je reviens vers vous sous 24h.
                      </p>
                    </div>
                    <button
                      type="button" onClick={() => setFormState("idle")}
                      className="mt-2 text-sm text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 underline underline-offset-4 transition-colors duration-200"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
                    <div className="flex flex-col gap-4">
                      {[
                        { id: "name", label: "Nom complet", type: "text", placeholder: "Jean Dupont", required: true, autoComplete: "name" },
                        { id: "email", label: "Email", type: "email", placeholder: "jean@exemple.fr", required: true, autoComplete: "email" },
                        { id: "phone", label: "Téléphone", type: "tel", placeholder: "06 00 00 00 00", required: false, autoComplete: "tel" },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {field.label}{" "}
                            {field.required && <span className="text-cyan-500 dark:text-cyan-400" aria-hidden="true">*</span>}
                          </label>
                          <input
                            id={field.id} name={field.id} type={field.type} required={field.required}
                            autoComplete={field.autoComplete}
                            value={formData[field.id as keyof FormData]}
                            onChange={handleChange} placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/50 transition-all duration-200 min-h-[44px]"
                          />
                        </div>
                      ))}

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Votre projet{" "}
                          <span className="text-cyan-500 dark:text-cyan-400" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message" name="message" required rows={4}
                          value={formData.message} onChange={handleChange}
                          placeholder="Décrivez-moi votre activité et vos besoins..."
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/50 transition-all duration-200 resize-none"
                        />
                      </div>

                      {/* File upload */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                          Cahier des charges
                          <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">(optionnel — PDF, Word, image · max 5 Mo)</span>
                        </label>

                        {file ? (
                          <div className="flex items-center gap-3 px-4 py-3 bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-200 dark:border-cyan-400/20 rounded-xl">
                            <Paperclip size={15} className="flex-shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                            <span className="text-sm text-slate-700 dark:text-slate-200 truncate flex-1">{file.name}</span>
                            <span className="text-xs text-slate-400 flex-shrink-0">{(file.size / 1024).toFixed(0)} Ko</span>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                              aria-label="Supprimer le fichier"
                            >
                              <X size={15} aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="file"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/20 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer min-h-[44px]"
                          >
                            <Paperclip size={15} aria-hidden="true" />
                            Joindre un fichier
                          </label>
                        )}

                        <input
                          ref={fileInputRef}
                          id="file"
                          name="file"
                          type="file"
                          accept={ACCEPTED}
                          onChange={handleFile}
                          className="sr-only"
                          aria-label="Joindre un cahier des charges"
                        />

                        {fileError && (
                          <p className="mt-1.5 text-xs text-red-500">{fileError}</p>
                        )}
                      </div>

                      <button
                        type="submit" disabled={formState === "submitting"}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
                      >
                        {formState === "submitting" ? (
                          <><Loader2 size={16} className="animate-spin" aria-hidden="true" />Envoi en cours...</>
                        ) : (
                          <><Send size={16} aria-hidden="true" />Envoyer mon message</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Calendly + trust */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-7 overflow-hidden flex-1">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 dark:border-cyan-400/20 text-cyan-500 dark:text-cyan-400 mb-5">
                    <Calendar size={24} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Envie d&apos;aller plus vite ?</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    Réservez directement un créneau de 30 minutes dans mon agenda. On fait connaissance, vous m&apos;expliquez votre projet — je vous propose une solution concrète.
                  </p>
                  <button
                    type="button" onClick={openCalendly}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-xl hover:bg-slate-200 dark:hover:bg-white/15 transition-all duration-200 min-h-[44px]"
                    aria-label="Réserver un créneau sur Calendly"
                  >
                    <Calendar size={16} aria-hidden="true" />
                    Réserver un créneau
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                <ul className="flex flex-col gap-3">
                  {[
                    "Devis gratuit et sans engagement",
                    "Réponse garantie sous 24h",
                    "Basé à Nice, disponible en visio",
                    "Tarif 100% transparent sur devis",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center" aria-hidden="true">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
