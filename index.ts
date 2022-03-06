import { io, Socket } from 'socket.io-client';
import chalk from 'chalk';

export default class {
	socket: Socket;
	constructor(host: string) {
		console.log('CONNECTING...');
		this.socket = io(host, { transports: [ 'websocket' ] }).connect();
		console.log('CONNECTED!');
		return this;
	}

	async auth(user: string, password: string) {
		this.socket.emit('auth', { user, password });
		this.socket.once('auth', m => {
			console.log(chalk.yellowBright(m));
		});
	}

	async createDatabase(name: string) {
		this.socket.emit('createDatabase', { database: name });
		return new Promise(resolve => {
			this.socket.once('createDatabase', (m: Array<unknown> | string) => {
				resolve(m);
			});
		});
	}

	async query(database: string, query: Record<string, unknown>) {
		this.socket.emit('query', { database, query });
		return new Promise(resolve => {
			this.socket.once('query', (m: Array<unknown> | string) => {
				resolve(m);
			});
		});
	}

	async add(database: string, data: Record<string, unknown>) {
		this.socket.emit('add', { database, data });
		return new Promise<void>(resolve => {
			this.socket.once('add', () => {
				resolve();
			});
		});
	}

	async edit(
		database: string,
		query: Record<string, unknown>,
		data: Record<string, unknown>
	) {
		this.socket.emit('edit', { database, query, data });
		return new Promise<void>(resolve => {
			this.socket.once('edit', () => {
				resolve();
			});
		});
	}

	async delete(database: string, query: Record<string, unknown>) {
		this.socket.emit('delete', { database, query });
		return new Promise<void>(resolve => {
			this.socket.once('delete', () => {
				resolve();
			});
		});
	}
}
