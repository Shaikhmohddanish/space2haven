"use client"

import { CityNState } from '@/components';
import { cityOptions } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { Configuration, Option, PropertyFormValues } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function extractGoogleMapsPbParam(iframeString:string) {
  // Extract the URL from the iframe string
  const urlMatch = iframeString.match(/src="([^"]+)"/);
  if (urlMatch && urlMatch[1]) {
      const url = urlMatch[1];
      const pbMatch = url.match(/[?&]pb=([^&#]*)/);
      if (pbMatch && pbMatch[1]) {
          return pbMatch[1];
      } else {
          return '';
      }
  } else {
      return '';
  }
}
const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
  try {
      const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload-image", {
              method: "POST",
              body: formData,
          });

          const data = await response.json();

          if (response.ok && data.url) {
              return data.url;
          } else {
              console.error("❌ Error uploading to Cloudinary:", data.error);
              return "";
          }
      });

      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls.filter((url) => url !== "");  // ✅ Filter out empty URLs
  } catch (error) {
      console.error("❌ Error uploading images:", error);
      return [];
  }
};

const AddProperty: React.FC = () => {

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Option[]>([]);
  const [adminDetails, setAdminDetails] = useState<string | null>(null);
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);

  const [formData, setFormData] = useState<PropertyFormValues>({
    title: '',
    propertyHeading: '',
    images: [],
    configuration: [], // 🔥 Ensure it's an array
    configurations: [],  // New: For detailed configurations
    description: '',
    price: 0,
    location: '',
    address: {
      city: '',
      state: '',
    },
    propertyType: '',
    area: '',
    areaUnit: 'sq.ft',
    yearBuilt: new Date().getFullYear(),
    features: [],
    recommend: false,
    possession: '',
    possessionDate: 'To be announced',
    developer: '',
    url: '',
    featured: false,
    newProperty: false,
  });
  
  



  useEffect(() => {
    const storedAdminDetails = localStorage.getItem("adminDetails");
    const storedLocationsDropdown = localStorage.getItem("locationDropdown");
    const storedLocations = localStorage.getItem("locations");

    // Redirect if adminDetails is missing
    !storedAdminDetails ? router.push("/")
    : setAdminDetails(storedAdminDetails)

    if (storedLocationsDropdown && storedLocations) {
      // Parse JSON data
      const dropdownArray: string[] = JSON.parse(storedLocationsDropdown);
      const locationsArray: Option[] = JSON.parse(storedLocations);

      // Filter locations
      const filteredLocations = locationsArray.filter((item) =>
        dropdownArray.includes(item.value)
      );

      setLocations(filteredLocations);
    } else {
      // Fallback to default cityOptions
      localStorage.setItem("locations", JSON.stringify(cityOptions));
      setLocations(cityOptions);
    }
  }, [router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && name === "images" && files) {
      // Handle file input
      const selectedFiles = Array.from(files);
      const validFiles = selectedFiles.filter((file) => file.size <= 500 * 1024); // 500 KB size limit

      if (selectedFiles.length > 10) {
        alert("You can only upload up to 10 files.");
      }

      if (validFiles.length < selectedFiles.length) {
        alert("Some files exceed the 500 KB size limit and were excluded.");
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: validFiles.slice(0, 10), // Limit to 10 valid files
      }));
    } else if (name === "city") {
      // Handle city selection with state update
      const selectedCity = locations.find((city) => city.value === value);
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          city: value,
          state: selectedCity ? selectedCity.state : "",
        },
      }));
    } else {
      // Handle other input types
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Trim whitespace for text inputs
      }));
    }
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(',').map(feature => feature.trim());
    setFormData({ ...formData, features });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let imageUrls: string[] = [];

    
  

    // ✅ Step 1: Upload images to Cloudinary first if they exist
    if (Array.isArray(formData.images) && formData.images.length > 0) {
        imageUrls = await uploadImagesToCloudinary(formData.images as File[]);
    }

    // ✅ Step 2: Prepare form data with image URLs
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof PropertyFormValues];
        if (key !== "images" && key !== "address" && key !== "features" && key !== "configuration" && value !== undefined) {
            form.append(key, String(value).trim());
        }
    });

    // ✅ Append Cloudinary image URLs to form data
    if (imageUrls.length > 0) {
        imageUrls.forEach((url) => form.append("images", url));
    } else {
        console.error("❌ No images uploaded or images array is empty!");
    }

    // ✅ Ensure `possession` and `developer` are sent properly
    if (formData.possession) {
        form.append("possession", formData.possession.trim());
    }

    if(formData.possessionDate){
      form.append("possessionDate", JSON.stringify(formData.possession).trim());
  }

   
  if (Array.isArray(formData.configurations) && formData.configurations.length > 0) {
    form.append("configurations", JSON.stringify(formData.configurations));
}

