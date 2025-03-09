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
  propertyType: string;
  price: string;
  images: string[];
  bhk: string
  features: string[];
  yearBuilt: number;
  area: string;
  address: {
    city: string;
    state: string;
  }
  dimensions: string;
  description: string;
  recommend:boolean;
  possession:string;
  developer:string;
  url:string;
  featured:boolean;
  newProperty:boolean;
  configurations: Configuration[];  // New: For detailed configurations
  updatedAt: string
}

export interface PropertyCardProps {
  id: string;
  imageSrc: string;
  price: string;
  features: string[]; // Updated from string to string[]
  tag: string;
  configuration: string[]; // Updated from string to string[]
  location: string;
  possession?: string; // Optional field for possession
  developer?:string;
  propertyType?: string; // Optional field for property type
  recommend?: boolean; // Changed true | false to boolean (simplified)
  url?:string;
  featured?: boolean;
  newProperty?: boolean;
}



  export interface PropertyFormValues {
    title: string;
    images: File[];
    configuration: string[]; // 🔥 Change from string to string[]
    configurations: Configuration[];  // New: For detailed configurations
    description: string;
    price: number;
    location: string;
    address: {
      city?: string;
      state?: string;
    };
    propertyType: string;
    area: string;
    yearBuilt: number;
    features: string[];
    recommend: boolean;
    possession: string;
    developer:string;
    url:string;
    featured: boolean;
    newProperty: boolean;
  }
  

export interface Property {
  _id: string;
  propertyType: string;
  price: string;
  images: string[];
  configuration: string[],
  configurations: Configuration[];  // New: For detailed configurations
  features: string[];
  yearBuilt: number;
  area: string;
  location: string;
  possession: string;
  developer:string;
  url:string;
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
  title: string;
  bgClassName?: string;
  data: ServiceItem[];
}

export interface ServiceCardProps {
  imageSrc: string;
  title: string;
  url?: string;
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
}

export interface FilterObject {
  city: string;
  state: string;
  budget: { min: string; max: string };
  propertyType: string[];
  developer?:string;
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