# React Query V3 Builder

A utility library designed to streamline the creation and management of queries and mutations using React Query v3. It offers factory functions for generating custom hooks with default configurations and a consistent query key builder to maintain organized and predictable query keys across your application.

## Features

- **Custom Hook Factories**: Generate `useQuery` and `useMutation` hooks with predefined default options, promoting code reuse and consistency.
- **Query Key Builder**: Create structured and type-safe query keys to manage caching and data fetching effectively.
- **TypeScript Support**: Built with TypeScript to ensure type safety and better developer experience.

## Installation

To incorporate the `query-builder` utilities into your project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Bieuxyz/react-query-v3-builder.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd react-query-v3-builder
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Build the Project**:

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Import Utilities into Your Project**:

   ```tsx
   import { createQueryHook, createMutationHookFactory, queryKeyBuilder } from './query-builder/src';
   ```

## Usage

### Creating a Custom Query Hook

```tsx
import { createQueryHook, queryKeyBuilder } from './query-builder/src';
import { fetchUserData } from './api';

const userQueryKey = queryKeyBuilder('user');

const useUserQuery = createQueryHook(
  userQueryKey.detail,
  fetchUserData,
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  }
);

// In a component
const { data, isLoading } = useUserQuery();
```

### Creating a Custom Mutation Hook

```tsx
import { createMutationHookFactory } from './query-builder/src';
import { updateUserData } from './api';

const useUpdateUser = createMutationHookFactory(updateUserData, {
  onSuccess: () => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
  },
});

// In a component
const mutation = useUpdateUser();
mutation.mutate({ id: 1, name: 'John Doe' });
```

### Generating Query Keys

```tsx
import { queryKeyBuilder } from './query-builder/src';

const userQueryKey = queryKeyBuilder('user');

userQueryKey.all; // ['user']
userQueryKey.lists(); // ['user', 'list']
userQueryKey.list({ page: 1 }); // ['user', 'list', { page: 1 }]
userQueryKey.details(); // ['user', 'detail']
userQueryKey.detail(1); // ['user', 'detail', 1]
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please follow these steps:

1. **Fork the Repository**:

   ```bash
   git clone https://github.com/your-username/react-query-v3-builder.git
   ```

2. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**.

4. **Commit Your Changes**:

   ```bash
   git commit -m 'Add your feature description'
   ```

5. **Push to the Branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**: Navigate to the original repository and open a pull request with your changes.

## License

This project is licensed under the [MIT License](./LICENSE).

---

For more information and examples, please refer to the [React Query Builder Documentation](https://react-querybuilder.js.org/docs/3/intro).

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.
