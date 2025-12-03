export default function Card({
  children,
  title,
  pointText,
  className = "",
}: {
  children?: React.ReactNode;
  title?: string;
  pointText?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-bg rounded-2xl shadow p-6 ${className}`}>
      <p className="text-xl font-semi-bold">{title}</p>
      <p className="pt-6 text-3xl font-bold text-primary text-right">{pointText}</p>
      {children}
    </div>
  );
}
