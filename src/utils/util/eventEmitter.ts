interface IEventEmitterData<T> {
    type: string;
    data?: T;
}

type Callback<T> = (data: IEventEmitterData<T>) => void;

export class EventEmitter<T> {
    private listeners: Record<string, Callback<T>> = {};

    subscribe(callback: Callback<T>) {
        const id = this.generateId();
        Object.assign(this.listeners, {
            [id]: callback,
        });
        return {
            unsubscribe: () => delete this.listeners[id],
        };
    }

    emit(data: IEventEmitterData<T>) {
        Object.values(this.listeners).forEach(listen => listen(data));
    }

    destroy() {
        this.listeners = {};
    }

    async pipe(callback: () => unknown) {
        try {
            await callback();
            return this;
        } catch (error) {
            console.log(error);
        }
    }

    private generateId() {
        const today = new Date();
        return today.getTime() + Math.floor(Math.random() * 10000) + "";
    }
}

export const commonEvent = new EventEmitter();
