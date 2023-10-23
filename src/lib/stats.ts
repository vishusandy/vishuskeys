import type { CheckMode } from "./config";
import type { WordState } from "./word_state";

// https://www.speedtypingonline.com/typing-equations

export const wordLen: number = 5;

export type UserStatsObject = { [P in keyof UserStats]: UserStats[P] };

export abstract class BaseStats {
    duration: number = 0;
    keystrokes: number = 0;
    wordErrors: number = 0;
    backspaces: number = 0;
    words: number = 0;
    chars: number = 0;
    uncorrectedErrors: number = 0;
    correctedErrors: number = 0;

    getGrossWpm(): number {
        // todo: not accurate for word mode
        return (this.keystrokes / wordLen) / (this.duration / 60_000);
    }

    getNetWpm(): number {
        // todo: not accurate for word mode
        // fix: this appears to be wrong
        return ((this.keystrokes / wordLen) - this.uncorrectedErrors) / this.duration / 60_000;
    }

    getAccuracy(): number {
        return this.chars / this.keystrokes;
    }

    abstract reset(): void;

    // new<T extends BaseStats>(this: ConstructorType<T, typeof BaseStats>, config: Config): T {
    //     const t = new this(config);
    //     return <T>t;
    // }
}

export class SessionStats extends BaseStats {
    started: DOMHighResTimeStamp | undefined = undefined;
    mode: CheckMode;

    constructor(mode: CheckMode) {
        super();
        this.mode = mode;
    }


    add(word: WordState) {
        this.words += 1;
        this.keystrokes += word.keystrokes;
        this.correctedErrors += word.correctedErrors;
        this.uncorrectedErrors += word.uncorrectedErrors;
        this.backspaces += word.backspaces;
        this.chars += word.wordChars.length;
        this.wordErrors += word.wordAttempts;
    }

    resetWord(word: WordState) {
        // todo
    }

    pause() {
        if (this.started !== undefined) {
            this.duration += performance.now() - this.started;
            this.started = undefined;
        }
    }

    resume() {
        if (this.started === undefined) {
            this.started = performance.now();
        }
    }

    reset() {
        this.started = undefined;
        this.duration = 0;
        this.keystrokes = 0;
        this.wordErrors = 0;
        this.backspaces = 0;
        this.words = 0;
        this.chars = 0;
        this.uncorrectedErrors = 0;
        this.correctedErrors = 0;
    }
}

export class UserStats extends BaseStats {
    sessions: number = 0;

    static deserialize(o: UserStatsObject) {
        const stats = new UserStats();
        for (const key in o) {
            if (stats.hasOwnProperty(key)) {
                // @ts-ignore
                stats[key] = o[key];
            }
        }
        return stats;
    }

    reset() {
        this.sessions = 0;
        this.duration = 0;
        this.keystrokes = 0;
        this.wordErrors = 0;
        this.backspaces = 0;
        this.words = 0;
        this.chars = 0;
        this.uncorrectedErrors = 0;
        this.correctedErrors = 0;
    }

    add(session: SessionStats) {
        this.duration += session.duration;
        this.words += session.words;
        this.keystrokes += session.keystrokes;
        this.correctedErrors += session.correctedErrors;
        this.uncorrectedErrors += session.uncorrectedErrors;
        this.backspaces += session.backspaces;
        this.chars += session.chars;
        this.wordErrors += session.wordErrors;
        this.sessions += 1;
    }
}
