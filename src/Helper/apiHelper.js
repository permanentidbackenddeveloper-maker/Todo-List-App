import userRoutes from '../routes/userRouters.js';
import tdlRoutes from '../routes/todolistRouters.js';
import templateRoutes from '../routes/templateRouter.js'

export const initiateApp = (expressApp) => {

    expressApp.use(userRoutes);
    expressApp.use(tdlRoutes);
      expressApp.use(templateRoutes);

};