import { useEffect, useId, useRef, useState } from "react";
import { sayHiContent as copy } from "../data/resume";
import { nanoReact } from "./nanoBus";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim());

export function SayHiForm() {
  const id = useId();
  const emailId = `${id}-email`;
  const messageId = `${id}-message`;
  const emailErrorId = `${id}-email-error`;
  const messageErrorId = `${id}-message-error`;
  const statusId = `${id}-status`;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [errors, setErrors] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const clearSentState = () => {
    if (status === "sent") setStatus("idle");
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    clearSentState();
    if (errors.email && isValidEmail(value)) {
      setErrors((current) => ({ ...current, email: "" }));
    }
  };

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    clearSentState();
    if (errors.message && value.trim()) {
      setErrors((current) => ({ ...current, message: "" }));
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim() || isValidEmail(email)) return;
    setErrors((current) => ({ ...current, email: copy.errors.emailInvalid }));
    nanoReact({ line: copy.nano.emailInvalid, mood: "confused" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = {
      email: isValidEmail(email) ? "" : copy.errors.emailInvalid,
      message: message.trim() ? "" : copy.errors.messageEmpty,
    };
    setErrors(nextErrors);

    if (nextErrors.email) {
      nanoReact({ line: copy.nano.emailInvalid, mood: "confused" });
      return;
    }
    if (nextErrors.message) {
      nanoReact({ line: copy.nano.messageEmpty, mood: "confused" });
      return;
    }

    setStatus("sending");
    nanoReact({ line: copy.nano.sending, mood: "working", holdMs: 8000 });

    try {
      const response = await fetch(copy.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          _subject: copy.subject,
          _template: copy.template,
          _honey: honey,
        }),
      });
      const data = await response.json().catch(() => null);
      const succeeded = response.ok && (data?.success === true || data?.success === "true");
      if (!succeeded) throw new Error(data?.message || "FormSubmit request failed");
      if (!mounted.current) return;

      setStatus("sent");
      setEmail("");
      setMessage("");
      setHoney("");
      nanoReact({ line: copy.nano.success, mood: "celebrate" });
    } catch {
      if (!mounted.current) return;
      setStatus("error");
      nanoReact({ line: copy.nano.error, mood: "confused" });
    }
  };

  const sending = status === "sending";
  const statusText = status === "sent" ? copy.success : status === "error" ? copy.errors.send : "";

  return (
    <form className="say-hi" onSubmit={handleSubmit} noValidate>
      <p className="say-hi-kicker">{copy.kicker}</p>
      <p className="say-hi-intro">{copy.intro}</p>

      <div className="say-hi-field">
        <label className="say-hi-label" htmlFor={emailId}>
          {copy.emailLabel}
        </label>
        <input
          id={emailId}
          className="say-hi-input"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder={copy.emailPlaceholder}
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? emailErrorId : undefined}
          disabled={sending}
        />
        {errors.email ? (
          <p id={emailErrorId} className="say-hi-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="say-hi-field">
        <label className="say-hi-label" htmlFor={messageId}>
          {copy.messageLabel}
        </label>
        <textarea
          id={messageId}
          className="say-hi-input say-hi-textarea"
          name="message"
          rows={3}
          required
          placeholder={copy.messagePlaceholder}
          value={message}
          onChange={handleMessageChange}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? messageErrorId : undefined}
          disabled={sending}
        />
        {errors.message ? (
          <p id={messageErrorId} className="say-hi-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="say-hi-honey" aria-hidden="true">
        <label htmlFor={`${id}-honey`}>Leave this field empty</label>
        <input
          id={`${id}-honey`}
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(event) => setHoney(event.target.value)}
        />
      </div>

      <div className="say-hi-actions">
        <button className="button button-primary say-hi-submit" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? copy.sendingLabel : copy.submitLabel}
        </button>
        <p
          id={statusId}
          className={`say-hi-status${status === "sent" ? " is-success" : ""}${status === "error" ? " is-error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </p>
      </div>
    </form>
  );
}
