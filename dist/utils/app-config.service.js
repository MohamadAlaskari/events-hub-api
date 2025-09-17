"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getDBType() {
        const key = this.configService.get('DB_TYPE');
        if (!key)
            throw new Error('DB_TYPE is not set in .env file');
        return key;
    }
    getDBHostname() {
        const key = this.configService.get('DB_HOST');
        if (!key)
            throw new Error('DB_HOST is not set in .env file');
        return key;
    }
    getDBPort() {
        const key = this.configService.get('DB_PORT');
        if (!key)
            throw new Error('DB_PORT is not set in .env file');
        return key;
    }
    getDBUsername() {
        const key = this.configService.get('DB_USERNAME');
        if (!key)
            throw new Error('DB_USERNAME is not set in .env file');
        return key;
    }
    getDBPassword() {
        const key = this.configService.get('DB_PASSWORD');
        if (!key)
            throw new Error('DB_PASSWORD is not set in .env file');
        return key;
    }
    getDBName() {
        const key = this.configService.get('DB_NAME');
        if (!key)
            throw new Error('DB_NAME is not set in .env file');
        return key;
    }
    getDBLogging() {
        return this.configService.get('DB_LOGGING', false);
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=app-config.service.js.map