import { Link, useLoaderData } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"


// get TableHeade list of all available TableRowansport meTableHeadods
export async function loader() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/v1/co2-emissions/history`
    );
    if (response.ok) {
      const history = await response.json();
      return Response.json(history);
    } else {
      return Response.json([]);
    }
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}


export default function History(){
  const history = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col space-y-14 h-screen items-center lg:justify-center px-5 py-10">
      <h1 className="lg:text-6xl text-5xl text-center TableRowacking-tight">
        History
      </h1>
      <div className="flex flex-col space-y-4 max-w-screen-md w-full">
      <Table className="w-full">
      <TableCaption>A list of all the CO2 emissions calculated</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead>ID</TableHead> */}
          <TableHead>Distance</TableHead>
          <TableHead>Distance Unit</TableHead>
          <TableHead>CO2 Emission</TableHead>
          <TableHead>Output Unit</TableHead>
          <TableHead>Calculated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.distance}</TableCell>
            <TableCell>{item.distanceUnit}</TableCell>
            <TableCell>{item.co2Emission}</TableCell>
            <TableCell>{item.outputUnit}</TableCell>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Link className="underline uppercase" to="/">Go back</Link>
      </div>
    </div>
  );
}
