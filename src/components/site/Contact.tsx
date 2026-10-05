import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT } from "./nav";
import { Reveal } from "./Reveal";
import { PREFILL_EVENT } from "./Sections";

const INTERESTS = ["Lead generation", "SEO", "SEO content", "Social media management", "Dholera property enquiry", "Something else"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 letters).").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().refine((v) => v === "" || /^\d{10,15}$/.test(v.replace(/[\s+-]/g, "")), "Phone number should be 10 to 15 digits."),
  interest: z.string(),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1000, "Please keep your message under 1000 characters."),
  website: z.string().optional(),
});
type Values = z.infer<typeof schema>;

const COOLDOWN = 30_000;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "wait">("idle");
  const last = useRef(0);
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", interest: "Lead generation", message: "", website: "" },
  });

  useEffect(() => {
    const on = (e: Event) => setValue("interest", (e as CustomEvent<string>).detail);
    window.addEventListener(PREFILL_EVENT, on);
    return () => window.removeEventListener(PREFILL_EVENT, on);
  }, [setValue]);

  const onSubmit = async (v: Values) => {
    if (v.website) { setStatus("sent"); return; }
    if (Date.now() - last.current < COOLDOWN) { setStatus("wait"); return; }
    const { error } = await supabase.from("contact_submissions").insert({
      name: v.name, email: v.email, phone: v.phone.replace(/[\s+-]/g, "") || null, interest: v.interest, message: v.message,
    });
    if (error) { setStatus("error"); return; }
    last.current = Date.now();
    setStatus("sent");
    reset();
  };

  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => setStatus("idle"), 8000);
    return () => clearTimeout(t);
  }, [status]);

  const field = "mt-2 w-full border border-line bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-accent";
  const err = (m?: string) => m && <p className="mt-1 text-sm text-accent" role="alert">{m}</p>;

  return (
    <section id="contact" className="section-y border-t border-line">
      <div className="container-x grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="h2-display h2-line mt-4">Let's talk about your project.</h2>
          <p className="mt-8 text-muted-foreground">Tell me about your project and I'll reply personally.</p>
          <div className="mt-8 flex flex-col gap-3">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="link-slide self-start">{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="link-slide self-start">{CONTACT.email}</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="link-slide self-start">LinkedIn</a>
            <a
              href="https://wa.me/919031503628"
              target="_blank"
              rel="noopener noreferrer"
              className="link-slide self-start"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
          </div>
          <label className="text-sm">Name*<input className={field} autoComplete="name" {...register("name")} />{err(errors.name?.message)}</label>
          <label className="text-sm">Email*<input type="email" className={field} autoComplete="email" {...register("email")} />{err(errors.email?.message)}</label>
          <label className="text-sm">Phone<input type="tel" className={field} autoComplete="tel" {...register("phone")} />{err(errors.phone?.message)}</label>
          <label className="text-sm">I'm interested in
            <select className={field} {...register("interest")}>{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
          </label>
          <label className="text-sm">Message*<textarea rows={5} className={field} {...register("message")} />{err(errors.message?.message)}</label>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary self-start disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
          <div aria-live="polite">
            {status === "sent" && <p className="text-accent">Thank you. I'll get back to you soon.</p>}
            {status === "error" && <p className="text-accent">Sorry, something went wrong. Please try again in a moment.</p>}
            {status === "wait" && <p className="text-accent">Your message was just sent. Please wait 30 seconds before sending another.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919031503628?text=Hi%20Nisha%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20my%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-fade fixed bottom-6 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-accent text-primary-foreground shadow-lg transition-opacity hover:opacity-85 md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm0-21.6A11.8 11.8 0 0 0 1.9 17.9L.2 24l6.3-1.7A11.8 11.8 0 1 0 12 .2Z" />
      </svg>
    </a>
  );
}
