import process from "process"
import { Buffer } from "buffer"
import EventEmitter from "events"

const _window = window as typeof window & {
  EventEmitter: typeof EventEmitter
}

_window.process = process
_window.Buffer = Buffer
_window.EventEmitter = EventEmitter
_window.global = globalThis
