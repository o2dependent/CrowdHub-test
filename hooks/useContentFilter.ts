import React, { useEffect, useState } from 'react';
import { I_ContentItem } from '../pages';

export default function useContentFilter(
	content: I_ContentItem[],
	setDisplayContent: React.Dispatch<React.SetStateAction<any[]>>
): [filters: string, setFilters: React.Dispatch<React.SetStateAction<string>>] {
	// --- state ---
	const [filters, setFilters] = useState(''); // filters applied

	// --- use effect ---
	useEffect(() => {
		// set filters on filter change
		if (filters.length > 0) {
			// check if filter is not an empty string
			const newDisplayContent = content.filter(
				// filter content
				(item: I_ContentItem) => {
					const tag_names = item?.tags?.map((tag) => tag?.tag_name); // extract tag names from item
					return tag_names.includes(filters); // check items tags include filter
				}
			);
			setDisplayContent(newDisplayContent); // set display content to filtered content
		} else {
			// if empty string
			setDisplayContent(content); // set display content to all available content
		}
	}, [filters]);

	return [filters, setFilters];
}
