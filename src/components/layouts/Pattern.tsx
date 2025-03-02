import Image from "next/image";

const Pattern = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
        src={"/images/pattern.png"}
        alt="pattern"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Pattern;
