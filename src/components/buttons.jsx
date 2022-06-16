import { Loading } from "./loading";

export function ButtonPrimary({
  onClick,
  isLoading,
  label,
  type = "submit",
  theme = "primary",
  ...props
}) {
  const themeClass =
    theme === "primary"
      ? "bg-blue-500 hover:bg-blue-700"
      : "bg-red-500 hover:bg-red-700";

  return (
    <button
      className={`${themeClass} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {!isLoading ? label : <Loading />}
    </button>
  );
}

export function ButtonOutlined({
  onClick,
  isLoading,
  label,
  type = "submit",
  theme = "success",
  ...props
}) {
  const themeClass =
    theme === "success"
      ? "hover:border-blue-700 text-blue-500 hover:text-blue-700 py-2 px-4 border-blue-500 "
      : "hover:border-red-700 text-red-500 hover:text-red-700 py-2 px-4 border-red-500 ";

  return (
    <button
      className={`${themeClass} bg-transparent  font-semibold  rounded border disabled:opacity-50 disabled:cursor-not-allowed`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {!isLoading ? label : <Loading />}
    </button>
  );
}