if (formData.areaUnit) {
  form.append("areaUnit", formData.areaUnit);
}

    if (formData.developer) {
        form.append("developer", formData.developer.trim());
    }

    if(formData.url){
      form.append("url",extractGoogleMapsPbParam(formData.url.trim()));
    }

    // ✅ Address fields
    Object.keys(formData.address).forEach((addressKey) => {
        const value = formData.address[addressKey as keyof typeof formData.address];
        if (value) {
            form.append(`address[${addressKey}]`, value.trim());
        }
    });


    // ✅ Multi-Select Configuration (BHK)
    if (Array.isArray(formData.configuration) && formData.configuration.length > 0) {
        form.append("configuration", JSON.stringify(formData.configuration));  // 🔥 Convert to JSON string
    }

    // ✅ Multi-Select Features
    if (Array.isArray(formData.features) && formData.features.length > 0) {
        form.append("features", JSON.stringify(formData.features));  // 🔥 Convert to JSON string
    } 

    // ✅ Step 3: Submit form data to backend
    try {
        const response = await axios.post(`${window.location.origin}/api/admin/add-property`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        toast({ description: response?.data?.msg });
        router.push("/properties");
    } catch (error: any) {
        toast({
            description: error?.response?.data?.error || "Failed to add property",
        });
    } finally {
        setLoading(false);
    }
};

  return (
    <section className="min-h-screen flex-center py-24 px-4 bg-gray-100 flex-col gap-4 w-full">
  {adminDetails ? (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:max-w-2xl bg-white p-6 lg:p-8 rounded-lg shadow-md space-y-6 flex-center flex-col"
    >
      <h1 className="text-home font-semibold text-xl text-center">Add Property</h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {/* Title */}
        <div className="col-span-full">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-class w-full"
            placeholder="Name of property..."
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium mb-1">Property Heading</label>
          <input
            type="text"
            name="propertyHeading"
            value={formData.propertyHeading}
            onChange={handleChange}
            className="input-class w-full"
            placeholder="Heading of property..."
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium mb-1">Developer</label>
          <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            required
            className="input-class w-full"
            placeholder="Type Developer name..."
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium mb-1">Google Map Location</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="input-class w-full"
            placeholder="Paste google map location url..."
          />
        </div>

        {/* Images */}
<div className="col-span-full">
  <label className="block font-medium mb-1">Images (up to 10, max 500 KB each)</label>
  <input
    type="file"
    name="images"
    multiple
    accept=".jpg, .jpeg, .png, .webp, .avif"
    onChange={(e) => {
      const files = e.target.files;
      if (files) {
        const selectedFiles = Array.from(files);
        const validFiles = selectedFiles.filter((file) => file.size <= 500 * 1024); // 500 KB size limit

        if (selectedFiles.length > 10) {
          alert("You can only upload up to 10 files.");
          return;
        }

        if (validFiles.length < selectedFiles.length) {
          alert("Some files exceed the 500 KB size limit and were excluded.");
        }

        setFormData((prevData) => ({
          ...prevData,
          images: validFiles.slice(0, 10), // Limit to 10 valid files
        }));
      }
    }}
    className="input-class w-full"
  />

  {/* Image Previews */}
  {formData.images.length > 0 && (
    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {formData.images.map((file, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-20 object-cover rounded-md shadow-sm"
          />
        </div>
      ))}
    </div>
  )}
</div>


        {/* Description */}
        <div className="col-span-full">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-class w-full"
            placeholder="Type description..."
          />
        </div>

        

        {/* Configuration Dropdown */}
        <label className="block font-medium mb-1">Configuration (BHK)</label>
        <div className="flex flex-wrap gap-2">
  {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bhk) => (
    <label key={bhk} className="flex items-center gap-2">
      <input
        type="checkbox"
        value={bhk}
        checked={formData.configuration.includes(bhk)}
        onChange={(e) => {
          setFormData((prevData) => ({
            ...prevData,
            configuration: e.target.checked
              ? [...prevData.configuration, bhk] // ✅ Add new selection
              : prevData.configuration.filter((item) => item !== bhk) // ✅ Remove if unchecked
          }));
        }}
      />
      {bhk}
    </label>
  ))}
</div>



        {/* Location, Address Details */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-class w-full"
              placeholder="Area name"
            />
          </div>

          <CityNState cityValue={formData.address.city} stateValue={formData.address.state} handleChange={handleChange} locations={locations} />
        </div>

        {/* Property Type and Additional Info */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="input-class w-full"
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Villa">Villa</option>
              <option value="Plots">Plots</option>
            </select>

          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="input-class w-full"
              placeholder="368"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Area Unit</label>
            <select
              name="areaUnit"
              value={formData.areaUnit || "sq.ft"}
              onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })}
              className="input-class w-full"
              required
            >
              <option value="sq.ft">sq.ft</option>
              <option value="sq.m">sq.m</option>
              <option value="acre">acre</option>
              <option value="hectare">hectare</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Year Built</label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              required
              className="input-class w-full"
            />
          </div>

          {/* Possession Dropdown */}
          <div>
            <label className="block font-medium mb-1">Possession</label>
            <select
              name="possession"
              value={formData.possession}
              onChange={handleChange}
              required
              className="input-class w-full"
            >
              <option value="">Select Possession</option>
              <option value="ready">Ready to Move</option>
              <option value="1_year">In 1 Year</option>
              <option value="2_years">In 2 Years</option>
              <option value="3_years">In 3 Years</option>
              <option value="after_3_years">After 3 Years</option>
            </select>
          </div>

          <div className="mt-2">
              <label className="block font-medium mb-1">Possession Date</label>
              <input
                  type="date"
                  name="possessionDate"
                  value={formData.possessionDate || ""}
                  onChange={(e) => setFormData({ ...formData, possessionDate: e.target.value })}
                  required
                  className="input-class w-full"
              />
          </div>
          
        </div>

        {/* Price, Possession, Features - Now in One Row */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Input */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-class w-full"
            />
          </div>

          
        
          

          

          {/* Features Multi-Select Dropdown */}
          <div className="relative">
  <label className="block font-medium mb-1">Features</label>
  <div className="input-class w-full cursor-pointer bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center"
    onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
  >
    {formData.features.length > 0 ? formData.features.join(", ") : "Select Features"}
    <span className="ml-2">&#9662;</span>
  </div>

  {showFeaturesDropdown && (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
      {[
  "24/7 Security & CCTV Surveillance",
  "Power Backup",
  "High-Speed Elevators",
  "Car Parking (Covered & Open)",
  "Water Supply & Rainwater Harvesting",
  "Swimming Pool",
  "Clubhouse",
  "Gym & Fitness Center",
  "Indoor Games",
  "Multipurpose Court",
  "Kids’ Play Area",
  "Landscaped Gardens & Green Spaces",
  "Jogging & Cycling Tracks",
  "Yoga & Meditation Area",
  "Elderly Sitting Areas",
  "Pet-Friendly Zones",
  "Smart Home Features",
  "Retail & Convenience Stores",
  "Multipurpose Hall & Co-Working Spaces",
  "Cinema/Private Theatre",
  "EV Charging Stations"
]
.map((feature) => (
        <label key={feature} className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer">
          <input
            type="checkbox"
            value={feature}
            checked={formData.features.includes(feature)}
            onChange={(e) => {
              const selectedFeatures = e.target.checked
                ? [...formData.features, feature]
                : formData.features.filter((item) => item !== feature);
              setFormData((prevData) => ({ ...prevData, features: selectedFeatures }));
            }}
          />
          {feature}
        </label>
      ))}
    </div>
  )}
</div>

        </div>

        
      </div>

      


      <div className="flex items-center gap-8 pt-4">
  {/* Recommend Checkbox */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      name="recommend"
      checked={formData.recommend}
      onChange={() =>
        setFormData({ ...formData, recommend: !formData.recommend })
      }
    />
    <label className="font-medium">Recommend to User</label>
  </div>

  {/* Featured Checkbox */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      name="featured"
      checked={formData.featured}
      onChange={() =>
        setFormData({ ...formData, featured: !formData.featured })
      }
    />
    <label className="font-medium">Featured</label>
  </div>

  {/* New Property Checkbox */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      name="newProperty"
      checked={formData.newProperty}
      onChange={() =>
        setFormData({ ...formData, newProperty: !formData.newProperty })
      }
    />
    <label className="font-medium">New Property</label>
  </div>
</div>

{/* Configurations Section */}
<div className="col-span-full bg-gray-100 p-4 rounded-md mb-4">
    <h2 className="font-semibold mb-2">Add Configurations</h2>
    {formData.configurations.map((config: Configuration, index: number) => (
        <div key={index} className="border-b pb-2 mb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">

                {/* 🟢 BHK Type Dropdown */}
                <div>
                    <label className="block font-medium mb-1">BHK Type</label>
                    <select
                        value={config.bhkType}
                        onChange={(e) => {
                            const newConfigs = [...formData.configurations];
                            newConfigs[index].bhkType = e.target.value;
                            setFormData({ ...formData, configurations: newConfigs });
                        }}
                        className="input-class w-full"
                    >
                        <option value="">Select BHK</option>
                        {[1, 2, 3, 4, 5].map((bhk) => (
                            <option key={bhk} value={`${bhk} BHK`}>
                                {bhk} BHK
                            </option>
                        ))}
                    </select>
                </div>

                {/* 🟢 Carpet Area with Unit */}
                <div>
                    <label className="block font-medium mb-1">Carpet Area</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            step="0.01"
                            value={config.carpetArea || ""}
                            onChange={(e) => {
                                const newConfigs = [...formData.configurations];
                                newConfigs[index].carpetArea = e.target.value;
                                setFormData({ ...formData, configurations: newConfigs });
                            }}
                            className="input-class w-full"
                            placeholder="E.g., 338"
                        />
                        <select
                            value={config.carpetAreaUnit || "sq.ft"}
                            onChange={(e) => {
                                const newConfigs = [...formData.configurations];
                                newConfigs[index].carpetAreaUnit = e.target.value;
                                setFormData({ ...formData, configurations: newConfigs });
                            }}
                            className="input-class"
                        >
                            <option value="sq.ft">sq.ft</option>
                            <option value="sq.m">sq.m</option>
                            <option value="acre">acre</option>
                            <option value="hectare">hectare</option>
                        </select>
                    </div>
                </div>

                {/* 🟢 Built-up Area with Unit */}
                <div>
                    <label className="block font-medium mb-1">Built-up Area</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            step="0.01"
                            value={config.builtupArea || ""}
                            onChange={(e) => {
                                const newConfigs = [...formData.configurations];
                                newConfigs[index].builtupArea = e.target.value;
                                setFormData({ ...formData, configurations: newConfigs });
                            }}
                            className="input-class w-full"
                            placeholder="E.g., 500"
                        />
                        <select
                            value={config.builtupAreaUnit || "sq.ft"}
                            onChange={(e) => {
                                const newConfigs = [...formData.configurations];
                                newConfigs[index].builtupAreaUnit = e.target.value;
                                setFormData({ ...formData, configurations: newConfigs });
                            }}
                            className="input-class"
                        >
                            <option value="sq.ft">sq.ft</option>
                            <option value="sq.m">sq.m</option>
                            <option value="acre">acre</option>
                            <option value="hectare">hectare</option>
                        </select>
                    </div>
                </div>

                {/* 🟢 Price Input */}
                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={config.price || ""}
                        onChange={(e) => {
                            const newConfigs = [...formData.configurations];
                            newConfigs[index].price = e.target.value;
                            setFormData({ ...formData, configurations: newConfigs });
                        }}
                        className="input-class w-full"
                        placeholder="E.g., 2600000"
                    />
                </div>
            </div>
            <button
                type="button"
                className="text-red-500 text-sm"
                onClick={() => {
                    const newConfigs = formData.configurations.filter((_, i) => i !== index);
                    setFormData({ ...formData, configurations: newConfigs });
                }}
            >
                Remove
            </button>
        </div>
    ))}

    <button
        type="button"
        className="btn-class w-full flex justify-center"
        onClick={() => {
            setFormData({
                ...formData,
                configurations: [
                    ...formData.configurations,
                    { bhkType: '', carpetArea: '', carpetAreaUnit: 'sq.ft', builtupArea: '', builtupAreaUnit: 'sq.ft', price: '' },
                ],
            });
        }}
    >
        + Add Configuration
    </button>
</div>


      {/* Submit Button */}
      <button type="submit" className="btn-class w-full flex justify-center" disabled={loading}>
        {loading ? <div className="w-6 h-6 loader-common-styles" /> : "Add Property"}
      </button>
    </form>
  ) : (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-home">Access Denied..!</h1>
  )}
</section>


  );
};

export default AddProperty;
