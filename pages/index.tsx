// useless data
/*
campaign
content_id (used for keys?)
content_author
content_lat
content_long
content_icon (mostly the same as content_image with some data missing)
children
content_featured
meta_data
user_commented
*/

// useful data
/*
actions (allows for event specific actions)
content_date_literal_range (some may need string to be trimmed)
content_date (if year is not defined get year from content_date {new Date(content_date).getFullYear()})
content_image
content_slug (slug === "" ? content_name as slug : slug)
content_name
content_social_description
tags (sorting)
author (use for event page view)
attendees (use for event page view)
*/
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import getImageURL from '../utils/getImageURL';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
	// --- hooks ---
	const [content, setContent] = useState([]); // content array
	const [dateRange, setDateRange] = useState<
		{ start: string; end: string } | undefined
	>(undefined);
	const [filters, setFilters] = useState([]); // array of filters applied
	// --- data fetching ---
	useEffect(() => {
		fetch(
			'http://hardingdevelopment.nexisit.net/harding_api/api_event_search.php?page_num=0&per_page=20&buckets=Volunteering&timezone=25200&app_server_version=3.2&app_version=2&app_build=1&user_id=2&token=70aedda35dca9c192ef551c9f7b570e0&salt=309a9bea4d2695656e83f4fe7b340ee0&app=1&version=3.2'
		)
			.then((res) => res.json())
			.then((d) => {
				console.log(d.content);
				const dates = d.content
					.map((item) => {
						return {
							start: new Date(item.content_date),
							end: new Date(item.content_date_end),
						};
					})
					.sort((a, b) => b.start - a.start);
				const oldestDate = dates[dates.length - 1].start;
				const newestDate = dates[0].end;
				setDateRange({
					start: `${oldestDate.getMonth() + 1}/${oldestDate.getFullYear()}`,
					end: `${newestDate.getMonth() + 1}/${newestDate.getFullYear()}`,
				});
				// ${oldestDate.getDate()} use this if showing the specific day is required
				setContent(d.content);
			});
	}, []);

	return (
		<div>
			<Head>
				<title>Ethan Olsen's Crowd Hub site</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header dateRange={dateRange} />
			<Footer />
			<Main>
				{content.length > 0 &&
					content.map((item: I_ContentItem) => (
						<Card.Body>
							<Card.Header>
								<Card.Title>{item?.content_name}</Card.Title>
								<Card.BoldItalic>
									{item?.tags?.map((tag) => tag?.tag_name)?.join(', ')}
								</Card.BoldItalic>
							</Card.Header>
							<Card.Img src={getImageURL(item?.content_image)} />
							<Card.Description>
								{item?.content_social_description}
							</Card.Description>
						</Card.Body>
					))}
			</Main>
		</div>
	);
}

interface I_ContentItem {
	content_social_description: string;
	content_image: string;
	tags: { tag_name: string }[];
	content_name: string;
}

// --- styled components ---
const Main = styled.main`
	background-color: #c4c4c4;
	padding-top: 0.75rem;
`;

const Card = {
	Body: styled.div`
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		padding: 1rem;
		padding-bottom: 1.625rem;
		margin-bottom: 1rem;
		background-color: white;
		box-shadow: 0px 0px 5px 5px #0000001a;
	`,
	Header: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
	`,
	Title: styled.h1`
		all: unset;
		font-size: 1rem;
		line-height: 1rem;
	`,
	Img: styled.img`
		width: 100%;
		border-radius: 0.25rem;
	`,
	BoldItalic: styled.strong`
		font-size: 0.75rem;
		font-style: italic;
	`,
	Description: styled.p`
		font-size: 0.75rem;
	`,
	Footer: styled.div`
		width: 100%;
	`,
};
