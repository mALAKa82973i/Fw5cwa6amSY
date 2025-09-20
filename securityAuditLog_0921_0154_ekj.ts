// 代码生成时间: 2025-09-21 01:54:53
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { AuditLogResolver } from './resolvers/AuditLogResolver';
import { AuditLogEntity } from './entities/AuditLogEntity';
import { createConnection } from 'typeorm';

// Define the database connection
const connectDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [
        AuditLogEntity,
      ],
      synchronize: true,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

// Define the schema
const schema = await buildSchema({
  resolvers: [AuditLogResolver],
});

// Create an Apollo server with the defined schema
const server = new ApolloServer({
  schema,
  context: () => ({
    // Context properties can be added here for authentication, etc.
  }),
  // Enable error logging
  formatError: (error) => {
    console.error(error);
    return error;
  },
});

// Start the server
server.listen({ port: 4000 }, () => {
  console.log('Server is running on http://localhost:4000/');
  connectDatabase().catch(console.error);
});

// AuditLogResolver file
/*
 * resolvers/AuditLogResolver.ts
 * This file contains the resolvers for the audit log functionality.
 */

import { Resolver, Query, Mutation, Args } from 'type-graphql';
import { AuditLogEntity } from '../entities/AuditLogEntity';

@Resolver(of => AuditLogEntity)
export class AuditLogResolver {
  // Query to retrieve all audit logs
  @Query(() => [AuditLogEntity], { nullable: true })
  async allAuditLogs(): Promise<AuditLogEntity[] | null> {
    try {
      return await AuditLogEntity.find();
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw new Error('Failed to fetch audit logs');
    }
  }

  // Mutation to create a new audit log
  @Mutation(() => AuditLogEntity, { nullable: true })
  async createAuditLog(@Args('data') data: Partial<AuditLogEntity>): Promise<AuditLogEntity | null> {
    const auditLog = AuditLogEntity.create(data);
    try {
      await auditLog.save();
      return auditLog;
    } catch (error) {
      console.error('Error creating audit log:', error);
      throw new Error('Failed to create audit log');
    }
  }
}

// AuditLogEntity file
/*
 * entities/AuditLogEntity.ts
 * This file defines the audit log entity using TypeORM.
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  action: string;

  @Column()
  timestamp: Date;
}
