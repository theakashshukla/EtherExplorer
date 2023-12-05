const PriceDisplay = ({
  label,
  value,
  loading,
  decimals = 0,
  roundValue = false,
  showDollarSign = false,
  lastGwei = false,
}: {
  label: string;
  value: string | number | null;
  loading: boolean;
  decimals?: number;
  roundValue?: boolean;
  showDollarSign?: boolean;
  lastGwei?: boolean;
}) => {
  const formattedValue =
    loading || value === null
      ? "N/A"
      : roundValue
      ? Math.round(Number(value)).toString()
      : Number(value).toFixed(decimals);

  const displayValue = lastGwei
    ? `${formattedValue} Gwei`
    : `${showDollarSign ? "$" : ""}${formattedValue}`;

  return (
    <div className="text-sm font-medium text-gray-500 mr-2">
      {loading ? (
        <p>Loading {label}...</p>
      ) : (
        <p>
          {label}: <span className="text-blue-500">{displayValue}</span>
        </p>
      )}
    </div>
  );
};
export { PriceDisplay };
