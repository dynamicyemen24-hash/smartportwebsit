import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12 text-right"
          dir="rtl"
        >
          <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
            <h1 className="text-3xl font-semibold text-slate-900 mb-4">حدث خطأ غير متوقع</h1>
            <p className="text-slate-600 mb-6">
              نأسف لهذا الإزعاج. تم تسجيل المشكلة وقد نحتاج إلى إعادة تحميل الصفحة.
            </p>
            <div className="space-y-4">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full rounded-xl bg-[#1e3a5f] px-4 py-3 text-sm font-semibold text-white hover:bg-[#172f4b] transition-colors"
              >
                إعادة تحميل الصفحة
              </button>
              <a
                href="mailto:info@smartportsco.com"
                className="block text-center text-sm text-[#1e3a5f] hover:text-[#d4a574]"
              >
                أو تواصل معنا عبر البريد الإلكتروني للدعم
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
