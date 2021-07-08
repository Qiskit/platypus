
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

export interface Hover<T> {
  hover: {
    element: T
    newIndex: number
  }
}

type EventType<T> = Added<T> | Removed<T> | Moved<T> | Hover<T>

export function isAddedEvent<T> (evt: EventType<T>) {
  return 'added' in evt
}
export function isRemovedEvent<T> (evt: EventType<T>) {
  return 'removed' in evt
}
export function isMovedEvent<T> (evt: EventType<T>) {
  return 'moved' in evt
}
export function isHoverEvent<T> (evt: EventType<T>) {
  return 'hover' in evt
}
