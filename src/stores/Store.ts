import { Subject, Observable, BehaviorSubject } from 'rxjs';

export default class Store<T> {
  private state: Observable<T>;

  private _state: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this.state = this._state.asObservable();
  }

  get storeState(): T {
    return this._state.getValue();
  }

  setState(nextState: T): void {
    this._state.next(nextState);
  }

  getStore(): any {
    return this.state;
  }
}
