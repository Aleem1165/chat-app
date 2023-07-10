import io from "socket.io-client"
import backendURL from "./backendURL"

let socket ;
export default socket = io(backendURL)