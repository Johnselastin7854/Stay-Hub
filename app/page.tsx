import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/Hotel/HotelList";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams);

  if (!hotels) return <h1>No Hotels Found</h1>;
  return (
    <>
      <HotelList hotels={hotels} />
    </>
  );
}
