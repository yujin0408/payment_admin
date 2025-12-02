export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
    </div>
  );
}
