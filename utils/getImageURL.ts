export default function getImageURL(imageName: string): string {
	const baseURL = 'https://crowdhubharding.s3-us-west-2.amazonaws.com/';
	return baseURL + imageName;
}
