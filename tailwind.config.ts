import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{html,js,ts,jsx,tsx,mdx}',
		'./components/**/*.{html,js,ts,jsx,tsx,mdx}',
		'./app/**/*.{html,js,ts,jsx,tsx,mdx}',
		'./index.html',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		colors: {
			primary: '#9aa61e',
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light',
			{
				mytheme: {
					primary: '#9AA61E',
					secondary: '#7A7776',
					accent: '#fff',
					neutral: '#fff',
					'base-100': '#fff',
					info: '#0000ff',
					success: '#00ff00',
					warning: '#00ff00',
					error: '#ff0000',
				},
			},
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'mytheme', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
export default config;
