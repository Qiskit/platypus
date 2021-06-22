
export interface Added<T> {
  added: {
    element: T
    newIndex: number
  }
}

export interface Removed<T> {
  removed: {
    element: T
    oldIndex: number
  }
}
export interface Moved<T> {
  moved: {
    element: T
    oldIndex: number
    newIndex: number
  }
}

export function isAddedEvent<T> (evt: Added<T> | Removed<T> | Moved<T>) {
  return 'added' in evt
}
export function isRemovedEvent<T> (evt: Added<T> | Removed<T> | Moved<T>) {
  return 'removed' in evt
}
export function isMovedEvent<T> (evt: Added<T> | Removed<T> | Moved<T>) {
  return 'moved' in evt
}
