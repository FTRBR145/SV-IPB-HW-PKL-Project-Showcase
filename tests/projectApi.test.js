import test, { afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { apiRequest } from '../src/services/apiClient.js';
import { loadProjectCatalog, getProjectById } from '../src/services/projectApi.js';

globalThis.window = { setTimeout, clearTimeout };
afterEach(() => mock.restoreAll());
const response = (data, meta, status = 200) => new Response(JSON.stringify({ data, meta }), { status });

test('catalog loads all pages beyond 100, preserving search/statistic inputs', async () => {
  const requests = [];
  mock.method(globalThis, 'fetch', async url => {
    requests.push(url);
    const page = Number(new URL(url, 'http://localhost').searchParams.get('page'));
    const count = page === 3 ? 5 : 100;
    return response(Array.from({ length: count }, (_, index) => ({ id: (page-1)*100+index+1 })), {page,totalPages:3,total:205});
  });
  const projects = await loadProjectCatalog();
  assert.equal(projects.length, 205);
  assert.equal(projects.at(-1).id, 205);
  assert.equal(requests.length, 3);
});

test('empty catalog ends after one request, malformed pagination rejects', async () => {
  const fetch = mock.method(globalThis, 'fetch', async () => response([], {page:1,totalPages:1,total:0}));
  assert.deepEqual(await loadProjectCatalog(), []);
  assert.equal(fetch.mock.callCount(), 1);
  fetch.mock.mockImplementation(async () => response([], {}));
  await assert.rejects(loadProjectCatalog(), {code:'INVALID_PAGINATION'});
});

test('later-page failure never returns a misleading partial catalog', async () => {
  let page = 0;
  mock.method(globalThis, 'fetch', async () => ++page === 1
    ? response([{id:1}], {page:1,totalPages:2}) : response(null,null,503));
  await assert.rejects(loadProjectCatalog(), {status:503});
});

test('detail requests its own endpoint and surfaces 404', async () => {
  const fetch = mock.method(globalThis, 'fetch', async () => response({id:205,title:'Projek lama'}));
  assert.equal((await getProjectById(205)).id, 205);
  assert.equal(fetch.mock.calls[0].arguments[0], '/api/projects/205');
  fetch.mock.mockImplementation(async () => response(null,null,404));
  await assert.rejects(getProjectById(999), {status:404});
});

test('apiRequest retains optional metadata without changing existing consumers', async () => {
  mock.method(globalThis, 'fetch', async () => response([1], {page:1}));
  assert.deepEqual(await apiRequest('/projects'), [1]);
  assert.deepEqual(await apiRequest('/projects', {includeMeta:true}), {data:[1],meta:{page:1}});
});

test('an already-aborted request preserves cancellation instead of reporting a timeout', async () => {
  const controller = new AbortController(); controller.abort();
  mock.method(globalThis, 'fetch', async (_url,{signal}) => { signal.throwIfAborted(); });
  await assert.rejects(loadProjectCatalog({signal:controller.signal}), {name:'AbortError'});
});
