import { ApiResponse } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';


export function ApiErrorResponses() {
    return applyDecorators(
        ApiResponse({ status: 400, description: 'Bad Request.' }),
        ApiResponse({ status: 500, description: 'Internal Server Error.' }),
    );
}

