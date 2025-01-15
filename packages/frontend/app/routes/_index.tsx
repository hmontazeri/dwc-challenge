import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Form } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "CO² Emission Calculator" },
    { name: "description", content: "DWC Code Challenge" },
  ];
};

// get the list of all available transport methods
export async function loader() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/co2-emissions/transport-methods`
    );
    if (response.ok) {
      const transportMethods = await response.json();
      return Response.json(transportMethods);
    } else {
      return Response.json([]);
    }
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const transportMethod = formData.get("transportMethod");
  const distance = Number(formData.get("distance"));
  const distanceUnit = formData.get("distanceUnit");
  const outputUnit = formData.get("outputUnit");

  // call calculate endpoint
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/v1/co2-emissions/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transportMethod,
        distance,
        distanceUnit,
        outputUnit,
      }),
    }
  );
  const resJson = await response.json();
  return Response.json(resJson);
}

const distanceUnits = ["m", "km"];
const outputUnits = ["g", "kg"];

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [transportMethod, setTransportMethod] = useState("");
  const [distance, setDistance] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("");
  const [outputUnit, setOutputUnit] = useState("");
  const [formDisabled, setFormDisabled] = useState(true);

  useEffect(() => {
    if (transportMethod && distance && distanceUnit && outputUnit) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
    }
  }, [transportMethod, distance, distanceUnit, outputUnit]);

  return (
    <div className="flex flex-col space-y-14 h-screen items-center lg:justify-center px-5 py-10">
      <h1 className="text-black lg:text-6xl text-5xl text-center tracking-tight">
        CO² Emission Calculator
      </h1>
      {actionData && (
        <div className="max-w-md w-full bg-gray-50 flex flex-col gap-4 border border-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl text-center">Results</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase text-gray-500">
                CO² Emission
              </span>
              <span className="font-semibold">
                {actionData.co2Emission} {outputUnit}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase text-gray-500">Distance</span>
              <span className="font-semibold">
                {actionData.distance} {distanceUnit}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase text-gray-500">
                Transport Method
              </span>
              <span className="font-semibold">
                {actionData.transportMethod}
              </span>
            </div>
            <Button
              className="self-start mt-5"
              onClick={() => window.location.reload()}>
              Make another calculation
            </Button>
          </div>
        </div>
      )}
      {!actionData && (
        <div className="break-all max-w-md w-full bg-gray-50 flex flex-col gap-16 border border-gray-100 p-8 rounded-lg">
          <Form method="post" className="flex flex-col gap-4">
            <Select
              name="transportMethod"
              required
              onValueChange={(value) => setTransportMethod(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a transport method" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item: string) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              name="distanceUnit"
              required
              onValueChange={(value) => setDistanceUnit(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select distance unit" />
              </SelectTrigger>
              <SelectContent>
                {distanceUnits.map((item: string) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              name="outputUnit"
              required
              onValueChange={(value) => setOutputUnit(value)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select output unit" />
              </SelectTrigger>
              <SelectContent>
                {outputUnits.map((item: string) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="bg-white"
              type="number"
              name="distance"
              required
              placeholder="Enter distance"
              onChange={(e) => setDistance(Number(e.target.value))}
            />
            <div className="flex flex-row justify-between items-center  mt-5">
              <Button
                type="submit"
                className="self-start"
                disabled={formDisabled}>
                Calculate CO²
              </Button>
              <Link to="/history" className="underline">
                History
              </Link>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
