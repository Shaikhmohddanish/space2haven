"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { servicesList } from "@/constants";

const DropDownList = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"buyProperty" | "interiorDesign" | "">("");

  const handleSelectChange = (value: "buyProperty" | "interiorDesign") => {
    setSelectedOption(value);

    if (value === "buyProperty") {
      router.push("/properties");
    } else if (value === "interiorDesign") {
      router.push("/interior");
    }
  };

  return (
    <Select onValueChange={handleSelectChange} value={selectedOption}>
      <SelectTrigger className="text-sand-soft w-[180px] border-grey-1 glassmorphism2">
        <SelectValue placeholder="Select Service" />
      </SelectTrigger>
      <SelectContent className="glassmorphism">
        {
          servicesList.map(({title, value}) => 
            <SelectItem value={value} key={value}>{title}</SelectItem>
          )
        }
      </SelectContent>
    </Select>
  );
};

export default DropDownList;
