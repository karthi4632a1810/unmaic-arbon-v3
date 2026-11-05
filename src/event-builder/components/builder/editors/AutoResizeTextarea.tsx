import React, { useRef, useEffect, useLayoutEffect, useCallback } from "react";

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxHeight?: number;
}

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(
  (
    {
      value,
      onChange,
      onKeyDown,
      className = "",
      placeholder,
      minRows = 2,
      maxHeight,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    // Sync forwardedRef and internalRef
    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const adjustHeight = useCallback(() => {
      const el = internalRef.current;
      if (!el) return;

      // Temporarily set height to auto to get the scrollHeight of existing content
      el.style.height = "auto";
      let scrollH = el.scrollHeight;

      // In browser layout engines (Blink/WebKit), a trailing newline (\n) at the end of a textarea
      // does not create a new visual line box for scrollHeight until text is typed on it.
      // We explicitly detect trailing newlines and add line-height so the textarea expands immediately when Enter is pressed!
      const strVal = typeof el.value === "string" ? el.value : typeof value === "string" ? value : "";
      const trailingNewlines = (strVal.match(/\n+$/) || [""])[0].length;
      if (trailingNewlines > 0) {
        const computed = window.getComputedStyle(el);
        const lh = parseFloat(computed.lineHeight) || 20;
        scrollH += trailingNewlines * lh;
      }

      const minH = minRows * 24;
      const targetHeight = Math.max(scrollH, minH);

      if (maxHeight && targetHeight > maxHeight) {
        el.style.height = `${maxHeight}px`;
        el.style.overflowY = "auto";
      } else {
        el.style.height = `${targetHeight}px`;
        el.style.overflowY = "hidden";
      }
    }, [maxHeight, minRows, value]);

    useLayoutEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    useEffect(() => {
      const id = requestAnimationFrame(adjustHeight);
      return () => cancelAnimationFrame(id);
    }, [value, adjustHeight]);

    return (
      <textarea
        ref={setRefs}
        value={value}
        onChange={(e) => {
          adjustHeight();
          onChange?.(e);
        }}
        onInput={adjustHeight}
        onKeyDown={(e) => {
          // Prevent any parent from intercepting or cancelling Enter
          if (e.key === "Enter") {
            e.stopPropagation();
          }
          onKeyDown?.(e);
        }}
        rows={minRows}
        placeholder={placeholder}
        className={`overflow-hidden resize-none transition-[height] duration-75 ${className}`}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = "AutoResizeTextarea";

