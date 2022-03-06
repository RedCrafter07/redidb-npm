import redidb from './index';

const db = new redidb('http://localhost:12018');

(async () => {
	await db.auth('user', 'password');
	console.log('AUTHORIZED!');
	const r1 = await db.createDatabase('testDB');
	console.log(r1);
	const q = await db.query('testDB', {});
	console.log(q);

	await db.delete('testDB', { msg: 'Test!' });

	const q2 = await db.query('testDB', {});
	console.log(q2);
})();
