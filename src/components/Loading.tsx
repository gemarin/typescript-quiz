import { Dot, LoadingWrapper } from './Loading.styles';

export default function Loading() {
	return (
		<LoadingWrapper>
			<div>Loading </div>
			<Dot delay='0s' />
			<Dot delay='0.1s' />
			<Dot delay='0.2s' />
		</LoadingWrapper>
	);
}
