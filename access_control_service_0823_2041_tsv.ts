// 代码生成时间: 2025-08-23 20:41:31
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AccessControlService {
    constructor(private authService: AuthService) {}

    /**
     * Check if the user has the required permission.
     *
     * @param user The user object to check permissions for.
     * @param requiredPermission The permission required to access the resource.
     * @throws UnauthorizedException if the user does not have the required permission.
     */
    public async checkPermission(user: User, requiredPermission: string): Promise<void> {
        try {
            const permissions = await this.authService.getPermissions(user);
            if (!permissions.includes(requiredPermission)) {
                throw new UnauthorizedException('User does not have the required permission.');
            }
        } catch (error) {
            // Log the error and rethrow it, or handle it according to your error handling policy.
            console.error(error);
            throw new UnauthorizedException('An error occurred while checking permissions.');
        }
    }

    /**
     * Verify if the user can access the given resource.
     *
     * @param user The user object.
     * @param resourceId The ID of the resource.
     * @param requiredPermission The required permission to access the resource.
     * @returns {Promise<true>} If the user can access the resource, otherwise throws an exception.
     */
    public async canAccessResource(user: User, resourceId: string, requiredPermission: string): Promise<boolean> {
        try {
            // Assuming we have a method to check if the user has permission for a specific resource.
            const hasPermission = await this.authService.hasPermissionForResource(user, resourceId, requiredPermission);
            if (!hasPermission) {
                throw new UnauthorizedException('User does not have permission to access the resource.');
            }
            return true;
        } catch (error) {
            // Log the error and rethrow it, or handle it according to your error handling policy.
            console.error(error);
            throw new UnauthorizedException('An error occurred while checking resource access permissions.');
        }
    }
}
