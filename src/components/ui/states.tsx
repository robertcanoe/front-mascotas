import type { ReactNode } from "react";

export const LoadingState = ({ text = "Cargando..." }: { text?: string }) => (
  <div className="state-card" role="status" aria-live="polite">
    <div className="skeleton" />
    <p>{text}</p>
  </div>
);

export const ErrorState = ({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) => (
  <section className="state-card">
    <h2>{title}</h2>
    <p>{message}</p>
    {action}
  </section>
);

export const EmptyState = ({ title, message }: { title: string; message: string }) => (
  <section className="state-card">
    <h2>{title}</h2>
    <p>{message}</p>
  </section>
);
