"use client";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { serviceGroups } from "@/data/services";
import {
  contactSchema,
  services,
  budgets,
  type ContactValues,
} from "@/lib/contact";
import { ArrowUpRight, Check } from "@/components/ui/icons";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      services: compact ? ["Website Development"] : [],
      budget: compact ? "Let's figure it out" : undefined,
      website: "",
    },
  });
  const selectedServices = useWatch({
    control: form.control,
    name: "services",
  });
  const selectedBudget = useWatch({ control: form.control, name: "budget" });
  const { errors, isSubmitting } = form.formState;
  const prefix = compact ? "mini" : "brief";
  useEffect(() => {
    if (compact) return;
    const selected = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s === selected);
    if (match) form.setValue("services", [match]);
  }, [compact, form]);
  useEffect(() => {
    if (!success) return;
    result.current?.focus();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".success-wipe", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.from(".success-copy", {
        opacity: 0,
        y: 20,
        delay: 0.4,
        duration: 0.5,
      });
      gsap.from(".success-check", {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.7,
        delay: 0.4,
        ease: "power2.out",
      });
    }, result);
    return () => context.revert();
  }, [success]);
  const submit = async (values: ContactValues) => {
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      setSuccess(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't connect. Please try again.",
      );
    }
  };
  if (success)
    return (
      <div className="form-success" ref={result} tabIndex={-1} role="status">
        <div className="success-wipe" />
        <div className="success-copy">
          <Check className="success-check" size={55} />
          <h3>
            THE FIRST MOVE.
            <br />
            MADE.
          </h3>
          <p>
            Your brief passed validation. This preview doesn&apos;t send email
            yet. Connect an email provider to start receiving enquiries.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setSuccess(false);
              form.reset();
            }}
          >
            Start a new brief <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    );
  return (
    <form
      className={`contact-form ${compact ? "compact-form" : ""}`}
      onSubmit={form.handleSubmit(submit)}
      noValidate
    >
      <div className="field-pair">
        <div className="field">
          <input
            id={`${prefix}-name`}
            autoComplete="name"
            placeholder=" "
            {...form.register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
          />
          <label htmlFor={`${prefix}-name`}>
            Your name <span>*</span>
          </label>
          {errors.name && (
            <p id={`${prefix}-name-error`} className="field-error" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="field">
          <input
            id={`${prefix}-email`}
            type="email"
            autoComplete="email"
            placeholder=" "
            {...form.register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? `${prefix}-email-error` : undefined
            }
          />
          <label htmlFor={`${prefix}-email`}>
            Email address <span>*</span>
          </label>
          {errors.email && (
            <p
              id={`${prefix}-email-error`}
              className="field-error"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      {!compact && (
        <>
          <div className="field">
            <input
              id={`${prefix}-company`}
              autoComplete="organization"
              placeholder=" "
              {...form.register("company")}
            />
            <label htmlFor={`${prefix}-company`}>
              Company / brand <small>(optional)</small>
            </label>
          </div>
          <fieldset
            aria-describedby={errors.services ? "services-error" : undefined}
          >
            <legend>
              What can we build or support? <span>*</span>
            </legend>
            <div className="service-choice-groups">
              {serviceGroups.map((group) => (
                <div
                  className="service-choice-group"
                  role="group"
                  aria-labelledby={`choose-${group.id}`}
                  key={group.id}
                >
                  <p id={`choose-${group.id}`} className="service-choice-title">
                    {group.title}
                    {group.id === "development" && <span>Our core</span>}
                  </p>
                  <div className="form-chips">
                    {group.items.map((service) => (
                      <button
                        type="button"
                        key={service}
                        aria-pressed={selectedServices.includes(service)}
                        onClick={() =>
                          form.setValue(
                            "services",
                            selectedServices.includes(service)
                              ? selectedServices.filter((s) => s !== service)
                              : [...selectedServices, service],
                            { shouldValidate: true },
                          )
                        }
                      >
                        {service}
                        <span>
                          {selectedServices.includes(service) ? "−" : "+"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {errors.services && (
              <p id="services-error" className="field-error" role="alert">
                {errors.services.message}
              </p>
            )}
          </fieldset>
          <fieldset
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            <legend>
              Something in mind for the budget? <span>*</span>
            </legend>
            <div className="form-chips budget-chips">
              {budgets.map((budget) => (
                <button
                  type="button"
                  key={budget}
                  aria-pressed={selectedBudget === budget}
                  onClick={() =>
                    form.setValue("budget", budget, { shouldValidate: true })
                  }
                >
                  {budget}
                </button>
              ))}
            </div>
            {errors.budget && (
              <p id="budget-error" className="field-error" role="alert">
                {errors.budget.message}
              </p>
            )}
          </fieldset>
        </>
      )}
      <div className="field textarea-field">
        <textarea
          id={`${prefix}-message`}
          rows={compact ? 2 : 3}
          placeholder=" "
          {...form.register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? `${prefix}-message-error` : undefined
          }
        />
        <label htmlFor={`${prefix}-message`}>
          Tell us about your project <span>*</span>
        </label>
        {errors.message && (
          <p
            id={`${prefix}-message-error`}
            className="field-error"
            role="alert"
          >
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${prefix}-website`}>Leave this field blank</label>
        <input
          id={`${prefix}-website`}
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
        />
      </div>
      {serverError && (
        <p className="field-error server-error" role="alert">
          {serverError}
        </p>
      )}
      <button
        type="submit"
        className="button button-pink submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Making the first move…" : "Send your brief"}
        <ArrowUpRight size={22} />
      </button>
      <p className="form-note">
        Demo form: validates your brief without sending it.{" "}
        <a href="/privacy">Privacy details</a>.
      </p>
    </form>
  );
}
