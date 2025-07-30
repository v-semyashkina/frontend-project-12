import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.MODE === 'production' ? undefined : 'http://localhost:5002'

export const socket = io(URL)
