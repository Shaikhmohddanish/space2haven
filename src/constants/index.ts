import { Option } from "@/types";

export const menuBarOptions = [
    {
        option: "Home",
        link: "/"
    },
    {
        option: "Interior",
        link: "/interior"
    },
    {
        option: "Properties",
        link: "/properties"
    },
    {
        option: "EMI Calculator",
        link: "/calculate-emi"
    },
    {
        option: "Loan Eligibility",
        link: "/loan-eligibility"
    },
    {
        option: "About",
        link: "/about"
    },
]

export const authTabData = [
    {
        value: "signin",
        title: "Sign In",
        description: "Sign In as admin",
    },
    {
        value: "signup",
        title: "SignUp",
        description: "Add new admin",
    },
]

// privacyData.js
export const privacyData = {
    title: "Space2Heaven - Policies",
    lastUpdated: "October 31, 2024",
    introduction: [
        "This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
        "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
    ],
    definitions: [
        { term: "Account", description: "A unique account created for You to access our Service or parts of our Service." },
        { term: "Affiliate", description: "An entity that controls, is controlled by or is under common control with a party, where 'control' means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority." },
        { term: "Company", description: "Space2Haven SP, Thane, Zenia Building, Hiranandani Circle, Hiranandani Business Park, Off Ghodbunder Rd, Thane, Mumbai, MH 400607." },
        { term: "Cookies", description: "Small files placed on Your device by a website, containing details of Your browsing history and usage." },
        { term: "Country", description: "Maharashtra, India" },
        { term: "Device", description: "Any device that can access the Service such as a computer, a cellphone or a digital tablet." },
        { term: "Personal Data", description: "Any information that relates to an identified or identifiable individual." },
        { term: "Service", description: "The Website." },
        { term: "Service Provider", description: "Any natural or legal person who processes the data on behalf of the Company." },
        { term: "Usage Data", description: "Data collected automatically, either generated by the use of the Service or from the Service infrastructure itself." },
        { term: "Website", description: "Space2Haven, accessible from www.space2haven.com" },
        { term: "You", description: "The individual accessing or using the Service, or the company or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." },
    ],
    typesOfDataCollected: {
        personalData: [
            "Email address",
            "First name and last name",
            "Phone number",
            "Usage Data",
        ],
        usageData: {
            description: "Usage Data is collected automatically when using the Service.",
            details: [
                "IP address, browser type, browser version, pages of our Service visited, time and date of visit, time spent on those pages, unique device identifiers, and other diagnostic data.",
                "Information such as device type, mobile device unique ID, IP address of mobile device, mobile operating system, mobile Internet browser type, unique device identifiers, and other diagnostic data when accessed through a mobile device.",
            ],
        },
        trackingTechnologies: [
            {
                type: "Cookies or Browser Cookies",
                description: "A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent.",
            },
            {
                type: "Web Beacons",
                description: "Small electronic files (e.g., clear gifs, pixel tags, single-pixel gifs) that permit the Company to count users or track other website statistics.",
            },
        ],
    },
    cookies: {
        description: "We use both Session and Persistent Cookies for various purposes.",
        types: [
            {
                name: "Necessary / Essential Cookies",
                type: "Session Cookies",
                admin: "Us",
                purpose: "These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features.",
            },
            {
                name: "Cookies Policy / Notice Acceptance Cookies",
                type: "Persistent Cookies",
                admin: "Us",
                purpose: "These Cookies identify if users have accepted the use of cookies on the Website.",
            },
            {
                name: "Functionality Cookies",
                type: "Persistent Cookies",
                admin: "Us",
                purpose: "These Cookies allow us to remember choices You make when You use the Website, providing a more personal experience.",
            },
        ],
    },
    useOfPersonalData: [
        { purpose: "To provide and maintain our Service", description: "including monitoring the usage of our Service." },
        { purpose: "To manage Your Account", description: "Manage Your registration and provide access to functionalities as a registered user." },
        { purpose: "For the performance of a contract", description: "for fulfilling contracts and agreements with Us." },
        // ...other purposes
    ],
    dataSharing: [
        { type: "With Service Providers", description: "We may share personal information with Service Providers to monitor and analyze the use of our Service." },
        { type: "For business transfers", description: "We may share personal information during negotiations or as part of any merger, sale, or acquisition." },
        { type: "With Affiliates", description: "We may share information with affiliates, requiring them to honor this Privacy Policy." },
        // ...other sharing scenarios
    ],
    retentionOfData: {
        description: "We retain Personal Data only as long as necessary to fulfill the purposes outlined in this Privacy Policy.",
        usageRetention: "Usage Data is retained for shorter periods unless required for security, functionality, or legal obligations.",
    },
    transferOfData: {
        description: "Your data may be transferred and processed in locations outside of Your jurisdiction.",
        consentStatement: "Your submission of information represents Your consent to this transfer.",
        securityAssurance: "We ensure adequate controls are in place to secure Your data in any transfer.",
    },
    deletePersonalData: {
        rights: [
            "You have the right to delete or request assistance in deleting Your Personal Data.",
            "You may update, amend, or delete Your information by managing Your account settings or contacting Us.",
        ],
        note: "We may retain certain information when required by law.",
    },
    dataDisclosure: {
        businessTransactions: "Your Personal Data may be transferred as part of a merger, acquisition, or asset sale.",
        lawEnforcement: "We may disclose Your Personal Data if required by law or in response to valid requests by public authorities.",
        legalRequirements: [
            "Comply with a legal obligation",
            "Protect and defend the rights or property of the Company",
            "Prevent or investigate possible wrongdoing",
            "Protect the safety of Service users or the public",
            "Protect against legal liability",
        ],
    },
    dataSecurity: "While we strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security.",
    contact: {
        email: "Hello@Space2haven.com",
        phone: "8976561551",
    },
};

