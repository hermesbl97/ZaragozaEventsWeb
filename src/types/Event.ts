import type { Artist } from "./Artist";
import type { Location } from "./Location";

export interface Event {
    id: number;
    name: string;
    description: string;
    eventDate: string;
    category: string;
    capacity: number;
    price: number;
    availability: boolean;
    location: Location;
    artists: Artist[];
}
