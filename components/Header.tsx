import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Header({
	dateRange,
	setFilters,
	tags,
	filters,
}: {
	dateRange: { start: string; end: string } | undefined;
	setFilters: React.Dispatch<React.SetStateAction<string>>;
	tags: string[];
	filters: string;
}) {
	// --- hooks ---
	// state
	const [isModalOpen, setIsModalOpen] = useState(false);
	// use effect
	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isModalOpen]);

	return (
		<>
			{isModalOpen && (
				<Modal.Container>
					<Modal.Card>
						<Modal.Header>
							<strong>Select a filter</strong>
							<p onClick={() => setIsModalOpen(false)}>X</p>
						</Modal.Header>
						<Modal.Button
							onClick={() => {
								setFilters('');
								setIsModalOpen(false);
							}}
						>
							None
						</Modal.Button>
						{tags.map((tag) => (
							<Modal.Button
								onClick={() => {
									setFilters(tag);
									setIsModalOpen(false);
								}}
							>
								{tag}
							</Modal.Button>
						))}
					</Modal.Card>
				</Modal.Container>
			)}
			<Nav>
				<TopNav>
					<LeftTopNav>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='16'
							viewBox='0 0 24 16'
						>
							<g fill='#656565' fill-rule='evenodd'>
								<rect width='24' height='2' rx='1' />
								<rect width='24' height='2' y='7' rx='1' />
								<rect width='18' height='2' y='14' rx='1' />
							</g>
						</svg>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='40'
							height='40'
							viewBox='0 0 36 36'
						>
							<path d='M22.8,11.4c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0c-0.3-0.3-0.8-0.3-1.2,0l-7.4,7.2c-0.3,0.3-0.3,0.8,0,1.1  c0,0,0,0,0,0l7.4,7.2c0.3,0.3,0.8,0.3,1.2,0c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0L16,18C16,18,22.8,11.4,22.8,11.4z' />
						</svg>
					</LeftTopNav>
					<Title>Find a Volunteering Event</Title>
					<RightTopNav>
						<Circle>
							<p>0</p>
						</Circle>
					</RightTopNav>
				</TopNav>
				<BottomNav>
					<LeftBottomNav>
						<strong>
							{dateRange && dateRange.start + ' - ' + dateRange.end}
						</strong>
						{filters && <Topic>{filters}</Topic>}
					</LeftBottomNav>
					<Svg
						xmlns='http://www.w3.org/2000/svg'
						version='1.1'
						width='32'
						height='32'
						viewBox='0 0 26 26'
						onClick={() => setIsModalOpen(true)}
					>
						<g>
							<path d='M1.75,7.75h6.6803589c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891   S13.9000854,9.0452271,14.2356567,7.75H24.25C24.6640625,7.75,25,7.4140625,25,7s-0.3359375-0.75-0.75-0.75H14.2356567   c-0.3355713-1.2952271-1.5039063-2.2587891-2.9026489-2.2587891S8.7659302,4.9547729,8.4303589,6.25H1.75   C1.3359375,6.25,1,6.5859375,1,7S1.3359375,7.75,1.75,7.75z M11.3330078,5.4912109   c0.8320313,0,1.5087891,0.6767578,1.5087891,1.5087891s-0.6767578,1.5087891-1.5087891,1.5087891S9.8242188,7.8320313,9.8242188,7   S10.5009766,5.4912109,11.3330078,5.4912109z' />
							<path d='M24.25,12.25h-1.6061401c-0.3355713-1.2952271-1.5039063-2.2587891-2.9026489-2.2587891   S17.1741333,10.9547729,16.838562,12.25H1.75C1.3359375,12.25,1,12.5859375,1,13s0.3359375,0.75,0.75,0.75h15.088562   c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891s2.5670776-0.963562,2.9026489-2.2587891H24.25   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,12.25,24.25,12.25z M19.7412109,14.5087891   c-0.8320313,0-1.5087891-0.6767578-1.5087891-1.5087891s0.6767578-1.5087891,1.5087891-1.5087891S21.25,12.1679688,21.25,13   S20.5732422,14.5087891,19.7412109,14.5087891z' />
							<path d='M24.25,18.25H9.7181396c-0.3355103-1.2952271-1.5037842-2.2587891-2.9017334-2.2587891   c-1.3987427,0-2.5670776,0.963562-2.9026489,2.2587891H1.75C1.3359375,18.25,1,18.5859375,1,19s0.3359375,0.75,0.75,0.75h2.1637573   c0.3355713,1.2952271,1.5039063,2.2587891,2.9026489,2.2587891c1.3979492,0,2.5662231-0.963562,2.9017334-2.2587891H24.25   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,18.25,24.25,18.25z M6.8164063,20.5087891   c-0.8320313,0-1.5087891-0.6767578-1.5087891-1.5087891s0.6767578-1.5087891,1.5087891-1.5087891   c0.8310547,0,1.5078125,0.6767578,1.5078125,1.5087891S7.6474609,20.5087891,6.8164063,20.5087891z' />
						</g>
					</Svg>
				</BottomNav>
			</Nav>
		</>
	);
}

// --- styled components ---
const Nav = styled.nav`
	z-index: 30;
	position: sticky;
	top: 0;
	width: 100%;
`;

const TopNav = styled.div`
	height: 3.25rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	background-color: white;
	padding: 0 1rem;
`;

const LeftTopNav = styled.div`
	display: flex;
	align-items: center;
`;

const RightTopNav = styled.div`
	width: 4rem;
`;

const Title = styled.p``;

const BottomNav = styled.div`
	height: 3.25rem;
	background-color: #ececec;
	padding: 0 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LeftBottomNav = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const Topic = styled.i`
	background-color: white;
	color: #545454;
	padding: 2px;
`;

const Circle = styled.p`
	margin-left: auto;
	background-color: #a9a9a9;
	color: white;
	text-align: center;
	vertical-align: center;
	line-height: 0;
	border-radius: 9999px;
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Svg = styled.svg`
	fill: #87949a;
`;

const Modal = {
	Container: styled.div`
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: #00000040;
	`,
	Card: styled.div`
		overflow: hidden;
		border-radius: 0.25rem;
		max-width: 18rem;
		width: 100%;
		height: fit-content;
		background-color: white;
		box-shadow: 0px 0px 5px 5px #00000020;
	`,
	Header: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
	`,
	Button: styled.button`
		width: 100%;
		height: 2rem;
		border: none;
		border-top: 1px solid black;
		background-color: white;
	`,
};
