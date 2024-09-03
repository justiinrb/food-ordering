export function InputField({ label, value, onChange }) {
    return (
        <div className="mb-4">
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
            />
        </div>
    );
}