"use client";

import Link from "next/link";
import { useContext, type ComponentProps } from "react";
import { TransitionContext } from "./motion-provider";

export function TransitionLink({
  onClick,
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const navigate = useContext(TransitionContext);
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0 ||
          props.target === "_blank"
        )
          return;
        const url = new URL(String(href), window.location.href);
        if (
          url.origin !== window.location.origin ||
          url.pathname === window.location.pathname
        )
          return;
        event.preventDefault();
        navigate(url.pathname + url.search + url.hash);
      }}
    />
  );
}
