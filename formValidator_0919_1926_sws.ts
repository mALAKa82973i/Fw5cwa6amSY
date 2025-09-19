// 代码生成时间: 2025-09-19 19:26:32
import { GraphQLError } from '@apollo/client/errors';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Define an interface to represent the form data
interface IFormData {
    username: string;
    email: string;
    age: number;
}

// Define decorators to validate each field
class FormData implements IFormData {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(18)
    @Max(100)
    age: number;
}

// Function to validate form data
async function validateFormData(formData: IFormData): Promise<string | null> {
    try {
        const form = plainToClass(FormData, formData);
        const errors = await validate(form);
        if (errors.length > 0) {
            // If there are validation errors, return the first error message
            return errors[0].constraints ? Object.values(errors[0].constraints)[0] : null;
        }
        return null;
    } catch (error) {
        // Handle any errors during validation
        throw new GraphQLError('Validation error: ' + error.message);
    }
}

// Example usage of the validateFormData function
const formData: IFormData = {
    username: 'johndoe',
    email: 'john@example.com',
    age: 30
};

validateFormData(formData).then((error) => {
    if (error) {
        console.error('Form validation error:', error);
    } else {
        console.log('Form is valid.');
    }
}).catch((error) => {
    console.error('Error during validation:', error);
});

// Export the validateFormData function for use in other modules
export { validateFormData };