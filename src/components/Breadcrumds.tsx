import { useTranslation } from 'react-i18next';
import '../styles/breadcrumds.css';

const Breadcrumds = () => {
	const { t } = useTranslation();

	return <h1 className='breadcrumds'>{t('pageBreadcrumbs')}</h1>;
};

export default Breadcrumds;
