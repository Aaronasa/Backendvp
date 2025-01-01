import app from "./application/app"
import { Logger } from "./application/logging"

app.listen(3000,() => {
    Logger.info("Listening on http://localhost:3000/")
})