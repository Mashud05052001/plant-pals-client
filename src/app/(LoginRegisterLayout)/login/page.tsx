import { Input } from "@nextui-org/input";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl"> This is Login Page </h1>
      <Input type="email" variant="underlined" label="Email" />
    </div>
  );
}