export const dashboardData = [
    {
        link: "/admin/add-property",
        title: "Add Property",
        color: "bg-red-500",
        hover: "bg-red-600",
    },
    {
        link: "/admin/add-interior",
        title: "Add Interior",
        color: "bg-blue-500",
        hover: "bg-blue-600",
    },
    {
        link: "/properties",
        title: "All Properties",
        color: "bg-emerald-500",
        hover: "bg-emerald-600",
    },
    {
        link: "/admin/customers",
        title: "Customers",
        color: "bg-purple-500",
        hover: "bg-purple-600",
    },
]

export const servicesList = [
    {
        title: "Buy A Property",
        value: "buyProperty"
    },
    {
        title: "Interior Design",
        value: "interiorDesign"
    },
]


// src/constants.ts
export const cityOptions = [
    // Mumbai
    { label: "Mumbai", value: "mumbai", state: "Maharashtra" },
    { label: "Andheri", value: "andheri", state: "Maharashtra" },
    { label: "Bandra", value: "bandra", state: "Maharashtra" },
    { label: "Borivali", value: "borivali", state: "Maharashtra" },
    { label: "Dadar", value: "dadar", state: "Maharashtra" },
    { label: "Goregaon", value: "goregaon", state: "Maharashtra" },
    { label: "Malad", value: "malad", state: "Maharashtra" },
    { label: "Powai", value: "powai", state: "Maharashtra" },
    { label: "Kurla", value: "kurla", state: "Maharashtra" },
    { label: "Sion", value: "sion", state: "Maharashtra" },
    { label: "Vikhroli", value: "vikhroli", state: "Maharashtra" },
    { label: "Mulund", value: "mulund", state: "Maharashtra" },
    { label: "Chembur", value: "chembur", state: "Maharashtra" },
    { label: "Mira Road", value: "mira_road", state: "Maharashtra" },
    { label: "Dahisar", value: "dahisar", state: "Maharashtra" },
    { label: "Vasai", value: "vasai", state: "Maharashtra" },
    { label: "Virar", value: "virar", state: "Maharashtra" },

    // Navi Mumbai
    { label: "Navi Mumbai", value: "navi_mumbai", state: "Maharashtra" },
    { label: "Vashi", value: "vashi", state: "Maharashtra" },
    { label: "Sanpada", value: "sanpada", state: "Maharashtra" },
    { label: "Kopar Khairane", value: "kopar_khairane", state: "Maharashtra" },
    { label: "Turbhe", value: "turbhe", state: "Maharashtra" },
    { label: "Nerul", value: "nerul", state: "Maharashtra" },
    { label: "Seawoods", value: "seawoods", state: "Maharashtra" },
    { label: "CBD Belapur", value: "cbd_belapur", state: "Maharashtra" },
    { label: "Kharghar", value: "kharghar", state: "Maharashtra" },
    { label: "Panvel", value: "panvel", state: "Maharashtra" },
    { label: "Kamothe", value: "kamothe", state: "Maharashtra" },
    { label: "Kalamboli", value: "kalamboli", state: "Maharashtra" },
    { label: "Taloja", value: "taloja", state: "Maharashtra" },
    { label: "Ghansoli", value: "ghansoli", state: "Maharashtra" },
    { label: "Airoli", value: "airoli", state: "Maharashtra" },
    { label: "Ulwe", value: "ulwe", state: "Maharashtra" },
    { label: "Dronagiri", value: "dronagiri", state: "Maharashtra" },

    // Thane
    { label: "Thane", value: "thane", state: "Maharashtra" },
    { label: "Kalwa", value: "kalwa", state: "Maharashtra" },
    { label: "Majiwada", value: "majiwada", state: "Maharashtra" },
    { label: "Kasarvadavali", value: "kasarvadavali", state: "Maharashtra" },
    { label: "Manpada", value: "manpada", state: "Maharashtra" },
    { label: "Kalyan", value: "kalyan", state: "Maharashtra" },
    { label: "Dombivli", value: "dombivli", state: "Maharashtra" },
    { label: "Ulhasnagar", value: "ulhasnagar", state: "Maharashtra" },
    { label: "Ambernath", value: "ambernath", state: "Maharashtra" },
    { label: "Badlapur", value: "badlapur", state: "Maharashtra" },
    { label: "Mumbra", value: "mumbra", state: "Maharashtra" },
    { label: "Diva", value: "diva", state: "Maharashtra" },
    { label: "Bhiwandi", value: "bhiwandi", state: "Maharashtra" },
    { label: "Shahapur", value: "shahapur", state: "Maharashtra" },
    { label: "Titwala", value: "titwala", state: "Maharashtra" },
    { label: "Vasind", value: "vasind", state: "Maharashtra" }
];

  
  // Possession Options
  export const possessionOptions = [
    "Ready to Move",
    "In 1 Year",
    "In 2 Years",
    "In 3 Years",
    "After 3 Years"
  ];
  
  // Configuration Options (Up to 4+ BHK)
  export const configurationOptions = [
    "1 BHK", "2 BHK", "3 BHK", "4+ BHK"
  ];
  
  // Feature Options for Multi-Select
  export const featureOptions = [
    "Parking", "Gym", "Swimming Pool", "Garden",
    "24/7 Security", "Power Backup", "Clubhouse", "Lift",
    "CCTV Surveillance", "Fire Safety", "Jogging Track",
    "Children Play Area"
  ];
  


