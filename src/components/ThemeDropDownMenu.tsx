import { ThemeBundlesList } from "../utils/constants/themes_list";

export const ThemeDropDown = ({
  onUpdateTheme,
}: {
  onUpdateTheme: (theme: string) => void;
}) => {
  const themeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTheme(event.target.value);
  };

  return (
    <select
      onChange={themeChangeHandler}
      className="bg-gray-700  w-2 lg:w-full px-2 py-1 text-white rounded"
    >
      {ThemeBundlesList.map((val, index) => {
        return (
          <option key={index} value={val}>
            {val}
          </option>
        );
      })}
    </select>
  );
};
