import React, { CSSProperties } from 'react';
import Link from '../Link';

type LinkListProps = {
	title: string;
	list: { label: string; href: string }[];
	style?: CSSProperties;
};

const LinkList = ({ list, title, style }: LinkListProps) => {
	return (
		<div
			className='link-list-container'
			style={style}>
			<h2 className='link-list-title'>{title}</h2>
			<ul className='link-list-list'>
				{list
					? list.map((item, i) => (
							<li key={i}>
								<Link
									href={item.href}
									text={item.label}
								/>
							</li>
					  ))
					: null}
			</ul>
		</div>
	);
};

export default LinkList;