export const services = [
    {
        imageSrc: "/icons/servicesIcons/propertyAdvisory.svg",
        title: "Buy a Property",
        url: "/properties",
    },
    {
        imageSrc: "/icons/servicesIcons/tipsGuide.svg",
        title: "Design Interior",
        url: "/interior",
    },
    {
        imageSrc: "/icons/servicesIcons/emiCalculator.svg",
        title: "EMI Calculator",
        url: "/calculate-emi",
    },
];


export const contentStyles = {
    "home-properties": {
        title: "Recommended Properties",
        titleColor: "text-sand-soft",
        hrColor: "bg-sand-soft2",
        description:
            "Discover your dream property with us. Explore a wide range of real estate options for every taste and budget.",
        descriptionColor: "text-sand-soft",
    },
    "interior-self-intro": {
        title: "Explore Interior Design",
        titleColor: "text-sand-soft2",
        hrColor: "bg-sand-soft2",
        description:
            "Get inspired by exquisite interior designs to elevate your living spaces.",
        descriptionColor: "text-gray-300",
    },
    interior: {
        title: "Explore Interior Design",
        titleColor: "text-interior",
        hrColor: "bg-interior",
        description:
            "Get inspired by exquisite interior designs to elevate your living spaces.",
        descriptionColor: "text-gray-500",
    },
    "home-interior": {
        title: "Interior Design Gallery",
        titleColor: "text-home",
        hrColor: "bg-interior-highlight",
        description: "Experience the perfect blend of style and functionality.",
        descriptionColor: "text-grey-2",
    },
};

export const filterTypes = ["All", "Villa", "House", "Flat"];
