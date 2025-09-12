// 代码生成时间: 2025-09-12 15:05:18
import { Injectable } from '@nestjs/common';
import { validate as validateUrl } from 'is-url';
import { UrlValidationException } from './url-validation.exception';

/**
 * Service for validating URL links.
 */
@Injectable()
export class UrlValidatorService {
  
  constructor() {}

  /**
   * Validates the given URL string.
   *
   * @param url The URL string to validate.
   * @returns A boolean indicating if the URL is valid.
   * @throws UrlValidationException if the URL is invalid.
   */
  public validate(url: string): boolean {
    if (!validateUrl(url)) {
      throw new UrlValidationException(`Invalid URL: ${url}`);
    }
    return true;
  }
}

/**
 * Custom exception for invalid URL validation.
 */
export class UrlValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UrlValidationException';
  }
}

/*
 * Usage example:
 * const urlValidator = new UrlValidatorService();
 * try {
 *   urlValidator.validate('https://www.example.com');
 *   console.log('URL is valid');
 * } catch (error) {
 *   if (error instanceof UrlValidationException) {
 *     console.error(error.message);
 *   } else {
 *     console.error('An unexpected error occurred');
 *   }
 * }
 */