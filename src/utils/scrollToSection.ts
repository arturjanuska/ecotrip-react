const scrollToSection = ({
	scrollToSection,
	block,
}: {
	scrollToSection: string;
	block?: ScrollLogicalPosition;
}) => {
	const element = document.getElementById(scrollToSection);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block,
		});
	}
};

export default scrollToSection;
