// environment.ts
export const environment = {
	production: false,
	auth: {
		clientID: '1WN7NesQatseJNo0uVgEpOLnx1gSExJ4',
		domain: 'wikid.auth0.com',
		audience: 'http://localhost:3001',
		redirect: 'http://localhost:4200/callback',
		scope: 'openid profile email'
	}
};
