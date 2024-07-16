import SecondaryButton from '../SecondaryButton';

type Props = {};

const News = (props: Props) => {
	return (
		<div className='news-container'>
			<div className='news-headings'>
				<h3>Naujienlaiškis</h3>
				<h4>Mūsų naujienos ir specialūs pasiūlymas prenumeratoriams</h4>
			</div>
			<div className='news-cta'>
				<input
					type='text'
					placeholder='El. paštas'
				/>
				<SecondaryButton>Prenumeruoti</SecondaryButton>
			</div>
		</div>
	);
};

export default News;
