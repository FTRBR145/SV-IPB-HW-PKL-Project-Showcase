import test, { afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { register } from 'tsx/esm/api';
import { registerHooks } from 'node:module';
registerHooks({ load(url, context, next) { return url.endsWith('.css') ? { format: 'module', source: 'export default {};', shortCircuit: true } : next(url, context); } });

register({ tsconfig: './jsconfig.json' });
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost', pretendToBeVisual: true
});
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'ShadowRoot', 'MutationObserver', 'HTMLInputElement', 'HTMLButtonElement', 'Option', 'location', 'Event', 'CustomEvent', 'DocumentFragment', 'HTMLTableElement', 'HTMLSelectElement', 'HTMLTableRowElement', 'HTMLTableCellElement', 'DOMParser', 'Text', 'Document', 'EventTarget']) {
  Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
}
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
// Match browsers that consume focus({ preventScroll }); Base UI detects support
// with an options getter when restoring focus after an outside press.
const nativeFocus = dom.window.HTMLElement.prototype.focus;
dom.window.HTMLElement.prototype.focus = function (options) {
  void options?.preventScroll;
  nativeFocus.call(this, options);
};
// jsdom has no layout; let the primitive's tabbable checks see mounted elements.
dom.window.HTMLElement.prototype.getClientRects = function () {
  return this.isConnected && !this.hidden && getComputedStyle(this).display !== 'none'
    ? [{ width: 100, height: 40, top: 0, left: 0, right: 100, bottom: 40 }] : [];
};


const { default: React, useState } = await import('react');
const { render, screen, within, waitFor, cleanup, act } = await import('@testing-library/react');
const { default: userEvent } = await import('@testing-library/user-event');
// The styling CommonJS entry expects the core on window; Vite uses its ESM entry.
window.DataTable = (await import('datatables.net')).default;
const { ModeratorsPanel, TaxonomyPanel } = await import('../src/components/admin/ManagementPanels.jsx');
const h=React.createElement;
afterEach(() => { cleanup(); mock.restoreAll(); });

test('moderator modal preserves failed input, updates list on success and restores focus', async () => {
  const user=userEvent.setup();
  let attempt=0;
  function Harness() {
    const [moderators,setModerators]=useState([]);
    return h(ModeratorsPanel,{moderators,onToggle:()=>{},onDelete:()=>{},onAdd:async data=>{
      if(++attempt===1) return false;
      setModerators([{...data,id:1,status:'active'}]); return true;
    }});
  }
  render(h(Harness));
  assert.equal(screen.queryByRole('dialog'),null);
  const opener=screen.getByRole('button',{name:'Tambah Moderator'});
  await user.click(opener);
  const dialog=await screen.findByRole('dialog',{name:'Tambah moderator'});
  await user.type(within(dialog).getByLabelText('Nama lengkap *'),'Moderator Baru');
  await user.type(within(dialog).getByLabelText('Email *'),'baru@example.test');
  await user.click(within(dialog).getByRole('button',{name:'Tambah Moderator'}));
  assert.match((await screen.findByRole('alert')).textContent,/belum ditambahkan/);
  assert.equal(within(dialog).getByLabelText('Nama lengkap *').value,'Moderator Baru');
  await user.click(within(dialog).getByRole('button',{name:'Tambah Moderator'}));
  await waitFor(()=>assert.equal(screen.queryByRole('dialog'),null));
  assert.ok(screen.getByText('Moderator Baru'));
  await waitFor(()=>assert.equal(document.activeElement,opener));
  await user.type(screen.getByRole('searchbox'),'tidak ada');
  assert.equal(screen.queryByText('Moderator Baru'),null);
  await user.clear(screen.getByRole('searchbox'));
  assert.ok(screen.getByText('Moderator Baru'));
  await user.selectOptions(screen.getByLabelText('Jumlah baris per halaman'),'25');
  assert.equal(screen.getByLabelText('Jumlah baris per halaman').value,'25');
});

test('course modal retains rejected input, blocks dismissal during save, closes after success', async () => {
  const user=userEvent.setup(); let resolveSave; let attempts=0;
  const onAdd=async()=> { if(++attempts===1) throw new Error('Nama sudah tersedia.'); return new Promise(resolve=>{resolveSave=resolve;}); };
  render(h(TaxonomyPanel,{title:'Mata Kuliah',description:'Daftar mata kuliah',items:[],getCount:()=>0,onAdd,onDelete:()=>{}}));
  const opener=screen.getByRole('button',{name:'Tambah Mata Kuliah'});
  await user.click(opener);
  const dialog=await screen.findByRole('dialog',{name:'Tambah mata kuliah'});
  await user.type(within(dialog).getByLabelText('Nama Mata Kuliah *'),'MATA KULIAH BARU');
  await user.click(within(dialog).getByRole('button',{name:'Tambah Mata Kuliah'}));
  assert.equal((await screen.findByRole('alert')).textContent,'Nama sudah tersedia.');
  assert.equal(within(dialog).getByRole('textbox').value,'MATA KULIAH BARU');
  await user.click(within(dialog).getByRole('button',{name:'Tambah Mata Kuliah'}));
  assert.equal(within(dialog).getByRole('button',{name:'Tutup form mata kuliah'}).disabled,true);
  await user.keyboard('{Escape}');
  assert.ok(screen.getByRole('dialog'));
  await act(async()=>resolveSave(true));
  await waitFor(()=>assert.equal(screen.queryByRole('dialog'),null));
  await waitFor(()=>assert.equal(document.activeElement,opener));
  await user.click(opener);
  assert.equal(within(await screen.findByRole('dialog')).getByRole('textbox').value,'');
  await user.keyboard('{Escape}');
  await waitFor(()=>assert.equal(screen.queryByRole('dialog'),null));
});
