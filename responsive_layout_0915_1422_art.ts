// 代码生成时间: 2025-09-15 14:22:00
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Layout } from './layout.entity'; // Assuming Layout entity is defined elsewhere

@Injectable()
export class ResponsiveLayoutService {
  constructor(
    @InjectRepository(Layout)
    private layoutRepository: Repository<Layout>,
  ) {}

  /**
   * Fetches all layouts with responsive design properties.
   *
   * @returns Promise<Layout[]>
   */
  async findAllLayouts(): Promise<Layout[]> {
    try {
      return await this.layoutRepository.find();
    } catch (error) {
      throw new ApolloError('Error fetching layouts', 'INTERNAL_SERVER_ERROR');
    }
  }

  /**
   * Finds a layout by its id and checks if it has responsive design properties.
   *
   * @param layoutId - The id of the layout to find.
   * @returns Promise<Layout>
   */
  async findLayoutById(layoutId: number): Promise<Layout> {
    const layout = await this.layoutRepository.findOne(layoutId);
    if (!layout) {
      throw new ApolloError('Layout not found', 'NOT_FOUND_ERROR');
    }
    return layout;
  }

  /**
   * Updates the responsive design properties of a layout.
   *
   * @param layoutId - The id of the layout to update.
   * @param newProperties - The new responsive design properties.
   * @returns Promise<Layout>
   */
  async updateLayoutResponsiveProperties(layoutId: number, newProperties: Partial<Layout>): Promise<Layout> {
    const layout = await this.layoutRepository.findOne(layoutId);
    if (!layout) {
      throw new ApolloError('Layout not found', 'NOT_FOUND_ERROR');
    }
    const updatedLayout = await this.layoutRepository.save({
      ...layout,
      ...newProperties,
    });
    return updatedLayout;
  }
}
