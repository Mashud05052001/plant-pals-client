type TProps = {
  params: { id: string };
  searchParams: Record<string, unknown>;
};
export default function Page({ params, searchParams }: TProps) {
  console.log(params, searchParams);
  return (
    <div>
      <h1 className="text-2xl"> This is Single post page </h1>
    </div>
  );
}
