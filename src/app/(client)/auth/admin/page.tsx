import FormTabs from "@/components/layouts/FormTabs"; // ✅ Import it directly
import Image from "next/image";
import Link from "next/link";


const AuthLayout = () => {

    return (
        <section className="min-h-screen w-full flex-center flex-col">
            <Link href="/">
                <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading='eager' src="/logo.svg"
                    alt="Space2Heaven"
                    width={50}
                    height={50}
                    className="max-sm:size-10 invert"
                />
            </Link>
            <FormTabs />
        </section>
    )
}
export default AuthLayout