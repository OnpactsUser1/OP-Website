"use client";

import { ChevronDown, CircleAlert, CircleCheck, FileText, Paperclip, Send, X } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "./Button";
import {
  ACCEPT_ATTR,
  CONTACT_SUBJECTS,
  MAX_FILES,
  MESSAGE_MAX,
  validateAttachments,
  validateContact,
  type ContactErrors,
} from "@/lib/contact";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; ticket: string }
  | { state: "error"; message: string };

const inputBase =
  "w-full rounded-2xl border bg-well px-4 py-3 text-fg placeholder:text-muted transition-colors duration-300 focus:border-accent-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2";

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-rose">
      <CircleAlert aria-hidden className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const uid = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
    files: `${uid}-files`,
  };

  function clearError(key: keyof ContactErrors) {
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list)];
    const error = validateAttachments(next);
    setFiles(error ? files : next);
    setErrors((e) => ({ ...e, attachments: error }));
    if (fileInput.current) fileInput.current.value = "";
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrors((e) => ({ ...e, attachments: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact({ name, email, subject, message, files });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "email", "subject", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }

    setStatus({ state: "sending" });
    const body = new FormData(e.currentTarget);
    body.delete("attachments");
    files.forEach((f) => body.append("attachments", f));

    try {
      const res = await fetch("/api/contact/", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ state: "success", ticket: data.ticket });
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({ state: "error", message: data.error ?? "Please check the highlighted fields." });
      }
    } catch {
      setStatus({ state: "error", message: "We couldn't send your message. Check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="card fade-in p-8 text-center" role="status">
        <CircleCheck aria-hidden className="mx-auto size-14 text-emerald" />
        <h2 className="mt-5 text-2xl font-extrabold text-fg">Message sent</h2>
        <p className="mt-2 text-fg-2">Thanks, {name.split(" ")[0]}. We&apos;ve received your message.</p>
        <div className="mx-auto mt-6 w-fit rounded-2xl border border-line bg-well px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Ticket reference</p>
          <p className="mt-1 font-mono text-2xl font-bold text-accent-ink">{status.ticket}</p>
        </div>
        <p className="mt-6 text-sm text-muted">
          Quote this reference if you follow up. We typically respond within 24 hours on business days.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setFiles([]);
            setErrors({});
            setStatus({ state: "idle" });
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const border = (key: keyof ContactErrors) => (errors[key] ? "border-rose" : "border-line");
  const remaining = MESSAGE_MAX - message.length;

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-6 p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="mb-2 block text-sm font-semibold text-fg">
            Your name
          </label>
          <input
            id={ids.name}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={`${inputBase} ${border("name")}`}
            placeholder="Full name"
          />
          <FieldError id={`${ids.name}-error`} message={errors.name} />
        </div>
        <div>
          <label htmlFor={ids.email} className="mb-2 block text-sm font-semibold text-fg">
            Your email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={`${inputBase} ${border("email")}`}
            placeholder="you@example.com"
          />
          <FieldError id={`${ids.email}-error`} message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor={ids.subject} className="mb-2 block text-sm font-semibold text-fg">
          Subject
        </label>
        <div className="relative">
          <select
            id={ids.subject}
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              clearError("subject");
            }}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? `${ids.subject}-error` : undefined}
            className={`${inputBase} ${border("subject")} appearance-none pr-12 ${subject ? "" : "text-muted"}`}
          >
            <option value="" disabled>
              Choose a subject
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s} className="text-fg">
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted"
          />
        </div>
        <FieldError id={`${ids.subject}-error`} message={errors.subject} />
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor={ids.message} className="text-sm font-semibold text-fg">
            Your message
          </label>
          <span
            id={`${ids.message}-count`}
            className={`font-mono text-xs ${remaining < 0 ? "text-rose" : remaining < 50 ? "text-amber" : "text-muted"}`}
            aria-live="polite"
          >
            {message.length} / {MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${ids.message}-count${errors.message ? ` ${ids.message}-error` : ""}`}
          className={`${inputBase} ${border("message")} resize-y`}
          placeholder="Tell us what happened, including dates and times if relevant."
        />
        <FieldError id={`${ids.message}-error`} message={errors.message} />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-fg">
          Attachments <span className="font-normal text-muted">(optional)</span>
        </p>
        <label
          htmlFor={ids.files}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed bg-well px-4 py-6 text-center transition-colors duration-300 hover:border-accent-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink ${
            errors.attachments ? "border-rose" : "border-line-strong"
          } ${files.length >= MAX_FILES ? "pointer-events-none opacity-50" : ""}`}
        >
          <Paperclip aria-hidden className="size-5 text-accent-ink" />
          <span className="text-sm font-semibold text-fg">Add files</span>
          <span id={`${ids.files}-hint`} className="text-xs text-muted">
            JPG, PNG, WEBP, HEIC or PDF · up to 3 files · 5 MB each
          </span>
          <input
            ref={fileInput}
            id={ids.files}
            name="attachments"
            type="file"
            multiple
            accept={ACCEPT_ATTR}
            disabled={files.length >= MAX_FILES}
            onChange={(e) => addFiles(e.target.files)}
            aria-describedby={`${ids.files}-hint${errors.attachments ? ` ${ids.files}-error` : ""}`}
            className="sr-only"
          />
        </label>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-well px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-fg-2">
                  <FileText aria-hidden className="size-4 shrink-0 text-muted" />
                  <span className="truncate">{f.name}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">{formatBytes(f.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${f.name}`}
                  className="grid size-7 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <FieldError id={`${ids.files}-error`} message={errors.attachments} />
      </div>

      <div className="hidden" aria-hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.state === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {status.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status.state === "sending"}>
        <Send aria-hidden className="size-4" />
        {status.state === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
