import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "DWC Code Challenge" },
    { name: "description", content: "DWC Code Challenge" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16 bg-gray-100 p-8 rounded-lg">
        <div>Welcome to DWC Code challenge</div>
      </div>
    </div>
  );
}
