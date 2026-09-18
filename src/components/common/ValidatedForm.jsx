import React, { useId, useRef, useState } from 'react';
import { CircleAlert } from 'lucide-react';

function fieldLabel(field) {
  const label = field.labels?.[0]?.cloneNode(true);
  label?.querySelectorAll('input, select, textarea, button').forEach(node => node.remove());
  return (field.getAttribute('aria-label') || label?.textContent || field.name || 'Kolom ini').replace(/\s*\*\s*$/, '').trim();
}

export function validationMessage(field) {
  if (!field.willValidate) return '';
  const value = field.value || '';
  const validity = field.validity;
  if (validity.badInput) return 'Masukkan angka yang valid.';
  if (validity.valueMissing || (field.required && !value.trim())) return 'Wajib diisi.';
  if (!value) return '';
  if (validity.typeMismatch) return field.type === 'email' ? 'Masukkan alamat email yang valid.' : 'Masukkan tautan yang valid, diawali https:// atau http://.';
  if (field.minLength > 0 && value.length < field.minLength) return `Minimal ${field.minLength} karakter (saat ini ${value.length} karakter).`;
  if (field.maxLength > 0 && value.length > field.maxLength) return `Maksimal ${field.maxLength} karakter.`;
  if (validity.rangeUnderflow) return `Nilai minimal ${field.min}.`;
  if (validity.rangeOverflow) return `Nilai maksimal ${field.max}.`;
  if (validity.stepMismatch) return field.step === '1' || !field.step ? 'Masukkan angka bulat.' : `Gunakan kelipatan ${field.step}.`;
  if (validity.patternMismatch) return 'Format belum sesuai. Periksa kembali isian ini.';
  if (!validity.valid) return 'Isian belum valid. Periksa kembali.';
  return '';
}

// Keep HTML constraints as a single source of truth, with our own accessible UI.
export default function ValidatedForm({ children, onSubmit, onInput, onChange, ...props }) {
  const alertId = useId();
  const [errors, setErrors] = useState([]);
  const marked = useRef(new Map());
  const clearField = field => {
    const original = marked.current.get(field);
    if (!original) return;
    for (const [name, value] of Object.entries(original)) {
      if (value === null) field.removeAttribute(name); else field.setAttribute(name, value);
    }
    marked.current.delete(field);
  };
  const clearErrors = () => { for (const field of marked.current.keys()) clearField(field); };
  const validate = event => {
    event.preventDefault();
    clearErrors();
    const next = Array.from(event.currentTarget.elements).flatMap(field => {
      const message = validationMessage(field);
      return message ? [{ field, label: fieldLabel(field), message }] : [];
    });
    for (const {field} of next) {
      marked.current.set(field, { 'aria-invalid': field.getAttribute('aria-invalid'), 'aria-describedby': field.getAttribute('aria-describedby') });
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), alertId].filter(Boolean).join(' '));
    }
    setErrors(next);
    if (next.length) { next[0].field.focus(); return; }
    onSubmit?.(event);
  };
  const changed = event => {
    const field = event.target;
    if (marked.current.has(field) && !validationMessage(field)) {
      clearField(field);
      setErrors(previous => previous.filter(error => error.field !== field));
    }
  };
  return <form {...props} data-custom-validation noValidate onSubmit={validate} onInput={event => {changed(event); onInput?.(event);}} onChange={event => {changed(event); onChange?.(event);}}>
    {errors.length > 0 && <div id={alertId} role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
      <p className="flex items-center gap-2 font-semibold"><CircleAlert size={18} aria-hidden="true" />Periksa isian berikut</p>
      <ul className="mt-2 space-y-1">
        {errors.map(({field, label, message}, index) => <li key={index}><button type="button" className="text-left underline decoration-rose-300 underline-offset-4 hover:decoration-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600" onClick={() => field.focus()}>{label}: {message}</button></li>)}
      </ul>
    </div>}
    {children}
  </form>;
}
