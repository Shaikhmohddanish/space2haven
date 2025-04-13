export interface Configuration {
  bhkType: string;
  carpetArea: string;
  builtupArea: string;
  carpetAreaUnit: string;
  builtupAreaUnit: string;
  price: string;
}

export interface Property {
  title: string;
  propertyHeading: string;
  propertyType: string;
  price: string;
  images: string[];
  features: string[];
  perSqftRate: string;
  areaUnit: string;
  area: string;
  address: {
    city: string;
    state: string;
  }
  description: string;
  overview: string;
  recommend:boolean;
  possessionDate: string;
  developer:string;
  featured:boolean;
  newProperty:boolean;
  resale?: boolean;
  listingType?: string;
  configurations: Configuration[];  // New: For detailed configurations
  updatedAt: string;
}

export interface PropertyCardProps {
  id: string;
  imageSrc: string;
  price: string;
  features: string[]; // Updated from string to string[]
  tag: string;
  configuration: string[]; // Updated from string to string[]
  location: string;
  possessionDate?: string;
  developer?:string;
  propertyType?: string; // Optional field for property type
  recommend?: boolean; // Changed true | false to boolean (simplified)
  featured?: boolean;
  newProperty?: boolean;
}



  export interface PropertyFormValues {
    title: string;
    propertyHeading: string;
    images: File[];
    configuration: string[]; // 🔥 Change from string to string[]
    configurations: Configuration[];  // New: For detailed configurations
    description: string;
    overview: string;
    price: number;
    location: string;
    address: {
      city?: string;
      state?: string;
    };
    propertyType: string;
    area: string;
    perSqftRate: string;
    areaUnit: string;
    features: string[];
    recommend: boolean;
    possessionDate: string;
    developer:string;
    featured: boolean;
    newProperty: boolean;
    resale:boolean;
    listingType: string;
  }
  

export interface Property {
  _id: string;
  propertyType: string;
  price: string;
  images: string[];
  configuration: string[],
  configurations: Configuration[];  // New: For detailed configurations
  features: string[];
  perSqftRate: string;
  area: string;
  areaUnit: string;
  location: string;
  possessionDate: string;
  developer:string;
  featured: boolean;
  newProperty: boolean;
}

export interface InputProps {
  title?: string;
  name?: string;
  value: string;
  placeholder?: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // ✅ Add this line
}

export type AuthInputs = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export interface Admin {
  name: string;
  email: string;
}

export type Option = {
  label: string;
  value: string;
  state: string;
};

export interface PropertyPaneProps {
  contentType: "interior-self-intro" | "home-properties" | "home-interior" | "interior";
}

export interface DynamicCarouselProps {
  type: "interior-self-intro" | "home-properties" | "home-interior" | "interior"| "images";
  data: any  // Ensure TypeScript knows this is correct
  loading: boolean;
}

export interface ServiceItem {
  imageSrc: string;
  title: string;
  url?: string;
}

export interface ServiceSectionProps {
  title?: string;
  bgClassName?: string;
  subtitle?: string;
  data: ServiceItem[];
}

export interface ServiceCardProps {
  imageSrc: string;
  title: string;
  url?: string;
  className?:string;
}

export interface FilterObject {
  city: string;
  state: string;
  configuration: string[];
  possession?: string; 
  developer?:string;
  budget: {
    min: string;
    max: string;
  };
  propertyType: string[];
  newProperty?: boolean;
  resale?: boolean;
  listingType?: string;
}

export interface FilterObject {
  city: string;
  state: string;
  budget: { min: string; max: string };
  propertyType: string[];
  developer?:string;
  newProperty?: boolean;
  resale?: boolean;
  listingType?: string;
}


export interface CityNStateProps {
  cityValue: string | undefined
  stateValue: string | undefined
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  locations: Option[]
}

export interface FilterProps {
  filters: FilterObject;
  setFilters: React.Dispatch<React.SetStateAction<FilterObject>>;
}

export type DialogBoxProps = {
  filters?: FilterObject;
  setFilters?: React.Dispatch<React.SetStateAction<FilterObject>>;
  type?: string;
}

export interface CustomerDataTypes {
  _id?: string;
  name: string;
  contact: string;
  serviceType: "buyProperty" | "interiorDesign" | "sellProperty";
  createdAt?: Date | undefined;
}

export type PropertiesPageContentProps = {
  search: string;
  filters: FilterObject;
  setFilters: React.Dispatch<React.SetStateAction<FilterObject>>;
};

export type AdminMenuProp = {
  currentAdmin:Admin | null
  setCurrentAdmin:React.Dispatch<React.SetStateAction<Admin | null>>
}