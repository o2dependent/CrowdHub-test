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
import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import getImageURL from '../utils/getImageURL';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useServerContent from '../hooks/useServerContent';
import useContentFilter from '../hooks/useContentFilter';

export default function Home({
	serverContent,
}: {
	serverContent: I_ContentItem[];
}) {
	// --- variables ---
	const content: I_ContentItem[] = serverContent; // content array
	// --- hooks ---
	const [displayContent, setDisplayContent] = useState<any[]>(serverContent); // content that will be displayed
	// use server content
	const [tags, dateRange] = useServerContent(serverContent);
	// use content filter
	const [filters, setFilters] = useContentFilter(content, setDisplayContent);

	return (
		<div>
			<Head>
				<title>Ethan Olsen's Crowd Hub site</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header
				tags={tags}
				dateRange={dateRange}
				setFilters={setFilters}
				filters={filters}
			/>
			<Footer />
			<Main>
				{displayContent.length > 0 &&
					displayContent.map((item: I_ContentItem) => (
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
							<Card.Footer>
								<Card.BoldItalic>
									{item?.content_date_literal_range}
								</Card.BoldItalic>
								<Card.LearnMore>
									<Card.Icon src='NavigationIcon_Volunteer_Color.png' /> Learn
									More
								</Card.LearnMore>
							</Card.Footer>
						</Card.Body>
					))}
			</Main>
		</div>
	);
}

export interface I_ContentItem {
	content_social_description: string;
	content_image: string;
	tags: { tag_name: string }[];
	content_name: string;
	content_date_literal_range: string;
	content_date: string;
	content_date_end: string;
}

// --- styled components ---
const Main = styled.main`
	background-color: #c4c4c4;
	padding-top: 0.75rem;
	padding-bottom: 4.5rem;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	LearnMore: styled.a`
		color: #f05625;
		font-size: 0.75rem;
		font-weight: 700;
		font-style: italic;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	`,
	Icon: styled.img`
		width: 1rem;
		height: 1rem;
	`,
};

export async function getServerSideProps() {
	let serverContent;
	await fetch(
		'http://hardingdevelopment.nexisit.net/harding_api/api_event_search.php?page_num=0&per_page=20&buckets=Volunteering&timezone=25200&app_server_version=3.2&app_version=2&app_build=1&user_id=2&token=70aedda35dca9c192ef551c9f7b570e0&salt=309a9bea4d2695656e83f4fe7b340ee0&app=1&version=3.2'
	)
		.then((res) => res.json())
		.then((d) => {
			serverContent = d.content.map(
				(item: {
					content_date_literal_range: string;
					content_date: string;
				}) => {
					let split = item?.content_date_literal_range.split(',');
					if (split[1].includes('-')) {
						split[1] = new Date(item?.content_date).getFullYear().toString();
						console.log(split.join(', '));
						const newItem = {
							...item,
							content_date_literal_range: split.join(', '),
						};
						console.log(newItem.content_date_literal_range);
						return newItem;
					} else {
						return item;
					}
				}
			);
		});
	return {
		props: {
			serverContent,
		}, // will be passed to the page component as props
	};
}
