"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const getTypeOrmConfig = (configService) => ({
    type: configService.get('DB_TYPE', 'mysql'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT', 3306),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true,
    logging: configService.get('DB_LOGGING', false),
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=db.config.js.map