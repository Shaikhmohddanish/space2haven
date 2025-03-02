import { CityNStateProps } from "@/types"

const CityNState = ({ stateValue, cityValue, handleChange, locations }: CityNStateProps) => {
    return (
        <>
            <div>
                <label className="block font-medium mb-1">City</label>
                <select
                    name="city"
                    value={cityValue}
                    onChange={handleChange}
                    required
                    className="input-class w-full"
                >
                    <option value="" disabled>
                        Select City
                    </option>
                    {locations.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {/* State */}
            <div>
                <label className="block font-medium mb-1">State</label>
                <input
                    type="text"
                    name="state"
                    value={stateValue}
                    readOnly
                    className="input-class w-full bg-gray-100"
                />
            </div>
        </>
    )
}
export default CityNState