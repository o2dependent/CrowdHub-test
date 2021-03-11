import { useEffect, useState } from 'react';
import { I_ContentItem } from '../pages/index';

export default function useServerContent(
	serverContent: I_ContentItem[]
): [tags: string[], dateRange: { start: string; end: string } | undefined] {
	// --- state ---
	const [tags, setTags] = useState<string[]>([]); // store tags from content
	const [dateRange, setDateRange] = useState<
		{ start: string; end: string } | undefined
	>(undefined); // date range
	// --- use effect ---
	// --- data setting ---
	useEffect(() => {
		// on component mount
		// * get tags *
		let newTagsSet = new Set<string>(); // Set for eliminating duplicates
		serverContent.forEach((
			i: I_ContentItem // iterate over content and get tags
		) => i?.tags?.forEach((tag) => newTagsSet.add(tag?.tag_name)));
		setTags(Array.from(newTagsSet)); // set tags to be an Array from tags Set
		// * get date range *
		const dates = serverContent // Array of all dates from content
			.map((item: I_ContentItem) => {
				return {
					// find start and end dates | create date object from strings
					start: new Date(item.content_date),
					end: new Date(item.content_date_end),
				};
			})
			.sort(
				// sort dates from newest to oldest
				(a: { start: any; end: any }, b: { start: any; end: any }) =>
					b.start - a.start
			);
		const oldestDate = dates[dates.length - 1].start; // store oldest date
		const newestDate = dates[0].end; // store newest date
		setDateRange({
			// create date range string from dates
			start: `${oldestDate.getMonth() + 1}/${oldestDate.getFullYear()}`,
			end: `${newestDate.getMonth() + 1}/${newestDate.getFullYear()}`,
		});
	}, [serverContent]);

	return [tags, dateRange];
}
