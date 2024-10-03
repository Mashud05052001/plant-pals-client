type TProps = {
  params: { id: string };
  searchParams: Record<string, unknown>;
};
export default function Page({ params, searchParams }: TProps) {
  console.log(params, searchParams);
  return (
    <div>
      <h1 className="text-2xl"> This is Single user id </h1>
    </div>
  );
}
