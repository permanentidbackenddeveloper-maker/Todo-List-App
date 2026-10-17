import userRoutes from '../routes/userRoutes.js';
import tdlRoutes from '../routes/todolistRoutes.js';
import templateRoutes from '../routes/templateRoutes.js'
import backupRoutes from '../routes/backupRoutes.js'
import translateRoutes from "../routes/translateRoutes.js";

export const initiateApp = (expressApp) => {

    expressApp.use(userRoutes);
    expressApp.use(tdlRoutes);
      expressApp.use(templateRoutes);
      expressApp.use(backupRoutes)
      expressApp.use(translateRoutes)

};