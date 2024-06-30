import {
  LanguageBundle,
  LanguageBundlesList,
} from "../utils/constants/languages_list";

export const LanguageDropDown = ({
  onSelectLanguage,
}: {
  onSelectLanguage: (selectedLanguage: LanguageBundle) => void;
}) => {
  const languageChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSelectLanguage(
      LanguageBundlesList.find((o) => o.code == event.target.value) ??
        LanguageBundlesList[0]
    );
  };

  return (
    <select
      className="bg-gray-700 w-2 lg:w-full px-2 py-1 text-white rounded"
      onChange={languageChangeHandler}
    >
      {LanguageBundlesList.map((val, index) => {
        return (
          <option key={index} value={val.code}>
            {val.language}
          </option>
        );
      })}
    </select>
  );
};
