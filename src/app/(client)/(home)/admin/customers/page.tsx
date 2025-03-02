"use client";

import { Loader } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CustomerDataTypes } from "@/types";
import { useEffect, useState } from "react";

const Customers = () => {
  const { toast } = useToast()
  const router = useRouter();
  const [adminDetails, setAdminDetails] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<CustomerDataTypes[]>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")



  useEffect(() => {
    setAdminDetails(localStorage.getItem("adminDetails"));
    if (!adminDetails) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [router, adminDetails]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      try {
        // Make the request with the token as Authorization header
        const response = await axios.get<CustomerDataTypes[]>("/api/admin/customers");

        setCustomerData(response.data);
      } catch (error) {
        setLoading(true)
        console.error("Error fetching data:", error);
        setError("Failed to fetch customer data.")
        toast({
          description: "Failed to fetch customer data."
        });
      } finally {
        setLoading(false)
      }
    };

    fetchCustomers();
  }, []);

  if (!adminDetails) {
    return (<section className="min-h-screen py-24 px-4 bg-sand-soft flex-center flex-col bg-[url(/images/pattern.png)]">
      <h1 className="text-home header-class table-style text-center">
        Access Denied..!
      </h1>
    </section>)
  }

  if (error) {
    return (
      <section className="min-h-screen py-24 px-4 bg-sand-soft flex-center flex-col bg-[url(/images/pattern.png)]">
        <h1 className="text-home header-class table-style text-center">
          {error}
        </h1>
      </section>
    );
  }

  if (!customerData || customerData.length === 0) {
    return (
      <section className="min-h-screen py-24 px-4 bg-sand-soft flex-center flex-col bg-[url(/images/pattern.png)]">
        <h1 className="text-home header-class table-style text-center">
          No customers found!
        </h1>
      </section>
    );
  }


  return (
    <section className="min-h-screen py-24 px-4 bg-sand-soft flex items-center flex-col bg-[url(/images/pattern.png)]">
      <div className="table-style">
        {loading ? <Loader /> :
          <Table>
            <TableCaption>List of Customers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead className="text-right">Contacted on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer, index) => (
                <TableRow key={customer._id}>
                  <TableCell className="font-medium text-right">{index + 1}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.serviceType}</TableCell>
                  <TableCell className="text-right">
                    {customer.createdAt ? (
                      new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    ) : "N/A"
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
    </section>
  );
};

export default Customers;
