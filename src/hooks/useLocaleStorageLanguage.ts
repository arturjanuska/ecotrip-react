import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLocaleStorageLanguage = () => {
  const { i18n } = useTranslation();

  const localStorageLang = localStorage.getItem("lang") as "lt" | "en";

	useEffect(() => {
		if (localStorageLang) {
			i18n.changeLanguage(localStorageLang);
		}
  }, []);
};

export default useLocaleStorageLanguage;
