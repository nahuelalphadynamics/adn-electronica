import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('R3F Error caught by boundary:', error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05070A] z-50 p-6 text-center border border-red-500/20">
                    <span className="material-symbols-outlined text-red-500 text-4xl mb-4">warning</span>
                    <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-2">RENDER_SYSTEM_HALTED</h3>
                    <p className="text-[#8B949E] text-xs font-mono max-w-md mb-6">
                        A critical exception occurred in the WebGL renderer. The orbital visualizer has been safely shut down.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="text-[10px] font-mono text-white tracking-widest uppercase border border-primary/50 px-6 py-2 hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        [ REBOOT_CANVAS ]
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
