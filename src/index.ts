import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import { stream } from "src/utils/logger/logger.util";
import { errorMiddleware } from "src/middlewares/error-middleware/error-middleware";
import { PORT, ORIGIN, LOG_FORMAT, USE_CREDENTIALS } from "src/configs/env/env.config";

const app = express();

app.use(morgan(`${LOG_FORMAT}`, { stream }));
app.use(helmet());
app.use(cors({ origin: ORIGIN, credentials: USE_CREDENTIALS }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(cookieParser());

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
