// 代码生成时间: 2025-09-09 23:48:16
import { gql, ApolloClient } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory';

// 定义表单验证规则类型
interface IValidationRule {
  field: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

// 定义表单数据接口
interface IFormData {
  [key: string]: string;
}

// 表单验证器类
class FormValidator {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  // 验证表单数据
  public validateFormData(formData: IFormData, rules: IValidationRule[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    let valid = true;

    for (const rule of rules) {
      const fieldValue = formData[rule.field];

      // 检查是否必填
      if (rule.required && (!fieldValue || fieldValue.trim() === '')) {
        errors.push(`The field ${rule.field} is required.`);
        valid = false;
        continue;
      }

      // 检查最小长度
      if (rule.minLength && fieldValue.trim().length < rule.minLength) {
        errors.push(`The field ${rule.field} must be at least ${rule.minLength} characters long.`);
        valid = false;
        continue;
      }

      // 检查最大长度
      if (rule.maxLength && fieldValue.trim().length > rule.maxLength) {
        errors.push(`The field ${rule.field} cannot be longer than ${rule.maxLength} characters.`);
        valid = false;
        continue;
      }

      // 检查正则表达式
      if (rule.regex && !rule.regex.test(fieldValue)) {
        errors.push(`The field ${rule.field} does not match the required pattern.`);
        valid = false;
      }
    }

    return { valid, errors };
  }
}

// 使用示例
const client = new ApolloClient({
  uri: 'your_apollo_server_uri',
  cache: new InMemoryCache(),
});

const validator = new FormValidator(client);

const formData: IFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: '30',
};

const rules: IValidationRule[] = [
  { field: 'name', required: true, minLength: 3 },
  { field: 'email', required: true, regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g },
  { field: 'age', required: true, minLength: 1, maxLength: 3 },
];

const validationResult = validator.validateFormData(formData, rules);
if (validationResult.valid) {
  console.log('Validation successful.');
} else {
  console.error('Validation errors:', validationResult.errors);
}