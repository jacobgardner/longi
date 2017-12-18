

declare namespace cast {
    namespace framework {
        const VERSION: string;

        class CastReceiverContext {
            static getInstance(): CastReceiverContext;

            start(options?: CastReceiverOptions): CastReceiverContext;
            addCustomMessageListener(
                namespace: string,
                callback: (event: system.Event) => void
            ): void;
        }

        class RemotePlayer {}

        enum CastContextEventType {
            CAST_STATE_CHANGED,
            SESSION_STATE_CHANGED,
        }

        class CastContext {
            static getInstance(): CastContext;

            addEventListener(
                type: CastContextEventType,
                handler: (evt: SessionStateEventData) => void
            ): void;
            addEventListener(
                type: CastContextEventType,
                handler: (evt: CastStateEventData) => void
            ): void;
            getCurrentSession(): CastSession;
            setOptions(options: CastOptions): void;
        }

        class CastStateEventData {
            constructor(castState: CastState);

            castState: CastState;
        }

        enum CastState {
            NO_DEVICES_AVAILABLE,
            NOT_CONNECTED,
            CONNECTING,
            CONNECTED,
        }

        class SessionStateEventData {}

        class CastSession {
            sendMessage(namespace: string, data: any): Promise<any>;
        }

        interface CastReceiverOptions {
            customNamespaces?: {
                [key: string]: system.MessageType;
            };
            localSenderId?: string;
            maxInactivity?: number;
            mediaElement?: HTMLMediaElement;
            // playbackConfig?: PlaybackConfig;
            // queue?: QueueBase;
            statusText?: string;
            supportedCommands?: number;
            useLegacyDashSupport?: boolean;
            versionCode?: number;
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
            NONE,
        }

        namespace system {
            class Event {
                type: EventType;
                data: any;
            }

            enum EventType {
                READY,
                SHUTDOWN,
                SENDER_CONNECTED,
                SENDER_DISCONNECTED,
                ERROR,
                SYSTEM_VOLUME_CHANGED,
                VISIBILITY_CHANGED,
                STANDBY_CHANGED,
                MAX_VIDEO_RESOLUTION_CHANGED,
                FEEDBACK_STARTED,
            }

            enum MessageType {
                STRING,
                JSON,
            }
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
