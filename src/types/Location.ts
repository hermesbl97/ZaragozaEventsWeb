export interface Location {
    id: number;
    name: string;
    description: string;
    category: string;
    streetLocated: string;
    postalCode: number;
    registerDate: Date;
    disabledAccess: boolean;
    longitude: number;
    latitude: number;
}