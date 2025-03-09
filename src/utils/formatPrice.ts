// ✅ Define the function
export const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price.replace(/,/g, ''));
    if (isNaN(priceNumber)) return "N/A";
  
    if (priceNumber >= 1_00_00_000) {
      return `${(priceNumber / 1_00_00_000).toFixed(2)} Cr`;
    } else if (priceNumber >= 1_00_000) {
      return `${(priceNumber / 1_00_000).toFixed(2)} Lakh`;
    } else {
      return `${priceNumber.toLocaleString()} Rupees`;
    }
};
  

  