"use client";

import { useCallback, useMemo, useState } from "react";
import styles from "./EmailRevealButton.module.css";

function CopyIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 9h10v10H9z" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SpinnerIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export default function EmailRevealButton({
  label,
  className,
  copiedLabel = "Copied",
}) {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [justCopied, setJustCopied] = useState(false);
  const revealLabel = label || "Email";

  const buttonClassName = useMemo(() => {
    const extra = [
      styles.button,
      isFlipped ? styles.flipped : "",
      isSpinning ? styles.spinning : "",
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    return extra;
  }, [className, isFlipped, isSpinning]);

  const revealEmail = useCallback(async () => {
    setIsLoading(true);
    try {
      const [data] = await Promise.all([
        fetch("/api/contact-email", { cache: "no-store" }).then((res) => {
          if (!res.ok) throw new Error("Failed to fetch email");
          return res.json();
        }),
        // Minimum loading time to show spinner
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      if (!data?.email) throw new Error("Invalid response");

      // Set email and immediately start transition
      setEmail(String(data.email));
      setIsFlipped(true);
      setIsSpinning(true);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (isLoading) return;

    if (!email) {
      await revealEmail();
      return;
    }

    try {
      await copyToClipboard(email);
      setJustCopied(true);
      window.setTimeout(() => setJustCopied(false), 1300);
    } catch {
      // No-op: copying is best-effort.
    }
  }, [email, isLoading, revealEmail]);

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleClick}
      onAnimationEnd={() => setIsSpinning(false)}
      aria-live="polite"
      aria-busy={isLoading}
      title={email ? "Copy email" : "Reveal email"}
    >
      <span className={styles.inner}>
        <span className={`${styles.face} ${styles.front}`}>
          {isLoading ? (
            <SpinnerIcon className="h-4 w-4 text-(--accent)" />
          ) : (
            <MailIcon className="h-4 w-4 text-(--accent)" />
          )}
          <span className="text-sm font-medium">{revealLabel}</span>
        </span>

        <span className={`${styles.face} ${styles.back}`}>
          <span className={`text-sm font-medium ${styles.email}`}>
            {email || ""}
          </span>
          {justCopied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">
                {copiedLabel}
              </span>
            </>
          ) : (
            <CopyIcon className="h-4 w-4 text-(--accent)" />
          )}
        </span>
      </span>
    </button>
  );
}
