import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const HotelAlert = () => {
  return (
    <>
      <Alert className="bg-indigo-600 text-white">
        <Terminal className="h-4 w-4" />
        <AlertTitle>One last step!</AlertTitle>
        <AlertDescription>
          Your Hotel is created successfully 🔥
          <p>Please add some rooms to complete your hotel setup!</p>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default HotelAlert;
