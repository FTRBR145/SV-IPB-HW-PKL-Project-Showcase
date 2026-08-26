import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-xl font-extrabold text-slate-900">
                Terjadi Kendala Teknis
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aplikasi mengalami kendala saat memuat komponen ini. Anda dapat mencoba memuat ulang atau kembali ke beranda.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-100 rounded-xl text-left font-mono text-[11px] text-rose-700 overflow-x-auto max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw size={14} />
                <span>Muat Ulang</span>
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Home size={14} />
                <span>Ke Beranda</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
