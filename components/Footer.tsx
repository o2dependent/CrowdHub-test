import React from 'react';
import styled from 'styled-components';

export default function Footer() {
	return (
		<Nav>
			<Button>
				<ButtonImg src='NavigationIcon_Home.png' />
				<ButtonText>Home</ButtonText>
			</Button>
			<Button>
				<ButtonImg src='NavigationIcon_Stories.png' />
				<ButtonText>Stories</ButtonText>
			</Button>
			<Button>
				<ButtonImg src='NavigationIcon_Volunteer_Color.png' />
				<ButtonText>Volunteering</ButtonText>
			</Button>
		</Nav>
	);
}

// --- styled components ---
const Nav = styled.nav`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0 1rem;
	position: fixed;
	bottom: 0;
	height: 5rem;
	width: 100%;
	background-color: white;
	box-shadow: 0px 0px 5px 5px #00000020;
`;

const Button = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ButtonImg = styled.img`
	width: 2rem;
	height: 2rem;
`;

const ButtonText = styled.div`
	margin: 0;
	font-size: 0.75rem;
`;
