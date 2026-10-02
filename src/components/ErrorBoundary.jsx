import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CareerKinetic ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6 text-[#1C1917]">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E7E5E4] shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
              Something unexpected occurred
            </h2>
            <p className="text-xs text-[#78716C] leading-relaxed">
              We encountered a temporary rendering issue. Your daily cockpit progress and streak data are safely stored.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 rounded-xl bg-[#0F2B5C] hover:bg-[#1E3A8A] text-white text-xs font-bold transition flex items-center justify-center gap-2 mx-auto shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Daily Cockpit</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
