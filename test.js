import test from 'ava';
import g from './';

test.serial('categories', async t => {
	t.true((await g('categories')).body.total_count > 0);
	t.true((await g('categories', {query: {count: 30}})).body.categories.length === 30);
	t.true((await g('categories/romance')).body.identifier === 'romance');
});

test.serial('icons', async t => {
	t.true((await g('iconsets/romance/icons')).body.total_count > 0);
	t.true((await g('icons/495310')).body.icon_id === 495310);
	t.true((await g('icons/search', {query: {query: 'app'}})).body.total_count > 0);
	await g('icons/search').then(() => t.fail()).catch(() => t.pass());
});

test.serial('iconsets', async t => {
	t.true((await g('iconsets')).body.total_count > 0);
	t.true((await g('styles/cartoon/iconsets')).body.total_count > 0);
	t.true((await g('categories/animal/iconsets')).body.total_count > 0);
	t.true((await g('users/creativestall/iconsets')).body.total_count > 0);
	t.true((await g('iconsets/28238')).body.icons_count > 0);
});

test.serial('style', async t => {
	t.true((await g('styles')).body.total_count > 0);
	t.true((await g('styles/3d')).body.identifier === '3d');
});

test.serial('users', async t => {
	t.true((await g('users/creativestall')).body.username === 'creativestall');
});

test.serial('invalid', t => {
	return g('invalid').then(() => t.fail()).catch(() => t.pass());
});
