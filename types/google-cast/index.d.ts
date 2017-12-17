declare namespace cast {
    namespace framework {
        const VERSION: string;

        class RemotePlayer {

        }

        class CastContext {
            static getInstance(): CastContext;

            setOptions(options: CastOptions): void;
        }

        interface CastOptions {
            receiverApplicationId?: string;
            resumeSavedSession?: boolean;
            language?: string;
            autoJoinPolicy?: chrome.cast.AutoJoinPolicy;
        }

        function setLoggerLevel(logLevel: LoggerLevel): void;

        enum LoggerLevel {
            DEBUG,
            INFO,
            WARNING,
            ERROR,
            NONE
        }
    }
}

declare namespace chrome {
    namespace cast {
        enum AutoJoinPolicy {
            TAB_AND_ORIGIN_SCOPED,
            ORIGIN_SCOPED,
            PAGE_SCOPED,
        }
    }
}
