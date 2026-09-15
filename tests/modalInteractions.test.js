import test, { afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { register } from 'tsx/esm/api';

register({ tsconfig: './jsconfig.json' });
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost', pretendToBeVisual: true
});
for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'ShadowRoot', 'MutationObserver', 'HTMLInputElement', 'HTMLButtonElement']) {
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
const { render, renderHook, screen, within, waitFor, cleanup, act } = await import('@testing-library/react');
const { default: userEvent } = await import('@testing-library/user-event');
const { default: ModalShell } = await import('../src/components/common/ModalShell.jsx');
const { DialogClose } = await import('../src/components/ui/dialog.jsx');
const { default: AdminSidebar } = await import('../src/components/admin/AdminSidebar.jsx');
const { default: StudentSidebar } = await import('../src/components/student/StudentSidebar.jsx');
const { default: ProjectDetailModal } = await import('../src/components/modals/ProjectDetailModal.jsx');
const { default: UploadModal } = await import('../src/components/modals/UploadModal.jsx');
const { default: EditProjectModal } = await import('../src/components/admin/EditProjectModal.jsx');
const { default: AppContext } = await import('../src/context/AppContextStore.js');
const { default: useProjectDetail } = await import('../src/hooks/useProjectDetail.js');
const h = React.createElement;

afterEach(async () => {
  cleanup();
  mock.restoreAll();
  await act(async () => {});
  document.body.style.cssText = '';
  document.documentElement.style.cssText = '';
});

function Harness({ conditional = false, onClose = () => {}, empty = false }) {
  const [open, setOpen] = useState(false);
  const modal = h(ModalShell, {
    isOpen: open, ariaLabel: 'Dialog uji', panelId: 'test-panel',
    onClose: () => { onClose(); setOpen(false); }
  }, empty ? h('p', null, 'Isi dialog') : [
    h(DialogClose, { key: 'close', 'aria-label': 'Tutup' }, 'Tutup'),
    h('input', { key: 'input', 'aria-label': 'Judul' }),
    h('button', { key: 'last' }, 'Terakhir')
  ]);
  return h(React.Fragment, null,
    h('button', { onClick: () => setOpen(true) }, 'Buka'),
    (!conditional || open) && modal
  );
}

for (const conditional of [false, true]) {
  for (const method of ['Escape', 'close', 'backdrop', 'viewport']) {
    test(`dialog ${conditional ? 'unmounted' : 'controlled'}: ${method} closes once and restores focus`, async () => {
      const user = userEvent.setup();
      let closes = 0;
      document.body.style.overflow = 'auto';
      const view = render(h(Harness, { conditional, onClose: () => closes++ }));
      assert.equal(screen.queryByRole('dialog'), null);
      const opener = screen.getByRole('button', { name: 'Buka' });
      await user.click(opener);
      const dialog = await screen.findByRole('dialog', { name: 'Dialog uji' });
      assert.equal(dialog.id, 'test-panel');
      assert.equal(dialog.getAttribute('aria-modal'), 'true');
      assert.ok(dialog.closest('[data-slot="dialog-portal"]'), 'content uses the primitive portal');
      assert.ok(view.container.contains(dialog), 'portal retains page-scoped styling');
      await waitFor(() => assert.ok(document.activeElement === within(dialog).getByRole('button', { name: 'Tutup' }), 'focus close button'));
      assert.ok(/hidden/.test(document.body.style.overflowY || document.documentElement.style.overflowY));
      await user.click(within(dialog).getByRole('textbox'));
      assert.equal(closes, 0, 'inside interaction must not dismiss');
      if (method === 'Escape') await user.keyboard('{Escape}');
      else if (method === 'close') await user.click(within(dialog).getByRole('button', { name: 'Tutup' }));
      else await user.click(document.querySelector(`[data-slot="dialog-${method === 'backdrop' ? 'overlay' : 'viewport'}"]`));
      await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
      await waitFor(() => assert.ok(document.activeElement === opener, 'restore opener focus'));
      assert.equal(closes, 1);
      assert.equal(document.body.style.overflow, 'auto');
    });
  }
}

test('Tab and Shift+Tab stay inside; reopening restores initial focus', async () => {
  const user = userEvent.setup();
  render(h(Harness));
  const opener = screen.getByRole('button', { name: 'Buka' });
  await user.click(opener);
  const first = screen.getByRole('button', { name: 'Tutup' });
  const last = screen.getByRole('button', { name: 'Terakhir' });
  await waitFor(() => assert.ok(document.activeElement === first, 'focus must return to first button'));
  await user.tab({ shift: true });
  await waitFor(() => assert.ok(document.activeElement === last, `Shift+Tab focused ${document.activeElement.outerHTML}`));
  await user.tab();
  await waitFor(() => assert.ok(document.activeElement === first, 'focus must return to first button'));
  await user.keyboard('{Escape}');
  await user.click(opener);
  await waitFor(() => assert.ok(document.activeElement === screen.getByRole('button', { name: 'Tutup' }), 'focus close button'));
});

test('a dialog without tabbable content focuses the panel and supports Escape', async () => {
  const user = userEvent.setup();
  render(h(Harness, { empty: true }));
  await user.click(screen.getByRole('button', { name: 'Buka' }));
  await waitFor(() => assert.ok(document.activeElement === screen.getByRole('dialog'), 'focus dialog'));
  await user.keyboard('{Escape}');
  await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
});

test('admin mobile menu selection closes the sheet and restores its opener', async () => {
  const user = userEvent.setup();
  let selected;
  render(h(AdminSidebar, { activeMenu: 'dashboard', onSelectMenu: id => { selected = id; } }));
  const opener = screen.getByRole('button', { name: 'Lain' });
  await user.click(opener);
  const dialog = await screen.findByRole('dialog', { name: 'Menu admin lainnya' });
  assert.equal(dialog.id, opener.getAttribute('aria-controls'));
  assert.equal(opener.getAttribute('aria-expanded'), 'true');
  await user.click(within(dialog).getByRole('button', { name: 'Mata Kuliah' }));
  assert.equal(selected, 'courses');
  await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
  await waitFor(() => assert.ok(document.activeElement === opener, 'restore opener focus'));
  assert.equal(opener.getAttribute('aria-expanded'), 'false');
});

test('student mobile course selection closes the sheet and restores its opener', async () => {
  const user = userEvent.setup();
  let selected;
  render(h(StudentSidebar, { courses: ['APLIKASI MOBILE'], onSelectCourse: value => { selected = value; } }));
  const opener = document.querySelector('[aria-controls="student-course-menu"]');
  await user.click(opener);
  const dialog = await screen.findByRole('dialog', { name: 'Pilih mata kuliah' });
  assert.equal(dialog.id, opener.getAttribute('aria-controls'));
  await user.click(within(dialog).getByRole('button', { name: 'Aplikasi Mobile' }));
  assert.equal(selected, 'APLIKASI MOBILE');
  await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
  await waitFor(() => assert.ok(document.activeElement === opener, 'restore opener focus'));
  assert.equal(opener.getAttribute('aria-expanded'), 'false');
});

const project = {
  id: 1, title: 'Projek pengujian', course: 'APLIKASI MOBILE', semester: 3,
  description: 'Deskripsi projek untuk pengujian dialog.', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};
const appValue = {
  courses: [project.course], adminSettings: { academicYear: '2026/2027' },
  currentUser: { role: 'student', name: 'Mahasiswa', nim: 'J0301', semester: 3 }
};

test('project detail removes its video on close and returns focus after conditional unmount', async () => {
  const user = userEvent.setup();
  function DetailHarness() {
    const [open, setOpen] = useState(false);
    return h(React.Fragment, null,
      h('button', { onClick: () => setOpen(true) }, 'Lihat projek'),
      open && h(ProjectDetailModal, { project, onClose: () => setOpen(false) })
    );
  }
  render(h(DetailHarness));
  const opener = screen.getByRole('button', { name: 'Lihat projek' });
  await user.click(opener);
  const dialog = screen.getByRole('dialog', { name: `Detail projek ${project.title}` });
  assert.ok(dialog.querySelector('iframe').src.includes('dQw4w9WgXcQ'));
  await user.click(within(dialog).getByRole('button', { name: 'Tutup Modal' }));
  await waitFor(() => assert.equal(document.querySelector('iframe'), null));
  await waitFor(() => assert.ok(document.activeElement === opener));
});

test('upload cancel closes without saving and reopening resets the form', async () => {
  const user = userEvent.setup();
  let saves = 0;
  function UploadHarness() {
    const [open, setOpen] = useState(false);
    return h(AppContext.Provider, { value: appValue },
      h('button', { onClick: () => setOpen(true) }, 'Unggah'),
      h(UploadModal, { isOpen: open, onClose: () => setOpen(false), onAddProject: () => saves++ })
    );
  }
  render(h(UploadHarness));
  const opener = screen.getByRole('button', { name: 'Unggah' });
  await user.click(opener);
  await user.type(document.getElementById('project-title'), 'Draft projek');
  await user.click(screen.getByRole('button', { name: 'Batal' }));
  await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
  assert.equal(saves, 0);
  await user.click(opener);
  assert.equal(document.getElementById('project-title').value, '');
});

test('edit cancel stays disabled during save while Escape can still dismiss', async () => {
  const user = userEvent.setup();
  let closes = 0;
  let finishSave;
  const updateProject = () => new Promise(resolve => { finishSave = resolve; });
  render(h(AppContext.Provider, { value: { ...appValue, updateProject } },
    h(EditProjectModal, { project, onClose: () => closes++ })
  ));
  await user.click(screen.getByRole('button', { name: 'Simpan Perubahan' }));
  const cancel = screen.getByRole('button', { name: 'Batal' });
  assert.equal(cancel.disabled, true);
  await user.click(cancel);
  assert.equal(closes, 0);
  await user.keyboard('{Escape}');
  assert.equal(closes, 1);
  await act(async () => finishSave(false));
});

test('detail requests are independent of catalog and stale responses cannot reopen a closed modal', async () => {
  const pending=[];
  mock.method(globalThis,'fetch',(url,options)=>new Promise(resolve=>pending.push({url,options,resolve})));
  const showToast=mock.fn();
  const {result,rerender}=renderHook(({id})=>useProjectDetail(id,showToast),{initialProps:{id:'205'}});
  assert.equal(pending[0].url,'/api/projects/205');
  rerender({id:'206'});
  assert.equal(pending[0].options.signal.aborted,true);
  await act(async()=>pending[1].resolve(new Response(JSON.stringify({data:{id:206,title:'Terbaru'}}))));
  assert.equal(result.current.id,206);
  await act(async()=>pending[0].resolve(new Response(JSON.stringify({data:{id:205,title:'Lama'}}))));
  assert.equal(result.current.id,206);
  rerender({id:null});
  assert.equal(result.current,null);
  assert.equal(showToast.mock.callCount(),0);
});

test('missing project detail reports an Indonesian error without showing stale content', async () => {
  mock.method(globalThis,'fetch',async()=>new Response(JSON.stringify({error:{message:'Not found'}}),{status:404}));
  const showToast=mock.fn();
  const {result}=renderHook(()=>useProjectDetail('9999',showToast));
  await waitFor(()=>assert.equal(showToast.mock.callCount(),1));
  assert.equal(result.current,null);
  assert.equal(showToast.mock.calls[0].arguments[0],'Projek tidak ditemukan atau sudah dihapus.');
});


const { default: Navbar } = await import('../src/components/common/Navbar.jsx');
const navCallbacks = { onOpenUpload:()=>{}, onOpenLogin:()=>{}, onLogout:()=>{}, onNavigateToAdmin:()=>{}, onNavigateToStudent:()=>{}, onBackToLanding:()=>{} };
test('guest navigation has public links and login but no private shortcuts, including mobile', async () => {
  const user=userEvent.setup();
  render(h(Navbar,{...navCallbacks}));
  assert.ok(screen.getByRole('button',{name:'Login'}));
  assert.equal(screen.queryByRole('button',{name:/Upload|Unggah|Admin|Mahasiswa/}),null);
  await user.click(screen.getByRole('button',{name:'Buka menu navigasi'}));
  assert.equal(screen.queryByRole('button',{name:/Upload|Unggah|Admin|Mahasiswa/}),null);
  assert.ok(screen.getByRole('button',{name:'Home'}));
});
for (const role of ['admin','student']) {
  test(`navigation for ${role} consolidates role shortcuts in account menu`, async () => {
    const user=userEvent.setup(); const navigate=mock.fn();
    render(h(Navbar,{...navCallbacks,isLoggedIn:true,currentUser:{name:'Akun Uji',role},onNavigateToAdmin:navigate,onNavigateToStudent:navigate}));
    assert.equal(screen.queryByRole('button',{name:/Dashboard Admin|Portal Mahasiswa|Unggah Projek/}),null);
    const account=screen.getByRole('button',{name:'Menu akun Akun Uji'});
    await user.click(account);
    const menu=screen.getByRole('menu',{name:'Opsi Akun'});
    if(role==='admin') {
      assert.ok(within(menu).getByRole('menuitem',{name:'Dashboard Admin'}));
      assert.ok(within(menu).getByRole('menuitem',{name:'Pratinjau Portal Mahasiswa'}));
      assert.equal(within(menu).queryByRole('menuitem',{name:'Unggah Projek'}),null);
    } else {
      assert.ok(within(menu).getByRole('menuitem',{name:'Portal Mahasiswa'}));
      assert.ok(within(menu).getByRole('menuitem',{name:'Unggah Projek'}));
      assert.equal(within(menu).queryByRole('menuitem',{name:/Admin|Pratinjau/}),null);
    }
    await user.keyboard('{Escape}');
    assert.equal(screen.queryByRole('menu',{name:'Opsi Akun'}),null);
    assert.equal(document.activeElement,account);
    await user.click(account);
    await user.click(screen.getByRole('menuitem',{name:role==='admin'?'Dashboard Admin':'Portal Mahasiswa'}));
    assert.equal(navigate.mock.callCount(),1);
    assert.equal(screen.queryByRole('menu',{name:'Opsi Akun'}),null);
  });
}
test('admin header avoids repeating active dashboard and exposes public return in account menu', async()=>{
  const user=userEvent.setup();
  render(h(Navbar,{...navCallbacks,currentPage:'admin',isLoggedIn:true,currentUser:{name:'Admin',role:'admin'}}));
  assert.equal(screen.queryByRole('button',{name:'Buka menu navigasi'}),null);
  assert.equal(screen.queryByText('Dashboard Admin'),null);
  await user.click(screen.getByRole('button',{name:'Menu akun Admin'}));
  assert.ok(screen.getByRole('menuitem',{name:'Beranda Publik'}));
});
