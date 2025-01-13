import app from "./application/app"
import { Logger } from "./application/logging"

app.listen(3000, () => {
    Logger.info('Server is running on port 3000');
});