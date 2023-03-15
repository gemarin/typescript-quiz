import { stringify } from 'querystring';
import styled, { keyframes } from 'styled-components';
import { isAnyArrayBuffer } from 'util/types';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
`;

export const Dot = styled.div<{ delay: string }>`
	background-color: white;
	border-radius: 50%;
	width: 5px;
	height: 5px;
	margin: 0 5px;
	/* Animation */
	animation: ${BounceAnimation} 0.5s linear infinite;
	animation-delay: ${(props) => props.delay};
`;
