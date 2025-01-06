import app from "./application/app"
import { Logger } from "./application/logging"

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});